import {
  addOnOptions,
  defaultCustomization,
  milkOptions,
  paymentOptions,
  promoCodes,
  sizeOptions,
  toppingOptions
} from "../data/catalog";
import type {
  CartLine,
  Customization,
  Drink,
  PaymentMethod,
  PricedOption,
  PromoCode,
  SavedCartLine,
  SavedOrder
} from "./types";

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

export function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function uniqueLineKey(id: string) {
  return `${id}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getPricedOption(options: PricedOption[], value: string) {
  return options.find((option) => option.value === value) ?? options[0];
}

export function normalizeCustomization(customization?: Partial<Customization>): Customization {
  return {
    size: customization?.size ?? defaultCustomization.size,
    ice: customization?.ice ?? defaultCustomization.ice,
    sweetness: customization?.sweetness ?? defaultCustomization.sweetness,
    milk: customization?.milk ?? defaultCustomization.milk,
    toppings: Array.isArray(customization?.toppings) ? customization.toppings : [],
    addOns: Array.isArray(customization?.addOns) ? customization.addOns : []
  };
}

export function normalizeCart(lines: SavedCartLine[]): CartLine[] {
  return lines
    .filter((line): line is SavedCartLine & { id: string } => Boolean(line.id))
    .map((line, index) => ({
      key: line.key ?? `${line.id}-${index}-${Date.now()}`,
      id: line.id,
      quantity: Math.max(1, Number(line.quantity) || 1),
      customization: normalizeCustomization(line.customization)
    }));
}

export function normalizeOrders(orders: SavedOrder[]) {
  return orders
    .filter((order): order is SavedOrder & { id: string } => Boolean(order.id))
    .map((order) => ({
      id: order.id,
      customer: order.customer ?? "Guest",
      pickup: order.pickup ?? "ASAP",
      note: order.note ?? "",
      createdAt: order.createdAt ?? new Date().toISOString(),
      items: normalizeCart(order.items ?? []),
      subtotal: order.subtotal,
      service: order.service,
      discount: order.discount,
      promoCode: order.promoCode,
      payment: order.payment,
      total: Number(order.total) || 0
    }));
}

export function selectedOptionTotal(options: PricedOption[], values: string[]) {
  return values.reduce((sum, value) => sum + getPricedOption(options, value).price, 0);
}

export function unitPrice(drink: Drink, customization: Customization) {
  const size = getPricedOption(sizeOptions, customization.size);
  const milk = getPricedOption(milkOptions, customization.milk);
  const toppings = selectedOptionTotal(toppingOptions, customization.toppings);
  const addOns = selectedOptionTotal(addOnOptions, customization.addOns);
  return roundMoney(drink.price + size.price + milk.price + toppings + addOns);
}

export function customizationSummary(customization: Customization) {
  const size = getPricedOption(sizeOptions, customization.size);
  const milk = getPricedOption(milkOptions, customization.milk);
  const toppings = customization.toppings.map((value) => getPricedOption(toppingOptions, value).label);
  const addOns = customization.addOns.map((value) => getPricedOption(addOnOptions, value).label);
  const summary = [`${size.label} size`, customization.ice, `${customization.sweetness} sweet`];

  if (milk.value !== "none") {
    summary.push(milk.label);
  }

  if (toppings.length) {
    summary.push(`Toppings: ${toppings.join(", ")}`);
  }

  if (addOns.length) {
    summary.push(`Add-ons: ${addOns.join(", ")}`);
  }

  return summary;
}

export function findPromo(code: string | null) {
  return promoCodes.find((promo) => promo.code === code?.toUpperCase());
}

export function promoDiscount(promo: PromoCode | undefined, subtotal: number, service: number) {
  if (!promo) {
    return { amount: 0, eligible: false, message: "" };
  }

  if (promo.minSubtotal && subtotal < promo.minSubtotal) {
    return {
      amount: 0,
      eligible: false,
      message: `${promo.code} applies at ${currency(promo.minSubtotal)}+`
    };
  }

  if (promo.kind === "percent") {
    return {
      amount: roundMoney(subtotal * promo.value),
      eligible: true,
      message: promo.label
    };
  }

  if (promo.kind === "service") {
    return {
      amount: roundMoney(service),
      eligible: service > 0,
      message: promo.label
    };
  }

  return {
    amount: roundMoney(Math.min(promo.value, subtotal + service)),
    eligible: true,
    message: promo.label
  };
}

export function paymentLabel(payment?: PaymentMethod) {
  return paymentOptions.find((option) => option.value === payment)?.label ?? "Payment not recorded";
}
