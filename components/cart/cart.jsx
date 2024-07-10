import React from "react";
import { useContext } from "react";
import { CartContext } from "@/store/cart/cart.context.js";
import Cartcard from "@/components/cart/cartCard";

const Cart = () => {
  const { cartItems, cartTotal, cartCount } = useContext(CartContext);

  return (
    <>
      <div className="flex flex-col w-full justify-center mx-auto px-[2rem] smi:px-[4rem]">
        <div className="flex w-full justify-between border-b pb-8">
          <div className="flex gap-4 items-center">
            <h1 className="text-[1.3rem] font-bold">Your Cart</h1>
            <p className="text-[1rem] font-semibold">{cartCount} items</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[1rem] font-semibold">Total</p>
            <h1 className="text-[1.3rem] font-bold"> {cartTotal} USD</h1>
          </div>
        </div>
        <div className="carts flex flex-col ">
          {cartItems.map((cartItem) => (
            <div>
              <Cartcard key={cartItem.id} cartItem={cartItem} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
