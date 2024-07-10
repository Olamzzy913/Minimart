import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaUserCircle, FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
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
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(false);
  const router = useRouter();

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
    event.preventDefault();
    const username = generateUsername();

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        floating_email,
        floating_password
      );

      await createUserDocumentFromAuth(user, {
        floating_first_name,
        floating_last_name,
        username,
      });
      resetFormFields();
      router.push("/signin");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <>
      <div class="fixed z-100 inset-0 overflow-y-auto" id="modal">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
          </div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="py-4 text-left px-6">
              <div class="flex justify-between items-center pb-4">
                <p class="text-2xl font-bold">Your Account</p>
                <div class="modal-close cursor-pointer z-50">
                  <i class="fas fa-times"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            <button
              type="submit"
              className="rounded-xl cursor-pointer text-white bg-gradient-to-br from-[#6A08CD] to-[#8A1BA5] px-[2.5rem] py-[.25rem]"
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default signUpform;
