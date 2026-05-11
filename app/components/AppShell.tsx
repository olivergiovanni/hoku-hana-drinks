"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOrderStore } from "../context/order-store";

const links = [
  { href: "/menu", label: "Product List", count: null },
  { href: "/cart", label: "Cart", count: "cart" },
  { href: "/history", label: "Order History", count: "orders" }
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { itemCount, orders } = useOrderStore();
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  return (
    <main className="min-h-screen">
      <section className="island-pattern relative overflow-hidden px-4 py-5 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-lg border border-white/70 bg-white/[0.56] px-3 py-2 shadow-[0_18px_50px_rgba(2,61,72,0.12)] backdrop-blur sm:px-4 sm:py-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="sun-moon-mark" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#026c74] sm:text-xs sm:tracking-[0.22em]">
                Hawaiian drink market
              </p>
              <h1 className="truncate text-xl font-black text-[#172033] xs:text-2xl sm:text-4xl">
                Hoku Hana Drinks
              </h1>
            </div>
          </div>
          <div className="hidden rounded-lg bg-[#172033] px-3 py-2 text-right text-white xs:block sm:px-4 sm:py-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#ffdd7a] sm:text-xs">Cart</p>
            <p className="text-xl font-black sm:text-2xl">{itemCount}</p>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 py-8 grid-cols-layout lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex rounded-full bg-[#172033] px-4 py-2 text-sm font-bold text-[#ffdd7a] shadow-lg">
              Sun-bright flavors, moon-cool sips
            </div>
            <p className="hero-text max-w-3xl text-4xl font-black leading-[1.02] text-[#172033] sm:text-6xl">
              Order tropical drinks from a playful island menu.
            </p>
          </div>
          <div className="wave-band rounded-lg p-5 text-white shadow-[0_20px_60px_rgba(3,72,79,0.28)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ffdd7a]">
              Today&apos;s route
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {["Pick", "Tune", "Sip"].map((step, index) => (
                <div key={step} className="rounded-md bg-white/[0.12] p-3">
                  <p className="text-2xl font-black">{index + 1}</p>
                  <p className="text-sm font-bold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-y border-white/70 bg-white/[0.76] px-4 py-3 backdrop-blur sm:px-6 lg:px-10">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {links.map((link) => {
            const count = link.count === "cart" ? itemCount : link.count === "orders" ? orders.length : null;
            const active = normalizedPath === link.href || (normalizedPath === "/" && link.href === "/menu");

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-xs font-black transition sm:px-4 sm:py-3 sm:text-sm ${
                  active
                    ? "bg-[#172033] text-white shadow-lg"
                    : "bg-white text-[#172033] hover:bg-[#fff2cf]"
                }`}
              >
                {link.label}
                {count === null ? "" : ` (${count})`}
              </Link>
            );
          })}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">{children}</div>
    </main>
  );
}
