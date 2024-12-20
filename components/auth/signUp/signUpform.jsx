/* eslint-disable */

import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaUserCircle, FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import AdditionalInfo from "@/components/auth/signUp/additionalInfo";
import generateUsername from "@/utility/generateUserName";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "@/utility/firebase";

const defaultFormFields = {
  floating_first_name: "",
  floating_last_name: "",
  floating_email: "",
  floating_password: "",
};

const signUpform = () => {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    floating_first_name,
    floating_last_name,
    floating_email,
    floating_password,
  } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    // setIsLoading(true);
    event.preventDefault();
    const username = generateUsername();
    setIsSigned(true);

    // try {
    //   const { user } = await createAuthUserWithEmailAndPassword(
    //     floating_email,
    //     floating_password
    //   );

    //   const userCredential = await createUserDocumentFromAuth(user, {
    //     floating_first_name,
    //     floating_last_name,
    //     username,
    //   });

    //   const signUpUser = userCredential._key.path.segments;
    //   console.log(signUpUser[signUpUser.length - 1]);

    //   setUid(signUpUser[signUpUser.length - 1]);
    //   resetFormFields();
    //   setIsSigned(true);
    //   setIsLoading(false);
    // } catch (error) {
    //   if (error.code === "auth/email-already-in-use") {
    //     alert("Cannot create user, email already in use");
    //     setIsLoading(false);
    //   } else {
    //     console.log("user creation encountered an error", error);
    //     setIsLoading(false);
    //   }
    // }
  };

  return (
    <>
      <AdditionalInfo
        isSigned={isSigned}
        setIsSigned={setIsSigned}
        uid={uid}
        formFields={formFields}
      />

      <form class="max-w-md w-full" onSubmit={handleSubmit}>
        <div class="grid grid-cols-2 gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              value={formFields.floating_first_name}
              onChange={handleChange}
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#6A08CD] focus:outline-none focus:ring-0 focus:border-[#6A08CD] peer"
              placeholder=" "
              required
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#6A08CD] peer-focus:dark:text-[#6A08CD] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
            <FaUserCircle className="absolute text-[#646363] text-[1rem] right-[.8rem] top-[.65rem]" />
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              value={formFields.floating_lasst_name}
              onChange={handleChange}
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#6A08CD] focus:outline-none focus:ring-0 focus:border-[#6A08CD] peer"
              placeholder=" "
              required
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#6A08CD] peer-focus:dark:text-[#6A08CD] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
            <FaUserCircle className="absolute text-[#646363] text-[1rem] right-[.8rem] top-[.65rem]" />
          </div>
        </div>

        <div class="relative z-0 w-full mb-5 group ">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            value={formFields.floating_email}
            onChange={handleChange}
            class="block py-2.5 px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#6A08CD] focus:outline-none focus:ring-0 focus:border-[#6A08CD] peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#6A08CD] peer-focus:dark:text-[#6A08CD] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          <MdEmail className="absolute text-[#646363] text-[1rem] right-[.8rem] top-[.65rem]" />
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type={showPassword ? "text" : "password"}
            name="floating_password"
            id="floating_password"
            value={formFields.floating_password}
            onChange={handleChange}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#6A08CD] focus:outline-none focus:ring-0 focus:border-[#6A08CD] peer"
            placeholder=" "
            required
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#6A08CD] peer-focus:dark:text-[#6A08CD] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          <IoIosEye
            className="absolute text-[#646363] text-[1.4rem] right-[.8rem] top-[.65rem]"
            onClick={handleToggle}
          />
        </div>

        <div className="mt-[2.5rem]">
          <h1 className="font-semibold mb-4 text-[1rem]">
            Switch sign up mode
          </h1>
          <div className="flex w-full justify-between">
            <div className="flex gap-[1rem]">
              <FcGoogle className="py-2 px-3 cursor-pointer text-[2.6rem] border-[0.025rem] border-[#6A08CD] rounded-xl" />
              <FaFacebookF className="py-2 px-3 cursor-pointer text-[2.6rem] text-blue-900 border-[0.025rem] border-[#6A08CD] rounded-xl" />
              <FaTwitter className="py-2 px-3 cursor-pointer text-[2.6rem] text-blue-400 border-[0.025rem] border-[#6A08CD] rounded-xl" />
            </div>
            {isLoading ? (
              <div className=" flex items-center bg-gradient-to-br from-[#6b08cd50] to-[#891ba554] text-center  shadow cursor-pointer text-white text-[1.2rem] rounded-[1rem] px-[2.5rem] py-[1rem]">
                <div className="loader mx-auto mr-4"></div> signing....
              </div>
            ) : (
              <button
                type="submit"
                className="rounded-xl cursor-pointer text-white bg-gradient-to-br from-[#6A08CD] to-[#8A1BA5] px-[2.5rem] py-[.25rem]"
              >
                Sign up
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default signUpform;
