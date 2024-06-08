'use client'
import React, { createContext, useMemo, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();

export default CartContext;

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', []);

  const removeProduct = useCallback((name) => {
    const newCart = cart.filter((item) => item.name !== name);
    setCart(newCart);
  }, [cart, setCart]);

  const addToCart = useCallback(({ name, price, path }, qty) => {
    setCart((oldCart) => [...oldCart, {
      name,
      price,
      path,
      qty,
    }]);
  }, [setCart]);

  const updateCart = useCallback((type, product, value) => {
    const itemExist = cart.find((item) => item.name === product.name);
    if (!itemExist) addToCart(product, parseInt(value, 10));
    else {
      setCart((oldCart) => oldCart.map((item) => {
        if (item.name === product.name) {
          const newQty = {
            manual: parseInt(value, 10),
            increment: item.qty + 1,
            decrement: item.qty - 1,
          };
          return {
            ...item,
            qty: newQty[type],
          };
        } return item;
      }));
    }
  }, [cart, setCart, addToCart]);

  const contextValue = useMemo(() => ({
    cart,
    setCart,
    removeProduct,
    addToCart,
    updateCart,
  }), [cart, setCart, removeProduct, addToCart, updateCart]);

  return (
    <CartContext.Provider value={ contextValue }>
      { children }
    </CartContext.Provider>
  );
}

