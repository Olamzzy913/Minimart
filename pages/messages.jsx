import Head from "next/head";
import Link from "next/link";
import React from "react";
import Sidenavigation from "@/components/Nav/sidenavigation";
import { TbSearch } from "react-icons/tb";
const messages = () => {
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

        <title>Minimart - Messages</title>
      </Head>
      <main>
        <div className="flex justify-between items-center md:hidden px-[2rem] py-[1rem] smi:px-[4rem] smi:py-[2rem] border-b mb-8">
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
          <div className="max-w-full smi:max-w-[58rem]  md:max-w-[68rem] relative w-full h-screen mx-auto py-[1.5rem] md:py-[4rem]">
            <div className="flex w-full justify-center mx-auto px-[1rem] smi:px-[4rem] h-screen">
              <div className="chat-list w-full md:w-[25rem] lg:w-[30rem] flex flex-col gap-6">
                <div className="flex p-3 rounded-[.8rem] bg-[rgba(180,180,180,0.49)]">
                  <TbSearch className="text-[1.4rem]" />
                  <input
                    type="search"
                    name="Search"
                    id=""
                    placeholder="Search for user"
                    className="pl-4 outline-none bg-[rgba(180,180,180,0.06)] w-full"
                  />
                </div>
                <div className="flex items-center justify-between w-full cursor-pointer ">
                  <div className="flex gap-[1rem]">
                    <img
                      className="w-[3.2rem] h-[3.2rem] rounded-full"
                      src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[1rem] font-black">Mt34p09</h1>
                      <p className="text-[1rem] font-medium">
                        Send the address
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-[1rem] font-semibold">4:30 PM</h1>
                    <p className="text-[.6rem] rounded-full w-[1.7rem] p-[0.4rem] text-center bg-green-700 text-white font-bold">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full cursor-pointer ">
                  <div className="flex gap-[1rem]">
                    <img
                      className="w-[3.2rem] h-[3.2rem] rounded-full"
                      src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[1rem] font-black">Mt34p09</h1>
                      <p className="text-[1rem] font-medium">
                        Send the address
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-[1rem] font-semibold">4:30 PM</h1>
                    <p className="text-[.6rem] rounded-full w-[1.7rem] p-[0.4rem] text-center bg-green-700 text-white font-bold">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full cursor-pointer ">
                  <div className="flex gap-[1rem]">
                    <img
                      className="w-[3.2rem] h-[3.2rem] rounded-full"
                      src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[1rem] font-black">Mt34p09</h1>
                      <p className="text-[1rem] font-medium">
                        Send the address
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-[1rem] font-semibold">4:30 PM</h1>
                    <p className="text-[.6rem] rounded-full w-[1.7rem] p-[0.4rem] text-center bg-green-700 text-white font-bold">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full cursor-pointer ">
                  <div className="flex gap-[1rem]">
                    <img
                      className="w-[3.2rem] h-[3.2rem] rounded-full"
                      src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[1rem] font-black">Mt34p09</h1>
                      <p className="text-[1rem] font-medium">
                        Send the address
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-[1rem] font-semibold">4:30 PM</h1>
                    <p className="text-[.6rem] rounded-full w-[1.7rem] p-[0.4rem] text-center bg-green-700 text-white font-bold">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full cursor-pointer ">
                  <div className="flex gap-[1rem]">
                    <img
                      className="w-[3.2rem] h-[3.2rem] rounded-full"
                      src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[1rem] font-black">Mt34p09</h1>
                      <p className="text-[1rem] font-medium">
                        Send the address
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-[1rem] font-semibold">4:30 PM</h1>
                    <p className="text-[.6rem] rounded-full w-[1.7rem] p-[0.4rem] text-center bg-green-700 text-white font-bold">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full cursor-pointer ">
                  <div className="flex gap-[1rem]">
                    <img
                      className="w-[3.2rem] h-[3.2rem] rounded-full"
                      src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[1rem] font-black">Mt34p09</h1>
                      <p className="text-[1rem] font-medium">
                        Send the address
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-[1rem] font-semibold">4:30 PM</h1>
                    <p className="text-[.6rem] rounded-full w-[1.7rem] p-[0.4rem] text-center bg-green-700 text-white font-bold">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full cursor-pointer ">
                  <div className="flex gap-[1rem]">
                    <img
                      className="w-[3.2rem] h-[3.2rem] rounded-full"
                      src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[1rem] font-black">Mt34p09</h1>
                      <p className="text-[1rem] font-medium">
                        Send the address
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-[1rem] font-semibold">4:30 PM</h1>
                    <p className="text-[.6rem] rounded-full w-[1.7rem] p-[0.4rem] text-center bg-green-700 text-white font-bold">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full cursor-pointer ">
                  <div className="flex gap-[1rem]">
                    <img
                      className="w-[3.2rem] h-[3.2rem] rounded-full"
                      src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[1rem] font-black">Mt34p09</h1>
                      <p className="text-[1rem] font-medium">
                        Send the address
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-[1rem] font-semibold">4:30 PM</h1>
                    <p className="text-[.6rem] rounded-full w-[1.7rem] p-[0.4rem] text-center bg-green-700 text-white font-bold">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full cursor-pointer ">
                  <div className="flex gap-[1rem]">
                    <img
                      className="w-[3.2rem] h-[3.2rem] rounded-full"
                      src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[1rem] font-black">Mt34p09</h1>
                      <p className="text-[1rem] font-medium">
                        Send the address
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-[1rem] font-semibold">4:30 PM</h1>
                    <p className="text-[.6rem] rounded-full w-[1.7rem] p-[0.4rem] text-center bg-green-700 text-white font-bold">
                      1
                    </p>
                  </div>
                </div>
              </div>
              <div className="chat-content hidden md:flex flex-col w-full h-2/5  bg-[rgba(194,194,194,0.53)] ml-8">
                Main chat
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default messages;
