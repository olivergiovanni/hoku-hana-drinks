import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

const root = process.argv[2] ?? "out";
const apiBase = "https://here.now";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function contentType(path) {
  const dot = path.lastIndexOf(".");
  return contentTypes[dot >= 0 ? path.slice(dot).toLowerCase() : ""] ?? "application/octet-stream";
}

function sitePath(path) {
  return relative(root, path).split(sep).join("/");
}

async function main() {
  const files = walk(root).map((path) => {
    const bytes = readFileSync(path);
    return {
      fullPath: path,
      path: sitePath(path),
      size: statSync(path).size,
      contentType: contentType(path),
      hash: createHash("sha256").update(bytes).digest("hex")
    };
  });

  if (!files.some((file) => file.path === "index.html")) {
    throw new Error(`${root} must contain index.html at its root`);
  }

  const createResponse = await fetch(`${apiBase}/api/v1/publish`, {
    method: "POST",
    headers: {
      "X-HereNow-Client": "codex/direct-api",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      files: files.map(({ path, size, contentType, hash }) => ({ path, size, contentType, hash })),
      viewer: {
        title: "Hoku Hana Drinks",
        description: "A tropical Hawaiian drink ordering website."
      },
      spaMode: false
    })
  });

  const createBody = await createResponse.json();
  if (!createResponse.ok) {
    throw new Error(`Create failed: ${JSON.stringify(createBody)}`);
  }

  for (const upload of createBody.upload.uploads) {
    const file = files.find((candidate) => candidate.path === upload.path);
    if (!file) {
      throw new Error(`Upload requested unknown path ${upload.path}`);
    }

    const uploadResponse = await fetch(upload.url, {
      method: upload.method ?? "PUT",
      headers: upload.headers ?? { "Content-Type": file.contentType },
      body: readFileSync(file.fullPath)
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed for ${file.path}: ${uploadResponse.status} ${await uploadResponse.text()}`);
    }
  }

  const finalizeResponse = await fetch(createBody.upload.finalizeUrl, {
    method: "POST",
    headers: {
      "X-HereNow-Client": "codex/direct-api",
      "content-type": "application/json"
    },
    body: JSON.stringify({ versionId: createBody.upload.versionId })
  });

  const finalizeBody = await finalizeResponse.json();
  if (!finalizeResponse.ok) {
    throw new Error(`Finalize failed: ${JSON.stringify(finalizeBody)}`);
  }

  mkdirSync(".herenow", { recursive: true });
  const statePath = ".herenow/state.json";
  const state = {
    publishes: {
      [createBody.slug]: {
        siteUrl: createBody.siteUrl,
        claimToken: createBody.claimToken,
        claimUrl: createBody.claimUrl,
        expiresAt: createBody.expiresAt
      }
    }
  };
  writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);

  console.log(`siteUrl=${finalizeBody.siteUrl ?? createBody.siteUrl}`);
  console.log(`slug=${finalizeBody.slug ?? createBody.slug}`);
  console.log(`anonymous=${Boolean(createBody.anonymous)}`);
  if (createBody.expiresAt) console.log(`expiresAt=${createBody.expiresAt}`);
  if (createBody.claimUrl) console.log(`claimUrl=${createBody.claimUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
