import Head from "next/head";
import Link from "next/link";
import React from "react";
import Sidenavigation from "@/components/Nav/sidenavigation";
import { AiFillPlusCircle } from "react-icons/ai";
import { selectCurrentUser } from "@/store/user/user.selector";
import { useSelector } from "react-redux";
import { db, uid } from "@/utility/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const profile = () => {
  const userpostProfile = [
    {
      id: "1",
      name: "https://plus.unsplash.com/premium_photo-1714229505201-072ef1c6edcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
    },
    {
      id: "2",
      name: "https://images.unsplash.com/photo-1715412406818-48241c841c9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      name: "https://images.unsplash.com/photo-1715645942867-4c8649966352?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      name: "https://images.unsplash.com/file-1715652217532-464736461acbimage?dpr=2&w=416&auto=format&fit=crop&q=60",
    },
    {
      id: "5",
      name: "https://images.unsplash.com/photo-1580293014311-44846850e146?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhdXRpZnVsJTIwdmlld3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "6",
      name: "https://images.unsplash.com/photo-1536724718637-70e3111a7abf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJlYXV0aWZ1bCUyMHZpZXdzfGVufDB8fDB8fHww",
    },
  ];
  const currentUser = useSelector(selectCurrentUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = uid();
        const docRef = doc(db, "users", data);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { floating_first_name, floating_last_name, username } =
            docSnap.data();
          setFirstName(floating_first_name);
          setlastName(floating_last_name);
          setUsername(username);
        }
      } catch (err) {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    fetchUsers();
  }, []);

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

        <title>Minimart - Profile</title>
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
          {currentUser ? (
            <div className="flex flex-col px-[2rem] md:px-[6.4rem] md:py-[2.5rem]  mx-auto max-w-[80rem] w-full">
              <div className="profile-head w-full">
                <div className="flex justify-between gap-[1.5rem] md:gap-[4rem] items-center w-full">
                  <img
                    className="w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] rounded-full"
                    src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    alt=""
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <h1 className="font-bold text-[1.2rem] md:text-[1.6rem] ml-[1.35rem] md:ml-[2.15rem]">
                      {firstName} {lastName}
                    </h1>
                    <div className="flex justify-between">
                      <div className="grid grid-cols-3 gap-[.28rem] smi:gap-[8rem]">
                        <div className="flex flex-col text-center">
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            6
                          </p>
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            Posts
                          </p>
                        </div>
                        <div className="flex flex-col text-center">
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold ">
                            60%
                          </p>
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            Purchase Rate
                          </p>
                        </div>
                        <div className="flex flex-col text-center">
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            56k
                          </p>
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            Followers
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col text-center">
                        <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                          6k
                        </p>
                        <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                          Following
                        </p>
                      </div>
                    </div>
                    <div className="flex ml-[1.35rem] md:ml-[2.15rem] items-center">
                      <button className="text-white bg-purple-800 px-4 py-2 text-[.6rem] md:text-[1rem] cursor-pointer rounded-md md:rounded-xl">
                        Edit Profile
                      </button>
                      <AiFillPlusCircle className="text-[1.5rem] md:text-[2.5rem] ml-4 text-[#696969]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-body mt-6">
                <div className="pb-6 flex gap-6 justify-center">
                  <AiFillPlusCircle className="text-[2.5rem] ml-4 text-[#696969]" />
                  <h1 className="text-center  font-bold text-[1.5rem]">Post</h1>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t-[0.05rem]">
                  {userpostProfile.map((url) => (
                    <div className="relative group">
                      <button className="text-[.8rem] font-medium absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white px-6 py-3 rounded-2xl bg-[#df4444]">
                        Delete post
                      </button>
                      <img
                        src={url.name}
                        alt=""
                        className=" object-cover w-full h-[15rem] md:h-[30rem]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col px-[2rem] md:px-[6.4rem] md:py-[2.5rem]  mx-auto max-w-[80rem] w-full">
              <div className="profile-head w-full">
                <div className="flex justify-between gap-[1.5rem] md:gap-[4rem] items-center w-full">
                  <img
                    className="w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] rounded-full"
                    src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                    alt=""
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <h1 className="font-bold text-[1.2rem] md:text-[1.6rem] ml-[1.35rem] md:ml-[2.15rem]">
                      Guest
                    </h1>
                    <div className="flex justify-between">
                      <div className="grid grid-cols-3 gap-[.28rem] smi:gap-[8rem]">
                        <div className="flex flex-col text-center">
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            6
                          </p>
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            Posts
                          </p>
                        </div>
                        <div className="flex flex-col text-center">
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold ">
                            60%
                          </p>
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            Purchase Rate
                          </p>
                        </div>
                        <div className="flex flex-col text-center">
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            56k
                          </p>
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            Followers
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col text-center">
                        <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                          6k
                        </p>
                        <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                          Following
                        </p>
                      </div>
                    </div>
                    <div className="flex ml-[1.35rem] md:ml-[2.15rem] items-center">
                      <button className="text-white bg-purple-800 px-4 py-2 text-[.6rem] md:text-[1rem] cursor-pointer rounded-md md:rounded-xl">
                        Edit Profile
                      </button>
                      <AiFillPlusCircle className="text-[1.5rem] md:text-[2.5rem] ml-4 text-[#696969]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-body mt-6">
                <div className="pb-6 flex gap-6 justify-center">
                  <AiFillPlusCircle className="text-[2.5rem] ml-4 text-[#696969]" />
                  <h1 className="text-center  font-bold text-[1.5rem]">Post</h1>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t-[0.05rem]">
                  {userpostProfile.map((url) => (
                    <div className="relative group">
                      <button className="text-[.8rem] font-medium absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white px-6 py-3 rounded-2xl bg-[#df4444]">
                        Delete post
                      </button>
                      <img
                        src={url.name}
                        alt=""
                        className=" object-cover w-full h-[15rem] md:h-[30rem]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default profile;
