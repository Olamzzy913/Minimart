/* eslint-disable */

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signOutUser, db, uid } from "@/utility/firebase";
import { selectCurrentUser } from "@/store/user/user.selector";
import { doc, getDoc, collection, query, getDocs } from "firebase/firestore";
import { onAuthStateChangedListener } from "@/utility/firebase";
// import { countNonZero } from "@techstark/opencv-js";

const statusupload = () => {
  const uploads = [
    {
      id: "1",
      name: "https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMGFuZCUyMGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "2",
      name: "https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMGFuZCUyMGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "3",
      name: "https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMGFuZCUyMGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "4",
      name: "https://plus.unsplash.com/premium_photo-1667243218560-fa648897c195?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbGUlMjBhbmQlMjBmZW1hbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "5",
      name: "https://images.unsplash.com/photo-1529566321973-795c4f4138bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFsZSUyMGFuZCUyMGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "6",
      name: "https://images.unsplash.com/photo-1715349952211-34d5b3ed9c64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDl8aG1lbnZRaFVteE18fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "7",
      name: "https://images.unsplash.com/photo-1714722292200-41d3b4aa3c0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQwfHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D",
    },
    {
      id: "8",
      name: "https://images.unsplash.com/photo-1553484771-898ed465e931?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzJTIwbWVuJTIwYW5kJTIwd29tZW58ZW58MHx8MHx8fDA%3D",
    },
  ];

  const currentUser = useSelector(selectCurrentUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [state, setState] = useState("");
  const [language, setLanguage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

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

            const {
              floating_first_name,
              floating_last_name,
              username,
              state,
              category,
              country,
              imageUrl1,
            } = userData;
            console.log(docSnap.data());
            setState(state);
            setImageUrl(imageUrl1);
            setCountry(country);
            setCategory(category);
            setFirstName(floating_first_name);
            setlastName(floating_last_name);
            setUsername(username);
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
      <div className="flex relative gap-[9rem]">
        <div className="container max-w-[50rem] w-[95%] ">
          <div className="slider-wrapper ">
            <div className="grid gap-[2rem] grid-cols-8 w-full slg:w-[54rem] justify-between">
              {uploads.map((url, index) => (
                <div
                  key={index}
                  className="h-[4rem] w-[4rem] md:w-[6rem] md:h-[6rem] rounded-full cursor-pointer"
                >
                  <img
                    src={url.name}
                    alt=""
                    className="border-[3px] object-cover border-purple-800 w-[3.8rem] h-[3.8rem] md:w-[5.8rem] md:h-[5.8rem] rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {currentUser ? (
          <div className="items-center justify-between w-full hidden slg:flex">
            <Link
              href="/profile"
              className="flex items-center gap-[1rem] cursor-pointer"
            >
              {imageUrl ? (
                <img
                  className="w-[4.8rem] h-[4.8rem] rounded-full object-cover"
                  src={imageUrl}
                />
              ) : (
                <img
                  src="/profile.jpg"
                  className="w-[4.8rem] h-[4.8rem] rounded-full object-cover"
                />
              )}

              <div className="flex flex-col">
                <h1 className="text-[1.4rem] font-semibold">{username}</h1>
                <p className="text-[1.4rem] md:text-[1.4rem] font-normal text-[#818181]">
                  {firstName} {lastName}
                </p>
              </div>
            </Link>
            <Link
              href="/signin"
              className="text-[1.2rem] font-bold text-purple-900 cursor-pointer hover:text-black"
              onClick={signOutUser}
            >
              Switch
            </Link>
          </div>
        ) : (
          <div className="items-center gap-[10rem] hidden slg:flex">
            <div className="flex gap-[1rem] cursor-pointer">
              <img
                className="w-[4.8rem] h-[4.8rem] rounded-full"
                src="https://i.pinimg.com/236x/67/b2/55/67b2552cb67d4d80f8fee23f39a5c85e.jpg"
              />
              <div className="flex flex-col">
                <h1 className="text-[1.4rem] font-semibold">Mt34p09</h1>
                <p className="text-[1.4rem] md:text-[1.4rem] font-normal text-[#818181]">
                  Guest
                </p>
              </div>
            </div>
            <Link
              href="/signin"
              className="text-[1.2rem] font-bold text-purple-900 cursor-pointer hover:text-black"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default statusupload;
