import { drinks } from "../data/catalog";
import {
  currency,
  customizationSummary,
  paymentLabel,
  roundMoney,
  unitPrice
} from "../lib/pricing";
import type { Order } from "../lib/types";

export function ReceiptCard({ order }: { order: Order }) {
  const orderSubtotal =
    order.subtotal ??
    roundMoney(
      order.items.reduce((sum, item) => {
        const drink = drinks.find((entry) => entry.id === item.id);
        return drink ? sum + unitPrice(drink, item.customization) * item.quantity : sum;
      }, 0)
    );
  const orderService = order.service ?? (orderSubtotal > 0 ? 1.5 : 0);
  const orderDiscount = order.discount ?? 0;

  return (
    <article className="rounded-lg border border-white/80 bg-white p-5 shadow-[0_16px_40px_rgba(2,61,72,0.11)]">
      <div className="flex flex-col gap-2 xs:flex-row xs:items-start xs:justify-between xs:gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#026c74]">
            Receipt {order.id}
          </p>
          <h3 className="text-xl font-black">{order.customer}</h3>
        </div>
        <p className="w-fit rounded-md bg-[#fff2cf] px-3 py-1 text-sm font-black">{currency(order.total)}</p>
      </div>
      <p className="mt-2 text-sm font-semibold text-[#4f5b6e]">
        {new Date(order.createdAt).toLocaleString()} - {order.pickup}
      </p>
      <p className="mt-1 text-sm font-bold text-[#026c74]">
        {paymentLabel(order.payment)}
        {order.promoCode ? ` - ${order.promoCode}` : ""}
      </p>

      <div className="mt-4 space-y-3">
        {order.items.map((item) => {
          const drink = drinks.find((entry) => entry.id === item.id);
          const itemPrice = drink ? unitPrice(drink, item.customization) : 0;

          return (
            <div key={item.key} className="rounded-md bg-[#f7fbfa] px-3 py-3">
              <div className="flex justify-between gap-3 text-sm font-black">
                <span>{drink?.name ?? "Drink"}</span>
                <span>{currency(itemPrice * item.quantity)}</span>
              </div>
              <p className="mt-1 text-xs font-bold text-[#4f5b6e]">
                {currency(itemPrice)} x {item.quantity}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {customizationSummary(item.customization).map((part) => (
                  <span key={part} className="rounded-full bg-white px-2 py-1 text-xs font-bold text-[#4f5b6e]">
                    {part}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 space-y-2 border-t border-[#d9ebe8] pt-4 text-sm font-bold">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency(orderSubtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Island service</span>
          <span>{currency(orderService)}</span>
        </div>
        <div className="flex justify-between text-[#026c74]">
          <span>Discount</span>
          <span>-{currency(orderDiscount)}</span>
        </div>
        <div className="flex justify-between text-xl font-black">
          <span>Total paid</span>
          <span>{currency(order.total)}</span>
        </div>
      </div>

      {order.note && (
        <p className="mt-4 rounded-md bg-[#ffe8c9] px-3 py-2 text-sm font-semibold text-[#60351d]">
          {order.note}
        </p>
      )}
    </article>
  );
}
