"use client";

import type { CSSProperties } from "react";
import type { Drink } from "../lib/types";
import { currency } from "../lib/pricing";

export function ProductCard({ drink, onAdd }: { drink: Drink; onAdd: () => void }) {
  return (
    <article className="overflow-hidden rounded-lg border border-white/80 bg-white shadow-[0_16px_40px_rgba(2,61,72,0.12)]">
      <div
        className="drink-art"
        style={
          {
            "--drink-bg": drink.colors.bg,
            "--liquid": drink.colors.liquid
          } as CSSProperties
        }
      >
        <div className="absolute left-5 top-5 rounded-full bg-white/[0.86] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#03484f]">
          {drink.island}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black leading-tight">{drink.name}</h3>
          <p className="rounded-md bg-[#fff2cf] px-3 py-1 text-sm font-black text-[#8a4b00]">
            From {currency(drink.price - 1)}
          </p>
        </div>
        <p className="mt-2 text-sm font-bold text-[#026c74]">{drink.flavor}</p>
        <p className="mt-3 min-h-12 text-sm leading-6 text-[#4f5b6e]">{drink.description}</p>
        <button
          onClick={onAdd}
          className="mt-5 w-full rounded-lg bg-[#026c74] px-4 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#03484f]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
