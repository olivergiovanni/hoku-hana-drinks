"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { defaultCustomization, drinks, storageKeys } from "../data/catalog";
import {
  findPromo,
  normalizeCart,
  normalizeOrders,
  promoDiscount,
  roundMoney,
  uniqueLineKey,
  unitPrice
} from "../lib/pricing";
import { readStorage } from "../lib/storage";
import type {
  CartDetail,
  CartLine,
  Customization,
  Order,
  PaymentMethod,
  SavedCartLine,
  SavedOrder
} from "../lib/types";

type OrderStore = {
  cart: CartLine[];
  cartDetails: CartDetail[];
  orders: Order[];
  itemCount: number;
  subtotal: number;
  service: number;
  discount: { amount: number; eligible: boolean; message: string };
  total: number;
  customer: string;
  pickup: string;
  note: string;
  promoInput: string;
  appliedPromo: string | null;
  promoError: string;
  payment: PaymentMethod;
  setCustomer: (value: string) => void;
  setPickup: (value: string) => void;
  setNote: (value: string) => void;
  setPromoInput: (value: string) => void;
  setPayment: (value: PaymentMethod) => void;
  addToCart: (id: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  updateCustomization: (key: string, patch: Partial<Customization>) => void;
  toggleMulti: (key: string, field: "toppings" | "addOns", value: string) => void;
  applyPromo: () => void;
  applyPromoCode: (code: string) => void;
  clearPromo: () => void;
  clearCart: () => void;
  clearOrders: () => void;
  duplicateLine: (key: string) => void;
  submitOrder: () => boolean;
};

const OrderStoreContext = createContext<OrderStore | null>(null);

export function OrderStoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customer, setCustomer] = useState("");
  const [pickup, setPickup] = useState("ASAP");
  const [note, setNote] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("counter");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedPromo = readStorage<string>(storageKeys.promo, "");
    setCart(normalizeCart(readStorage<SavedCartLine[]>(storageKeys.cart, [])));
    setOrders(normalizeOrders(readStorage<SavedOrder[]>(storageKeys.orders, [])));
    setAppliedPromo(savedPromo || null);
    setPromoInput(savedPromo);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(storageKeys.cart, JSON.stringify(cart));
    }
  }, [cart, ready]);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(storageKeys.orders, JSON.stringify(orders));
    }
  }, [orders, ready]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (appliedPromo) {
      window.localStorage.setItem(storageKeys.promo, JSON.stringify(appliedPromo));
    } else {
      window.localStorage.removeItem(storageKeys.promo);
    }
  }, [appliedPromo, ready]);

  const cartDetails = useMemo(() => {
    return cart
      .map((line) => {
        const drink = drinks.find((item) => item.id === line.id);
        if (!drink) {
          return null;
        }

        const price = unitPrice(drink, line.customization);
        return { ...line, drink, unitPrice: price, subtotal: price * line.quantity };
      })
      .filter(Boolean) as CartDetail[];
  }, [cart]);

  const subtotal = roundMoney(cartDetails.reduce((sum, line) => sum + line.subtotal, 0));
  const service = subtotal > 0 ? 1.5 : 0;
  const promo = findPromo(appliedPromo);
  const discount = promoDiscount(promo, subtotal, service);
  const total = roundMoney(Math.max(0, subtotal + service - discount.amount));
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  function addToCart(id: string) {
    const customization = { ...defaultCustomization, toppings: [], addOns: [] };

    setCart((current) => {
      const existing = current.find(
        (line) => line.id === id && JSON.stringify(line.customization) === JSON.stringify(customization)
      );

      if (existing) {
        return current.map((line) =>
          line.key === existing.key ? { ...line, quantity: line.quantity + 1 } : line
        );
      }

      return [
        ...current,
        {
          key: uniqueLineKey(id),
          id,
          quantity: 1,
          customization
        }
      ];
    });
  }

  function updateQuantity(key: string, quantity: number) {
    setCart((current) =>
      current
        .map((line) => (line.key === key ? { ...line, quantity } : line))
        .filter((line) => line.quantity > 0)
    );
  }
 
  function duplicateLine(key: string) {
    setCart((current) => {
      const original = current.find((line) => line.key === key);
      if (!original) {
        return current;
      }

      const index = current.findIndex((line) => line.key === key);
      const copy = {
        ...original,
        key: uniqueLineKey(original.id),
        quantity: 1
      };

      const next = [...current];
      next.splice(index + 1, 0, copy);
      return next;
    });
  }

  function updateCustomization(key: string, patch: Partial<Customization>) {
    setCart((current) =>
      current.map((line) =>
        line.key === key
          ? {
              ...line,
              customization: {
                ...line.customization,
                ...patch
              }
            }
          : line
      )
    );
  }

  function toggleMulti(key: string, field: "toppings" | "addOns", value: string) {
    setCart((current) =>
      current.map((line) => {
        if (line.key !== key) {
          return line;
        }

        const selected = line.customization[field];
        const next = selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value];

        return {
          ...line,
          customization: {
            ...line.customization,
            [field]: next
          }
        };
      })
    );
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    const nextPromo = findPromo(code);

    if (!code) {
      setAppliedPromo(null);
      setPromoError("");
      return;
    }

    if (!nextPromo) {
      setAppliedPromo(null);
      setPromoError("Promo code not found.");
      return;
    }

    setAppliedPromo(nextPromo.code);
    setPromoInput(nextPromo.code);
    setPromoError("");
  }

  function applyPromoCode(code: string) {
    setPromoInput(code);
    setAppliedPromo(code);
    setPromoError("");
  }

  function clearPromo() {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoError("");
  }

  function submitOrder() {
    if (!cartDetails.length || !customer.trim()) {
      return false;
    }

    const order: Order = {
      id: `HH-${Date.now().toString().slice(-6)}`,
      customer: customer.trim(),
      pickup,
      note: note.trim(),
      createdAt: new Date().toISOString(),
      items: cart,
      subtotal,
      service,
      discount: discount.amount,
      promoCode: discount.eligible ? promo?.code : undefined,
      payment,
      total
    };

    setOrders((current) => [order, ...current]);
    setCart([]);
    setCustomer("");
    setPickup("ASAP");
    setNote("");
    setAppliedPromo(null);
    setPromoInput("");
    setPayment("counter");
    return true;
  }

  const value: OrderStore = {
    cart,
    cartDetails,
    orders,
    itemCount,
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
    addToCart,
    updateQuantity,
    updateCustomization,
    toggleMulti,
    applyPromo,
    applyPromoCode,
    clearPromo,
    clearCart: () => setCart([]),
    clearOrders: () => setOrders([]),
    duplicateLine,
    submitOrder
  };

  return <OrderStoreContext.Provider value={value}>{children}</OrderStoreContext.Provider>;
}

export function useOrderStore() {
  const value = useContext(OrderStoreContext);

  if (!value) {
    throw new Error("useOrderStore must be used inside OrderStoreProvider");
  }

  return value;
}
