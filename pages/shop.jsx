import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";
import Sidenavigation from "@/components/Nav/sidenavigation";
import Productcard from "@/components/Shop/productcard";
import { IoSearch } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from "@/store/cart/cart.context.js";

const filter = ["collections", "foods", "utensils", "skin care", "services"];

const Shop = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const { cartItems, cartCount } = useContext(CartContext);

  const handleClick = (item, index) => {
    setActiveIndex(index);
    setSelectedFilter(item);
    console.log(item, index);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />

        <title>Minimart - Shop</title>
      </Head>
      <main>
        <div className="flex justify-between items-center md:hidden px-[2rem] smi:px-[4rem] py-[2rem] border-b mb-8">
          <Link href="/">
            <h1 className="text-[1.5rem] font-bold">
              <span className=" font-medium">Mini</span>mart
            </h1>
            {/* <i className="fa-sharp fa-solid fa-cart-shopping  text-[1rem] p-4 text-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_35px_35px_rgba(107,8,205,0.17)] rounded-xl bg-gradient-to-br from-[#6A08CD] to-[#8A1BA5] "></i> */}
          </Link>
          <Link href="/messages">
            <i class="fa-brands fa-facebook-messenger text-[2rem]"></i>
          </Link>
        </div>
        <div className="flex flex-col-reverse md:flex-row">
          <Sidenavigation />
          <div className="hidden md:block z-0 relative left-0 w-[inherit] md:w-[7.4rem] slg:w-[26rem] pl-[1rem] slg:pl-[2rem]"></div>
          <div className="shop-container flex flex-col max-w-[90rem] w-full mx-auto">
            <div className="flex justify-between">
              <div className="Header flex flex-col gap-[2rem] py-[3rem]">
                <div className="search flex gap-[1rem]">
                  <IoSearch className="text-[1.5rem] text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search for your desired product"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="text-[1rem] outline-none w-[16rem]"
                  />
                </div>
                <div className="filter">
                  <ul className="flex  gap-[3rem]">
                    {filter.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleClick(item, index)}
                        className={
                          activeIndex === index
                            ? "activeMenu capitalize"
                            : "defualtMenu capitalize"
                        }
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link
                href="/cart"
                className="flex justify-between border-[0.025rem] p-6 my-auto w-[20rem] rounded-md border-purple-700"
              >
                <div className="flex gap-2 items-center">
                  <TiShoppingCart className="text-[1.3rem] text-purple-900" />

                  <h2 className="">Shopping items</h2>
                </div>
                <h2 className="font-medium">{cartCount}</h2>
              </Link>
            </div>
            <Productcard
              inputValue={inputValue}
              selectedFilter={selectedFilter}
            />
          </div>
        </div>
      </main>
    </>
  );
};
export default Shop;
