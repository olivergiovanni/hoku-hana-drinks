export type Drink = {
  id: string;
  name: string;
  island: string;
  price: number;
  flavor: string;
  description: string;
  colors: {
    bg: string;
    liquid: string;
  };
};

export type PricedOption = {
  value: string;
  label: string;
  price: number;
};

export type Customization = {
  size: string;
  ice: string;
  sweetness: string;
  milk: string;
  toppings: string[];
  addOns: string[];
};

export type CartLine = {
  key: string;
  id: string;
  quantity: number;
  customization: Customization;
};

export type SavedCartLine = {
  key?: string;
  id?: string;
  quantity?: number;
  customization?: Partial<Customization>;
};

export type PaymentMethod = "counter" | "card" | "wallet" | "gift";

export type Order = {
  id: string;
  customer: string;
  pickup: string;
  note: string;
  createdAt: string;
  items: CartLine[];
  subtotal?: number;
  service?: number;
  discount?: number;
  promoCode?: string;
  payment?: PaymentMethod;
  total: number;
};

export type SavedOrder = Omit<Partial<Order>, "items"> & {
  items?: SavedCartLine[];
};

export type PromoCode = {
  code: string;
  label: string;
  kind: "percent" | "fixed" | "service";
  value: number;
  minSubtotal?: number;
};

export type CartDetail = CartLine & {
  drink: Drink;
  unitPrice: number;
  subtotal: number;
};
