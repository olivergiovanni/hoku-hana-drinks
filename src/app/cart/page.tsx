"use client";

import { CartItemEditor } from "../../components/CartItemEditor";
import { CheckoutPanel } from "../../components/CheckoutPanel";
import { SectionHeader } from "../../components/SectionHeader";
import { useOrderStore } from "../../context/order-store";

export default function CartPage() {
  const { cartDetails, clearCart } = useOrderStore();

  return (
    <div className="cart-layout mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-lg border border-white/80 bg-white p-5 shadow-[0_16px_40px_rgba(2,61,72,0.14)]">
        <SectionHeader
          eyebrow="Cart"
          title="Customize your drinks"
          action={
            cartDetails.length > 0 ? (
              <button
                onClick={clearCart}
                className="rounded-md bg-[#ffe8c9] px-3 py-2 text-xs font-black text-[#9b3d23] hover:bg-[#ffd3ac]"
              >
                Clear
              </button>
            ) : null
          }
        />

        <div className="space-y-4">
          {cartDetails.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#87a8a6] bg-[#f3fffb] p-5 text-sm font-semibold text-[#4f5b6e]">
              Pick a cooler from the product list to start an order.
            </div>
          ) : (
            cartDetails.map((line) => <CartItemEditor key={line.key} line={line} />)
          )}
        </div>
      </section>

      <CheckoutPanel />
    </div>
  );
}
