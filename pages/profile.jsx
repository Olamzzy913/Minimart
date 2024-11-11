/* eslint-disable */
import Head from "next/head";
import Link from "next/link";
import React, { useRef } from "react";
import Post from "@/components/post/Poverlay";
import Sidenavigation from "@/components/Nav/sidenavigation";
import { AiFillPlusCircle } from "react-icons/ai";
import { selectCurrentUser } from "@/store/user/user.selector";
import { useSelector } from "react-redux";
import { db, uid } from "@/utility/firebase";
import {
  doc,
  getDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDocs,
  where,
} from "firebase/firestore";
import { onAuthStateChangedListener } from "@/utility/firebase";
import { useEffect, useState } from "react";

const profile = () => {
  const [userpostProfile, setUserpostProfile] = useState([]);
  const currentUser = useRef(null);
  const [userData, setUserData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const {
    floating_first_name,
    floating_last_name,
    username,
    purchaseing_rate,
    follower,
    following,
    state,
    category,
    country,
    imageUrl1,
  } = userData;

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        console.log(user);
        currentUser.value = user.uid;
        // createUserDocumentFromAuth(user);
        fetchUsers();
        fetchUserReel();
      }
    });
    return unsubscribe;
  }, [isActive]);

  const fetchUsers = async () => {
    try {
      const docRef = doc(db, "users", currentUser.value);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();

        setUserData(userData);
        console.log(docSnap.data());
      }
    } catch (err) {
      console.log(err, "No such document!");
    }
  };

  const fetchUserReel = async () => {
    try {
      const q = query(
        collection(db, "reels", currentUser.value, "post"),
        orderBy("timestamp", "asc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = [];
        querySnapshot.forEach((doc) => {
          setUserpostProfile((prevProfile) => [...prevProfile, doc.data()]);
          msgs.push({ ...doc.data(), id: doc.id });
        });

        // const docRefReel = doc(db, "reels", currentUser.value);
        // const docSnapReel = await getDoc(docRefReel);

        // if (docSnapReel.exists()) {
        //   setUserpostProfile((prevProfile) => [
        //     ...prevProfile,
        //     docSnapReel.data(),
        //   ]);
        // }
      });
      console.log("Document data:", userpostProfile);
    } catch (e) {
      console.log(e);
    }
  };

  const deletePost = async () => {
    try {
      await deleteDoc(doc(db, "reels", uid));
      fetchUserReel();
    } catch (e) {
      console.log(e);
    }
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

        <title>Minimart - Profile</title>
      </Head>
      <main>
        <Post isActive={isActive} setIsActive={setIsActive} />
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
          {username ? (
            <div className="flex flex-col px-[2rem] md:px-[6.4rem] md:py-[2.5rem]  mx-auto max-w-[80rem] w-full">
              <div className="profile-head w-full">
                <div className="flex justify-between gap-[1.5rem] md:gap-[2.5rem] items-center w-full">
                  {/* {imageUrl ? ( */}
                  <img
                    className="w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] rounded-full"
                    src={imageUrl1}
                  />
                  {/* ) : (
                    <img
                      src="/profile.jpg"
                      className="w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] rounded-full object-cover"
                    />
                  )} */}

                  <div className="flex flex-col gap-2 w-full">
                    <h1 className="font-bold flex items-center text-[1.2rem] md:text-[1.6rem] ml-[1.35rem] md:ml-[2.15rem]">
                      {username}
                      <i
                        class={
                          category === "buyer"
                            ? "bx bxs-badge-check text-blue-700 text-[2rem]"
                            : "bx bxs-badge-check text-green-600 text-[2rem]"
                        }
                      ></i>
                    </h1>
                    <h1 className="font-semibold text-[1.2rem] md:text-[1.6rem] ml-[1.35rem] md:ml-[2.15rem]">
                      {floating_first_name} {floating_last_name}
                    </h1>
                    <div className="flex justify-between">
                      <div className="grid grid-cols-3 gap-[.28rem] smi:gap-[8rem]">
                        <div className="flex flex-col text-center">
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            {userpostProfile?.length
                              ? userpostProfile.length
                              : "0"}
                          </p>
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            Posts
                          </p>
                        </div>
                        <div className="flex flex-col text-center">
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold ">
                            {purchaseing_rate?.lenght
                              ? purchaseing_rate.lenght
                              : "0"}
                            %
                          </p>
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            Purchase Rate
                          </p>
                        </div>
                        <div className="flex flex-col text-center">
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            {follower?.lenght ? follower.lenght : "0"}
                          </p>
                          <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                            Followers
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col text-center">
                        <p className="text-[.8rem] smi:text-[1.2rem] font-semibold">
                          {following?.lenght ? following.lenght : "0"}
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
                      <AiFillPlusCircle
                        onClick={() => setIsActive(true)}
                        className="cursor-pointer text-[1.5rem] md:text-[2.5rem] ml-4 text-[#696969]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-body mt-6">
                <div className="flex gap-10 justify-center">
                  <div className="pb-6 flex gap-6 justify-center cursor-pointer">
                    {/* <AiFillPlusCircle className="text-[2.5rem] ml-4 text-[#696969]" /> */}
                    <h1 className="cursor-pointer text-center  font-bold text-[1.5rem]">
                      Reel post
                    </h1>
                  </div>
                  <div
                    className={
                      category === "buyer"
                        ? "hidden"
                        : "pb-6 flex gap-6 justify-center"
                    }
                  >
                    {/* <AiFillPlusCircle className="text-[2.5rem] ml-4 text-[#696969]" /> */}
                    {category === "seller" && (
                      <h1 className="cursor-pointer text-center  font-bold text-[1.5rem]">
                        Shop post
                      </h1>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t-[0.05rem]">
                  {userpostProfile.map((items) => (
                    <div key={items.id} className="relative group">
                      <button className="text-[.8rem] font-medium absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white px-6 py-3 rounded-2xl bg-[#df4444]">
                        Delete post
                      </button>
                      <img
                        src={items.reel}
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
                  {userpostProfile.map((item) => (
                    <div key={item.id} className="relative group">
                      <button
                        onClick={deletePost}
                        className="text-[.8rem] font-medium absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white px-6 py-3 rounded-2xl bg-[#df4444]"
                      >
                        Delete post
                      </button>
                      <img
                        src={item.reel}
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
