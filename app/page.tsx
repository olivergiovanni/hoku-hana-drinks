import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto max-w-3xl rounded-lg border border-white/80 bg-white p-6 text-center shadow-[0_16px_40px_rgba(2,61,72,0.12)]">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#026c74]">Welcome</p>
      <h2 className="mt-2 text-3xl font-black text-[#172033]">Start a tropical drink order</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-[#4f5b6e]">
        Browse the product list, customize drinks in the cart, then review receipt-style order history.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/menu" className="btn-responsive rounded-lg bg-[#026c74] px-5 py-3 text-sm font-black text-white">
          Product List
        </Link>
        <Link href="/cart" className="btn-responsive rounded-lg bg-[#172033] px-5 py-3 text-sm font-black text-white">
          Cart
        </Link>
        <Link href="/history" className="btn-responsive rounded-lg bg-[#ffe8c9] px-5 py-3 text-sm font-black text-[#60351d]">
          Order History
        </Link>
      </div>
    </section>
  );
}
