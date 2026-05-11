"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { paymentOptions, promoCodes } from "../data/catalog";
import { useOrderStore } from "../context/order-store";
import { currency } from "../lib/pricing";

export function CheckoutPanel() {
  const router = useRouter();
  const {
    cartDetails,
    subtotal,
    service,
    discount,
    total,
    customer,
    pickup,
    note,
    promoInput,
    appliedPromo,
    promoError,
    payment,
    setCustomer,
    setPickup,
    setNote,
    setPromoInput,
    setPayment,
    applyPromo,
    applyPromoCode,
    clearPromo,
    submitOrder
  } = useOrderStore();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitOrder()) {
      router.push("/history");
    }
  }

  return (
    <section className="rounded-lg border border-white/80 bg-white p-5 shadow-[0_16px_40px_rgba(2,61,72,0.14)]">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#026c74]">Checkout</p>
      <h2 className="text-2xl font-black">Order summary</h2>

      <div className="mt-5 rounded-lg bg-[#f7fbfa] p-4">
        <p className="text-sm font-black text-[#172033]">Promotion</p>
        <div className="mt-3 flex flex-col gap-2 xs:flex-row">
          <input
            value={promoInput}
            onChange={(event) => setPromoInput(event.target.value)}
            placeholder="Promo code"
            className="min-w-0 flex-1 rounded-lg border border-[#bad5d2] bg-white px-3 py-2 text-sm font-semibold uppercase outline-none focus:border-[#026c74]"
          />
          <button
            type="button"
            onClick={applyPromo}
            className="rounded-lg bg-[#172033] px-5 py-2 text-sm font-black text-white"
          >
            Apply
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {promoCodes.map((promoCode) => (
            <button
              key={promoCode.code}
              type="button"
              onClick={() => applyPromoCode(promoCode.code)}
              className={`rounded-full px-3 py-1 text-xs font-black ${
                appliedPromo === promoCode.code ? "bg-[#026c74] text-white" : "bg-white text-[#026c74]"
              }`}
            >
              {promoCode.code}
            </button>
          ))}
        </div>
        {(promoError || appliedPromo) && (
          <div className="mt-3 rounded-md bg-white px-3 py-2 text-sm font-bold text-[#4f5b6e]">
            {promoError || discount.message}
            {appliedPromo && (
              <button type="button" onClick={clearPromo} className="ml-2 font-black text-[#9b3d23]">
                Remove
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 space-y-2 border-t border-[#d9ebe8] pt-5 text-sm font-bold">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Island service</span>
          <span>{currency(service)}</span>
        </div>
        <div className="flex justify-between text-[#026c74]">
          <span>Discount</span>
          <span>-{currency(discount.amount)}</span>
        </div>
        <div className="flex justify-between text-xl font-black">
          <span>Total</span>
          <span>{currency(total)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input
          value={customer}
          onChange={(event) => setCustomer(event.target.value)}
          placeholder="Name for pickup"
          className="w-full rounded-lg border border-[#bad5d2] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#026c74]"
        />
        <select
          value={pickup}
          onChange={(event) => setPickup(event.target.value)}
          className="w-full rounded-lg border border-[#bad5d2] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#026c74]"
        >
          <option>ASAP</option>
          <option>In 15 minutes</option>
          <option>In 30 minutes</option>
          <option>In 1 hour</option>
        </select>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Order note"
          rows={3}
          className="w-full resize-none rounded-lg border border-[#bad5d2] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#026c74]"
        />

        <div className="grid gap-2">
          <p className="text-sm font-black text-[#172033]">Payment</p>
          {paymentOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setPayment(option.value)}
              className={`rounded-lg border px-4 py-3 text-left transition ${
                payment === option.value
                  ? "border-[#026c74] bg-[#e8fff9]"
                  : "border-[#d9ebe8] bg-white hover:bg-[#fff8e9]"
              }`}
            >
              <span className="block text-sm font-black">{option.label}</span>
              <span className="block text-xs font-bold text-[#4f5b6e]">{option.detail}</span>
            </button>
          ))}
        </div>

        <button
          disabled={!cartDetails.length || !customer.trim()}
          className="w-full rounded-lg bg-[#fb6f4f] px-4 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#d8563c] disabled:cursor-not-allowed disabled:bg-[#a8b8b6]"
        >
          Place Order
        </button>
      </form>
    </section>
  );
}
