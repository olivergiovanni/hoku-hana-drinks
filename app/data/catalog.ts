import type { Customization, Drink, PaymentMethod, PricedOption, PromoCode } from "../lib/types";

export const drinks: Drink[] = [
  {
    id: "mango-sunrise",
    name: "Mango Sunrise Splash",
    island: "Koa Coast",
    price: 7.5,
    flavor: "Mango, pineapple, passionfruit",
    description: "Bright, fizzy, and golden with a sweet-tart island finish.",
    colors: {
      bg: "linear-gradient(135deg, #ffd166, #fb6f4f)",
      liquid: "linear-gradient(180deg, #ffe066, #fb8500)"
    }
  },
  {
    id: "moonlit-ube",
    name: "Moonlit Ube Colada",
    island: "Luna Bay",
    price: 8.25,
    flavor: "Ube, coconut cream, vanilla",
    description: "Creamy purple coconut with a calm moonlight shimmer.",
    colors: {
      bg: "linear-gradient(135deg, #b8c0ff, #6a4c93)",
      liquid: "linear-gradient(180deg, #d8bbff, #7b2cbf)"
    }
  },
  {
    id: "reef-lime",
    name: "Reef Lime Cooler",
    island: "Nalu Point",
    price: 6.75,
    flavor: "Lime, mint, cucumber",
    description: "A crisp green cooler made for beach walks and hot afternoons.",
    colors: {
      bg: "linear-gradient(135deg, #80ed99, #00b4d8)",
      liquid: "linear-gradient(180deg, #ccff33, #2dc653)"
    }
  },
  {
    id: "lava-guava",
    name: "Lava Guava Punch",
    island: "Lehua Ridge",
    price: 7.95,
    flavor: "Guava, strawberry, ginger",
    description: "Ruby fruit punch with a gentle ginger spark.",
    colors: {
      bg: "linear-gradient(135deg, #ff7b7b, #c9184a)",
      liquid: "linear-gradient(180deg, #ffccd5, #ff4d6d)"
    }
  },
  {
    id: "starlit-lychee",
    name: "Starlit Lychee Fizz",
    island: "Hoku Pier",
    price: 7.25,
    flavor: "Lychee, blue citrus, soda",
    description: "Sparkling blue citrus with soft lychee sweetness.",
    colors: {
      bg: "linear-gradient(135deg, #90dbf4, #4361ee)",
      liquid: "linear-gradient(180deg, #caf0f8, #00b4d8)"
    }
  },
  {
    id: "cocoa-orchid",
    name: "Cocoa Orchid Shake",
    island: "Orchid Walk",
    price: 8.5,
    flavor: "Cacao, orchid syrup, oat milk",
    description: "A rich, floral shake with a dusky festival finish.",
    colors: {
      bg: "linear-gradient(135deg, #f7b267, #6d597a)",
      liquid: "linear-gradient(180deg, #d4a373, #7f5539)"
    }
  }
];

export const sizeOptions: PricedOption[] = [
  { value: "small", label: "Small", price: -1 },
  { value: "regular", label: "Regular", price: 0 },
  { value: "large", label: "Large", price: 1.5 }
];

export const iceOptions = ["No ice", "Light ice", "Regular ice", "Extra ice"];
export const sweetnessOptions = ["25%", "50%", "75%", "100%"];

export const milkOptions: PricedOption[] = [
  { value: "none", label: "No milk", price: 0 },
  { value: "coconut", label: "Coconut milk", price: 0.75 },
  { value: "oat", label: "Oat milk", price: 0.75 },
  { value: "whole", label: "Whole milk", price: 0.5 },
  { value: "almond", label: "Almond milk", price: 0.75 }
];

export const toppingOptions: PricedOption[] = [
  { value: "lychee-jelly", label: "Lychee jelly", price: 0.75 },
  { value: "popping-boba", label: "Popping boba", price: 0.9 },
  { value: "coconut-flakes", label: "Coconut flakes", price: 0.5 },
  { value: "mochi-pearls", label: "Mochi pearls", price: 1 }
];

export const addOnOptions: PricedOption[] = [
  { value: "fruit-shot", label: "Extra fruit shot", price: 1 },
  { value: "sparkling-finish", label: "Sparkling finish", price: 0.5 },
  { value: "protein-wave", label: "Protein wave", price: 1.25 },
  { value: "reusable-cup", label: "Reusable cup", price: 2 }
];

export const promoCodes: PromoCode[] = [
  { code: "ALOHA10", label: "10% off drinks", kind: "percent", value: 0.1 },
  { code: "LUAU5", label: "$5 off $25+", kind: "fixed", value: 5, minSubtotal: 25 },
  { code: "FREESERVICE", label: "Free service fee", kind: "service", value: 1 }
];

export const paymentOptions: Array<{ value: PaymentMethod; label: string; detail: string }> = [
  { value: "counter", label: "Pay at Counter", detail: "Cash or card on pickup" },
  { value: "card", label: "Island Card", detail: "Dummy card approval" },
  { value: "wallet", label: "Wave Wallet", detail: "Mock wallet payment" },
  { value: "gift", label: "Gift Shell", detail: "Fake gift balance" }
];

export const defaultCustomization: Customization = {
  size: "regular",
  ice: "Regular ice",
  sweetness: "100%",
  milk: "none",
  toppings: [],
  addOns: []
};

export const storageKeys = {
  cart: "hoku-hana-cart",
  orders: "hoku-hana-orders",
  promo: "hoku-hana-promo"
};
