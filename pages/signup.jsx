/* eslint-disable */
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SignUpform from "@/components/auth/signUp/signUpform";

const signup = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const isDark = currentTheme === "dark";

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

        <title>Create Account with Minimart</title>
      </Head>
      <div className="Nav flex items-center justify-between px-6 py-3">
        <Link href="/">
          <div className="ml-[1.2rem] slg:ml-[1.6rem] flex items-center gap-3 my-[2rem] ">
            <i className="fa-sharp fa-solid fa-cart-shopping  text-[1rem] p-4 text-white drop-shadow-xl rounded-xl bg-gradient-to-br from-[#6A08CD] to-[#8A1BA5] "></i>
            <h1 className="text-[1.5rem] font-bold hidden slg:block">
              <span className=" font-medium">mini</span>Mart
            </h1>
          </div>
        </Link>
        <div className="Switch-Toggle">
          {currentTheme === "dark" ? (
            <div
              className={
                isDark
                  ? "nav_link hover:bg-[#1A1A1A] cursor-pointer"
                  : "nav_link cursor-pointer"
              }
              onClick={() => setTheme("light")}
            >
              <i className="bx bx-sun text-[2rem] align-middle"></i>
              <button className="link font-light hidden slg:block">
                Switch mode
              </button>
            </div>
          ) : (
            <div
              className={
                isDark
                  ? "nav_link hover:bg-[#1A1A1A] cursor-pointer"
                  : "nav_link cursor-pointer"
              }
              onClick={() => setTheme("dark")}
            >
              <i className="fa-regular fa-moon text-[2rem] align-middle"></i>
              <button className="link font-light hidden slg:block">
                Switch mode
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="form-container px-[2rem] flex flex-col md:flex-row justify-between md:mr-[10rem] slg:mr-[20rem] items-center mx-auto md:mx-[10rem] mt-[6rem]">
        <div className="form max-w-[24rem] flex flex-col gap-[2.5rem] w-full">
          <div className="">
            <h1 className="uppercase">Start your Sales Networking</h1>
            <h1 className="text-[2rem] font-bold">Create New Account.</h1>
            <p>
              Already A Memeber?
              <Link href="/signin">
                <span className="text-purple-800 font-bold">Login</span>
              </Link>
            </p>
          </div>
          <SignUpform />
        </div>
        <div className="relative my-[8rem] md:my-0">
          <div className="absolute z-40 top-[4rem] -left-[12rem]">
            <div className="infoCart relative">
              <p className="shadow-md p-2 md:p-4 rounded-xl w-[16rem] text-black absolute bg-white z-40 -bottom-[2.7rem] left-[4.5rem]">
                Post your product yourself
              </p>
              <img
                src="https://images.unsplash.com/photo-1601598853072-3969239a6b9e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyaWVuZHMlMjBpbiUyMHN1cGVybWFya2V0fGVufDB8fDB8fHww"
                alt=""
                className="w-[9rem] h-[9rem] hidden md:block z-0 p-3 rounded-full border-[.15rem] border-[#222] border-dashed"
              />
            </div>
          </div>
          <div className="absolute z-40 -top-[4.5rem] -right-[2rem]">
            <div className="infoCart relative">
              <p className="shadow-md p-2 md:p-4 rounded-xl w-[12rem] text-black absolute bg-white z-40 -bottom-[1.7rem] -left-[8rem]">
                Connect with friends
              </p>
              <img
                src="https://plus.unsplash.com/premium_photo-1663040282353-06818b344206?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D"
                alt=""
                className="w-[9rem] h-[9rem] hidden md:block z-0 p-3 rounded-full border-[.15rem] border-[#222] border-dashed"
              />
            </div>
          </div>
          <div className="absolute z-40 bottom-[1.5rem] -right-[8rem]">
            <div className="infoCart relative">
              <p className="shadow-md p-2 md:p-4 rounded-xl w-[18rem] md:w-[28rem] absolute text-black bg-white z-40 -bottom-[1.7rem] right-[4rem]">
                Get direct access with the seller through chats and call
              </p>
              <img
                src="https://images.unsplash.com/photo-1519069060891-f8c50519bf39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoYXR8ZW58MHx8MHx8fDA%3D"
                alt=""
                className="w-[9rem] h-[9rem] hidden md:block z-0 p-3 rounded-full border-[.15rem] border-[#222] border-dashed"
              />
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1676730049571-24305f4dcff7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWluaW1hcnR8ZW58MHx8MHx8fDA%3D"
            alt=""
            className="w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] lg:w-[40rem] lg:h-[40rem] rounded-full -z-40"
          />
        </div>
      </div>
    </>
  );
};

export default signup;
