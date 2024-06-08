"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import cartContext from "../context/cartContext";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { name, price, category, path } = product;
  const [qty, setQty] = useState(0);
  const { cart, removeProduct, addToCart, updateCart } =
    useContext(cartContext);

  const router = useRouter();

  useEffect(() => {
    if (cart) {
      const item = cart.find((cartItem) => cartItem.name === name);
      if (item) setQty(item.qty);
      else setQty(0);
    }
  }, [cart, name]);

  const decrement = () => {
    if (qty === 1) {
      removeProduct(name);
    } else {
      updateCart("decrement", product);
    }
  };

  const increment = () => {
    if (qty === 0) {
      addToCart(product, 1);
    } else {
      updateCart("increment", product);
    }
  };

  const handleQtyChange = ({ target }) => {
    const { value } = target;
    if (parseInt(value, 10) === 0) removeProduct(name);
    else updateCart("manual", product, value);
  };

  return (
    <section
      className="flex flex-col w-60 h-80 items-center rounded-lg m-8
      justify-between bg-slate-100 hover:border-2 hover:border-slate-300"
    >
      <div
        className="flex flex-col items-center rounded w-full h-full
        shadow-xl"
      >
        <div className="w-full mt-3">
          <div
            className="text-white bg-black w-max p-1 px-4 font-bold rounded
            drop-shadow-xl absolute z-10"
          >
            <span>R$ </span>
            <span>{price.toString().replace(".", ",")}</span>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <button onClick={() => router.push(`${category}/${name}`)}>
            <Image
              className="hover:scale-150 duration-150 hover:rotate-12"
              src={path}
              width={156}
              height={112}
              alt={name}
            />
          </button>
        </div>
        <Link href={`${category}/${name}}`} className=" text-xl text-center">
          {name}
        </Link>
        <div
          className="text-center rounded-b-lg w-full
          drop-shadow-xl"
        >
          <button
            className="text-white bg-black w-6 font-bold rounded-l"
            type="button"
            disabled={qty === 0}
            onClick={decrement}
          >
            -
          </button>
          <input
            title="Quantidade de produtos"
            type="text"
            inputMode="numeric"
            className="w-10 h-6 mb-4 mt-2 text-center border-0 focus:outline-none bg-white"
            value={qty}
            onChange={handleQtyChange}
          />
          <button
            className="text-white bg-black w-6 font-bold rounded-r"
            type="button"
            onClick={increment}
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}
