"use client";

import { useRouter } from "next/navigation";
import { ProductCard } from "../../components/ProductCard";
import { SectionHeader } from "../../components/SectionHeader";
import { useOrderStore } from "../../context/order-store";
import { drinks } from "../../data/catalog";

export default function MenuPage() {
  const router = useRouter();
  const { addToCart } = useOrderStore();

  return (
    <section>
      <SectionHeader
        eyebrow="Product List"
        title="Island coolers"
        note="Local favorites with bright day and night festival energy."
      />
      <div className="product-grid grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {drinks.map((drink) => (
          <ProductCard
            key={drink.id}
            drink={drink}
            onAdd={() => {
              addToCart(drink.id);
              router.push("/cart");
            }}
          />
        ))}
      </div>
    </section>
  );
}
