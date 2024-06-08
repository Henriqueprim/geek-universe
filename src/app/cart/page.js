"use client"
import { useContext, useState, useEffect } from 'react';
import cartContext from '../../context/cartContext';
import ProductCard from '@/components/ProductCard';
import { useRouter } from "next/navigation";
import NavBar from '@/components/NavBar';
import Image from 'next/image';
import cartIcon from '/public/images/logos/cartIcon.png';

export default function Cart() {
    const { cart } = useContext(cartContext);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

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
            className="flex justify-center top-0 w-full"
          >
            <h1
              className="font-bold text-lg mt-4 mb-2 px-4 py-1.5
              rounded-sm text-center drop-shadow-md"
            >
            Meu Carrinho
            </h1>
          </div>
          <div
            className="m-12 mt-4 bg-slate-50 rounded-lg shadow-2xl"
          >
            <div>
              { cart.length === 0 ? (
                <h1
                  className='text-center'
                >Seu carrinho está vazio.</h1>
              ) : (
                <div className="grid grid-cols-4 place-self-center justify-items-center gap-x-16">
                { cart.map((product) => (
                  <ProductCard key={ product.name } product={ product } />
                  ))
                }
              </div>
              )}
            </div>
            <div
              className='flex flex-row justify-center w-full mb-32'
            >
              <button
                type="button"
                onClick={ () => router.push('/')}
                className="fixed bottom-16
                flex items-center rounded-md bg-white
                p-4 shadow-xl"
              >
                Continuar comprando
              </button>
            </div>
            <div className="flex flex-row">
              <button
                type="button"
                className="fixed bottom-14 right-8 h-16
                flex items-center rounded-full bg-white
                p-4 shadow-xl hover:border-2 border-black
                "
              >
                <Image
                  src={ cartIcon }
                  alt="shopping-cart-icon"
                  className="w-7 mx-2"
                />
                <span
                  className="mx-2"
                >
                  { isClient && `Total = R$ ${totalCart.toFixed(2).replace('.', ',')}` }
                </span>
              </button>
            </div>
          </div>
    </div>
  );
}

