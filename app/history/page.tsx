"use client";

import { ReceiptCard } from "../components/ReceiptCard";
import { SectionHeader } from "../components/SectionHeader";
import { useOrderStore } from "../context/order-store";

export default function HistoryPage() {
  const { orders, clearOrders } = useOrderStore();

  return (
    <section>
      <SectionHeader
        eyebrow="Order History"
        title="Receipts"
        action={
          orders.length > 0 ? (
            <button
              onClick={clearOrders}
              className="rounded-lg bg-[#172033] px-4 py-3 text-sm font-black text-white"
            >
              Clear History
            </button>
          ) : null
        }
      />

      {orders.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#87a8a6] bg-white/[0.78] p-8 text-center text-sm font-semibold text-[#4f5b6e]">
          Completed orders will appear here after checkout.
        </div>
      ) : (
        <div className="product-grid grid gap-5 lg:grid-cols-2">
          {orders.map((order) => (
            <ReceiptCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}
