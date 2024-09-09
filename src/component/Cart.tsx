import React, { useState } from "react";
import styles from "./Cart.module.css";

interface IProductInfo {
  name: string;
  price: string;
}

interface ICart extends IProductInfo {
  id: string;
}

const Cart = () => {
  const [productInfo, setProductInfo] = useState<IProductInfo>({
    name: "",
    price: "",
  });
  const [cart, setCart] = useState<ICart[]>([]);

  const handleProductInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleAddCart = () => {
    if (productInfo.name && productInfo.price) {
      setCart([...cart, { id: Date.now().toString(), ...productInfo }]);
    }
  };

  return (
    <div className={styles.container}>
      <h2>This is Cart</h2>
      <input
        placeholder="Product Name"
        type="text"
        name="name"
        value={productInfo.name}
        onChange={handleProductInfoChange}
      />
      <input
        placeholder="Product Price"
        type="text"
        name="price"
        value={productInfo.price}
        onChange={handleProductInfoChange}
      />
      <button onClick={handleAddCart}>Add Cart</button>
      {cart.map((cart: ICart) => {
        return (
          <div key={cart.id}>
            <span>
              {cart.name} / {cart.price}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
