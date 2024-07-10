import React from "react";
import shopData from "@/utility/shopData";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/store/cart/cart.context.js";

const Productcard = ({ inputValue, selectedFilter }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [postId, setPostId] = useState("");
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = (postId) => {
    addItemToCart(postId);
    setShowOverlay(!showOverlay);
  };

  const toggleOverlay = (data, index) => {
    setShowOverlay(!showOverlay);
    setPostId(data, index);
  };

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = shopData.filter(
      (item) =>
        item.productTitle.toLowerCase().includes(inputValue.toLowerCase()) &&
        (selectedFilter
          ? item.category.toLowerCase() === selectedFilter.toLowerCase()
          : true)
    );
    setFilteredData(filtered);
  }, [inputValue, selectedFilter, shopData]);

  return (
    <>
      <div
        class={
          showOverlay
            ? "fixed z-10 inset-0 overflow-y-auto "
            : "hidden z-10 inset-0 overflow-y-auto"
        }
        id="modal"
      >
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 backdrop-blur-sm">
          <div class="fixed inset-0 transition-opacity">
            <div
              onClick={toggleOverlay}
              class="absolute inset-0 bg-gray-800 backdrop-blur-sm opacity-75"
            ></div>
          </div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <div class="inline-block align-bottom bg-white rounded-lg dark:bg-gray-700 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg md:max-w-[64rem] w-full">
            <div class="pt-[2rem] pb-[4rem] text-left px-[4rem]">
              <div class="flex justify-end gap-[10rem] md:gap-[25rem] items-center mb-[5rem]">
                <p class="text-xl font-semibold text-center capitalize">
                  {postId.category}
                </p>
                <div class="modal-close cursor-pointer float-end z-50">
                  <i
                    class="fas fa-times text-[1.5rem]"
                    onClick={toggleOverlay}
                  ></i>
                </div>
              </div>

              <div className="body grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-8 justify-between items-center">
                <img
                  src={postId.productImage}
                  alt=""
                  className="w-[25rem] h-[25rem]"
                />
                <div className="flex flex-col">
                  <span className="text-[1rem] w-[5.2rem] p-2 bg-[rgba(107,8,205,0.3)] dark:text-white text-purple-900 font-semibold">
                    Mini<span className="font-black">Mart</span>
                  </span>
                  <div className="flex flex-col mt-[2rem]">
                    <h1 className="text-[1.15rem] font-bold">
                      {postId.productTitle}
                    </h1>
                    <h1 className="text-[2rem] font-extrabold">
                     ${postId.productPrice}
                    </h1>
                    <h1 className="text-[1rem] font-bold">Quantity</h1>
                    <div className="quantity  items-center gap-4 flex">
                      <FaChevronLeft className="cursor-pointer" />
                      <p className="font-medium">1</p>
                      <FaChevronRight className="cursor-pointer" />
                    </div>
                    <h1 className="text-[1rem] font-bold mt-3">
                      Product Description
                    </h1>
                    <p className="text-[.8rem] font-light">
                      {postId.productSubTitle}
                    </p>
                    <div className="flex items-center justify-between  mt-12">
                      <div className="flex items-center gap-6 cursor-pointer">
                        <img
                          className="w-[2.4rem] h-[2.4rem] rounded-full"
                          src={postId.sellerPic}
                        />
                        <div className="flex flex-col">
                          <h1 className="text-[1rem] font-semibold">
                            {postId.sellerName}
                          </h1>
                          <p className="text-[.8rem] font-normal">shabi quel</p>
                        </div>
                      </div>
                      <i class="bx bxs-badge-check text-green-700 text-[1.6rem]"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-[5rem]">
                <button
                  onClick={() => addProductToCart(postId)}
                  className="rounded-xl cursor-pointer text-white bg-gradient-to-br from-[#6A08CD] to-[#8A1BA5] px-4 py-2"
                >
                  Add to cart
                </button>
                <button className="rounded-xl cursor-pointer text-white bg-gradient-to-br from-[#6A08CD] to-[#8A1BA5] px-4 py-2">
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-10">
        {filteredData.map((data, index) => (
          <div
            key={index}
            onClick={() => toggleOverlay(data, index)}
            className="cart-shop flex flex-col cursor-pointer p-6 w-[24rem] h-[24.9rem] drop-shadow-md bg-white dark:bg-[rgba(10,10,10,0.53)] rounded-xl"
          >
            <div className="shop-head flex justify-between w-full">
              <h1 className="font-semibold text-[1rem]">{data.sellerName}</h1>
              <img
                src={data.sellerPic}
                alt="Post User "
                className="w-[1.8rem] h-[1.8rem] rounded-full"
              />
            </div>
            <div className="shop-body flex flex-col justify-center">
              <img
                src={data.productImage}
                alt=""
                className="w-[12rem] h-[12rem] my-6 mx-auto"
              />
              <div className="description text-center">
                <h3 className="text-[1.2rem] font-bold">{data.productTitle}</h3>
                <p className="text-[.8rem] font-light">
                  {data.productSubTitle.substring(0, 50)}
                </p>
                <h1 className="font-extrabold text-[1.8rem] text-purple-900">
                 ${data.productPrice}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Productcard;
