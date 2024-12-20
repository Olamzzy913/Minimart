/* eslint-disable */

import React from "react";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/store/cart/cart.context.js";
import { MdDelete } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Cartcard = ({ cartItem }) => {
  const { addItemToCart, removeItemToCart, clearItemFromCart } =
    useContext(CartContext);

  const {
    productImage,
    cost,
    description,
    product,
    quantity,
    username,
    imageUrl1,
  } = cartItem;

  return (
    <>
      <div className="cart flex justify-between gap-[5rem] items-center ">
        <img
          src={productImage}
          className="w-[4rem] h-[4rem] object-cover"
          alt=""
        />
        <div className="flex justify-between gap-[1.5rem] smi:gap-[6rem] md:gap-[9rem] items-center border-b py-6 ">
          <div className="cart-details w-[9rem] smi:w-[12rem]">
            <h1 className="font-bold">{product}</h1>
            <p className="font-light text-[.8rem]">
              {description.substring(0, 20)}
            </p>
            <div className="flex gap-2 mt-1 items-center">
              <img
                src={imageUrl1}
                className="w-[1.2rem] h-[1.2rem] rounded-full object-cover"
                alt=""
              />
              <p className="font-semibold text-1.8rem">{username}</p>
            </div>
          </div>

          <div className="quantity  items-center gap-4 hidden smi:flex">
            <FaChevronLeft
              onClick={removeItemToCart}
              className="cursor-pointer"
            />
            <p className="font-medium">{quantity}</p>
            <FaChevronRight
              onClick={addItemToCart}
              className="cursor-pointer"
            />
          </div>
          <div className="amount">
            <h1 className="font-bold"> {quantity * cost} USD</h1>
          </div>
          <MdDelete
            onClick={clearItemFromCart}
            className="text-[1.5rem] cursor-pointer text-[#141414] dark:text-[#f3f3f3]"
          />
        </div>
      </div>
    </>
  );
};

export default Cartcard;
