import Head from "next/head";
import Link from "next/link";
import React from "react";
import Sidenavigation from "@/components/Nav/sidenavigation";
import Userpost from "@/components/Home/userpost";
import Statusupload from "@/components/Home/statusupload";
import { db, uid } from "@/utility/firebase";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { currentUser, setCurrentUser } from "@/store/user/user.reducer";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "@/utility/firebase";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        console.log(user);
        // createUserDocumentFromAuth(user);
      }

      const fetchUsers = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            dispatch(setCurrentUser(userData));
            // console.log(setCurrentUser(userData));
          }
        } catch (err) {
          console.log(err, "No such document!");
        }
      };
      // const pickedUser =
      //   user && (({ accessToken, email }) => ({ accessToken, email }))(user);

      console.log();
      fetchUsers();
    });
    return unsubscribe;
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

        <title>Minimart</title>
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
          <div className="px-0 md:px-[6.4rem] md:py-[2.5rem]  mx-auto slg:mx-0 h-[50rem] ">
            <Statusupload />
            <div className="flex gap-[13rem]">
              <div className="flex flex-col">
                <Userpost />
              </div>
              <div className=" flex-col hidden slg:flex">
                <div className="flex justify-between w-[30rem] my-6">
                  <p className="font-bold text-[#818181] text-[1.2rem]">
                    Best Tycons
                  </p>
                  <p className="font-medium text-[1.2rem]">See all</p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between w-[30rem] cursor-pointer">
                    <div className="flex gap-6">
                      <img
                        className="w-[3.2rem] h-[3.2rem] rounded-full"
                        src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[1rem] font-semibold">Mt34p09</h1>
                        <p className="text-[1rem] font-normal text-[#818181]">
                          Ojelade Olamide
                        </p>
                      </div>
                    </div>
                    <h1 className="text-[1.2rem] font-bold text-purple-900 hover:text-black">
                      Follow
                    </h1>
                  </div>
                  <div className="flex items-center justify-between w-[30rem] cursor-pointer">
                    <div className="flex gap-6">
                      <img
                        className="w-[3.2rem] h-[3.2rem] rounded-full"
                        src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[1rem] font-semibold">Mt34p09</h1>
                        <p className="text-[1rem] font-normal text-[#818181]">
                          Ojelade Olamide
                        </p>
                      </div>
                    </div>
                    <h1 className="text-[1.2rem] font-bold text-purple-900 hover:text-black">
                      Follow
                    </h1>
                  </div>
                  <div className="flex items-center justify-between w-[30rem] cursor-pointer">
                    <div className="flex gap-6">
                      <img
                        className="w-[3.2rem] h-[3.2rem] rounded-full"
                        src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[1rem] font-semibold">Mt34p09</h1>
                        <p className="text-[1rem] font-normal text-[#818181]">
                          Ojelade Olamide
                        </p>
                      </div>
                    </div>
                    <h1 className="text-[1.2rem] font-bold text-purple-900 hover:text-black">
                      Follow
                    </h1>
                  </div>
                  <div className="flex items-center justify-between w-[30rem] cursor-pointer">
                    <div className="flex gap-6">
                      <img
                        className="w-[3.2rem] h-[3.2rem] rounded-full"
                        src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[1rem] font-semibold">Mt34p09</h1>
                        <p className="text-[1rem] font-normal text-[#818181]">
                          Ojelade Olamide
                        </p>
                      </div>
                    </div>
                    <h1 className="text-[1.2rem] font-bold text-purple-900 hover:text-black">
                      Follow
                    </h1>
                  </div>
                  <div className="flex items-center justify-between w-[30rem] cursor-pointer">
                    <div className="flex gap-6">
                      <img
                        className="w-[3.2rem] h-[3.2rem] rounded-full"
                        src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[1rem] font-semibold">Mt34p09</h1>
                        <p className="text-[1rem] font-normal text-[#818181]">
                          Ojelade Olamide
                        </p>
                      </div>
                    </div>
                    <h1 className="text-[1.2rem] font-bold text-purple-900 hover:text-black">
                      Follow
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Home;
