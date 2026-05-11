"use client";

import {
  addOnOptions,
  iceOptions,
  milkOptions,
  sizeOptions,
  sweetnessOptions,
  toppingOptions
} from "../data/catalog";
import { useOrderStore } from "../context/order-store";
import { currency } from "../lib/pricing";
import type { CartDetail } from "../lib/types";

export function CartItemEditor({ line }: { line: CartDetail }) {
  const { updateQuantity, updateCustomization, toggleMulti, duplicateLine } = useOrderStore();

  return (
    <div className="rounded-lg bg-[#f7fbfa] p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <p className="truncate font-black">{line.drink.name}</p>
          <p className="text-sm font-semibold text-[#4f5b6e]">{currency(line.unitPrice)} each</p>
        </div>
        <p className="font-black sm:text-right">{currency(line.subtotal)}</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(line.key, line.quantity - 1)}
            className="h-9 w-9 rounded-md bg-white text-lg font-black shadow-sm transition hover:bg-[#fff8e9]"
            aria-label={`Remove one ${line.drink.name}`}
          >
            -
          </button>
          <span className="grid h-9 w-12 place-items-center rounded-md bg-[#172033] text-sm font-black text-white">
            {line.quantity}
          </span>
          <button
            onClick={() => updateQuantity(line.key, line.quantity + 1)}
            className="h-9 w-9 rounded-md bg-white text-lg font-black shadow-sm transition hover:bg-[#fff8e9]"
            aria-label={`Add one ${line.drink.name}`}
          >
            +
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => duplicateLine(line.key)}
            className="rounded-md bg-[#e8fff9] px-3 py-2 text-xs font-black text-[#026c74] shadow-sm transition hover:bg-[#d1ffef]"
            title="Duplicate for different customization"
          >
            Duplicate
          </button>
          <button
            onClick={() => updateQuantity(line.key, 0)}
            className="rounded-md bg-[#fff0f0] px-3 py-2 text-xs font-black text-[#d14b4b] shadow-sm transition hover:bg-[#ffe0e0]"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="text-sm font-black text-[#172033]">
          Size
          <select
            value={line.customization.size}
            onChange={(event) => updateCustomization(line.key, { size: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#bad5d2] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#026c74]"
          >
            {sizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} {option.price ? `(${option.price > 0 ? "+" : ""}${currency(option.price)})` : ""}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-black text-[#172033]">
          Ice Level
          <select
            value={line.customization.ice}
            onChange={(event) => updateCustomization(line.key, { ice: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#bad5d2] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#026c74]"
          >
            {iceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="text-sm font-black text-[#172033]">
          Sweetness
          <select
            value={line.customization.sweetness}
            onChange={(event) => updateCustomization(line.key, { sweetness: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#bad5d2] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#026c74]"
          >
            {sweetnessOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="text-sm font-black text-[#172033]">
          Milk Type
          <select
            value={line.customization.milk}
            onChange={(event) => updateCustomization(line.key, { milk: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#bad5d2] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#026c74]"
          >
            {milkOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} {option.price ? `(+${currency(option.price)})` : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <OptionGroup
          title="Toppings"
          options={toppingOptions}
          selected={line.customization.toppings}
          onToggle={(value) => toggleMulti(line.key, "toppings", value)}
        />
        <OptionGroup
          title="Add-ons"
          options={addOnOptions}
          selected={line.customization.addOns}
          onToggle={(value) => toggleMulti(line.key, "addOns", value)}
        />
      </div>
    </div>
  );
}

function OptionGroup({
  title,
  options,
  selected,
  onToggle
}: {
  title: string;
  options: Array<{ value: string; label: string; price: number }>;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-black text-[#172033]">{title}</p>
      <div className="mt-2 grid gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 text-sm font-bold text-[#4f5b6e]"
          >
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
              />
              {option.label}
            </span>
            <span>+{currency(option.price)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
