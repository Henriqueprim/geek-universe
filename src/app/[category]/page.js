"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import cartIcon from "/public/images/logos/cartIcon.png";
import ProductCard from "../../components/ProductCard"
import productsInfos from "../../data/productsInfos.json";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../context/cartContext";
import NavBar from "../../components/NavBar";

export default function Category({ params }) {
    const [isClient, setIsClient] = useState(false);

    const router = useRouter();
    const {category} = params;
    
    const products = (productsInfos.filter((product) => product.category === category));
    const {cart} = useContext(CartContext);
      
    useEffect(() => {
      setIsClient(true);
    }, []);

    const totalCart = cart.reduce((acc, item) => (
    item.qty * parseFloat(item.price) + acc
    ), 0);
    
  
    return (
      <div>
        <NavBar />
        <div
          className="top-0 w-full flex justify-center"
        >
          <h1
            className="font-bold text-lg mt-6 px-4 py-1.5
            rounded-sm text-center drop-shadow-md"
          >
            { category }
          </h1>
        </div>
        <div
          className="m-12 mt-4 bg-slate-50 rounded-lg p-6 shadow-2xl"
        >
          <div
            className="grid grid-cols-4 justify-items-center gap-1"
          >
            {
              products.map((product) => (
                <ProductCard key={ product.name } product={ product } />
              ))
            }
          </div>
          <div className="flex flex-row">
            <button
              type="button"
              onClick={ () => router.push('/cart')}
              className="fixed bottom-14 right-8 h-16
              flex items-center rounded-full bg-white
              p-4 shadow-xl hover:border-2 border-black"
            >
              <Image
                src={ cartIcon }
                alt="shopping-cart-icon"
                className="w-7 mx-2"
              />
              <span
                className="mx-2"
              >
                { isClient && `R$ ${totalCart.toFixed(2).replace('.', ',')}` }
              </span>
            </button>
          </div>
        </div>
      </div>
     );
  }
  