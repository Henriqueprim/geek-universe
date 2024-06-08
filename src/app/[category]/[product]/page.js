"use client"
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import productsInfos from '../../../data/productsInfos.json';
import cartContext from '../../../context/cartContext';
import cartIcon from '/public/images/logos/cartIcon.png';
import NavBar from '@/components/NavBar';

export default function ProductPage({ params }) {
    const [qty, setQty] = useState(0);
    const { cart, removeProduct, addToCart, updateCart } = useContext(cartContext);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    const router = useRouter();

    const { product } = params;
    const clearName = (input) => {
        const decode = decodeURIComponent(input);
        const clearChars = decode.replace(/[^a-zA-Z\s-]/g, '');
        const clearedName = clearChars.replace(/[A-Z]$/, '');
        return clearedName;
    }

    const productName = clearName(product);
    const productInfos = productsInfos.find((product) => product.name === productName);
    const { name, price, category, description, path } = productInfos;

    
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
          updateCart('decrement', productInfos);
        }
    };

    const increment = () => {
       if (qty === 0) {
          addToCart(productInfos, 1);
        } else {
          updateCart('increment', productInfos);
        }
    };

    const handleQtyChange = ({ target }) => {
        const { value } = target;
        if (parseInt(value, 10) === 0) removeProduct(name);
        else updateCart('manual', productInfos, value);
    };
 
    const totalCart = cart.reduce((acc, item) => (
        item.qty * parseFloat(item.price) + acc
    ), 0);



    return (
        <div>
            <NavBar />
            <div
                className="m-12 mt-4 bg-slate-50 rounded-lg p-6 shadow-2xl"
            >
                <h1 
                    className="text-2xl font-bold mb-4"
                >
                    { name }
                </h1>
                <div className="flex flex-row">
                    <Image
                        className='rounded-md'
                        width={ 300 }
                        height={ 300 }
                        src={ path } 
                        alt={ name } 
                    />
                    <div
                        className='w-full h-full text-center'
                    >
                        <p
                            className='font-bold my-6'
                        >
                            {` Categoria: ${ category }`}
                        </p>
                        <p
                            className='mt-6 mb-16 font-medium'
                        >
                            { description }
                        </p>
                        <p>
                        { `R$ ${price.toString().replace('.', ',')}` }
                        </p>
                        <button
                            className="text-white bg-black w-6 font-bold rounded-l hover:bg-grey"
                            type="button"
                            disabled={ qty === 0 }
                            onClick={ decrement }
                        >
                            -
                        </button>
                        <input
                            type="text"
                            inputMode="numeric"
                            className="w-10 h-6 mt-2 text-center border-0 focus:outline-none bg-white"
                            value={ qty }
                            onChange={ handleQtyChange }
                            />
                        <button
                            className="text-white bg-black w-6 font-bold rounded-r hover:bg-grey"
                            type="button"
                            onClick={ increment }
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <button
                    type="button"
                    onClick={ () => router.push('/cart')}
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
                        { isClient && `R$ ${totalCart.toFixed(2).replace('.', ',')}` }
                    </span>
                </button>
          </div>
        </div>
    );
};
