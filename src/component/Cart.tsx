import React, { useState } from "react";
import styles from "./Cart.module.css";

type CartType = {
  name: string;
  price: number;
};

const cartList: CartType[] = [
  {
    name: "ABC",
    price: 20,
  },
  {
    name: "DEF",
    price: 30,
  },
];

const Cart = () => {
  const [cart, setCart] = useState<CartType[]>([]);

  const onClickSetCart = (cartList: CartType[]) => {
    setCart([...cart, ...cartList]);
  };

  return (
    <div className={styles.container}>
      <h2>This is Cart</h2>
      <button onClick={() => onClickSetCart(cartList)}>Show Cart</button>
      {cart.map((cart: CartType, index: number) => {
        return (
          <div key={index}>
            <span>
              {cart.name} / {cart.price.toString()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
