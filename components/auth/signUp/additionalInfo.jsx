/* eslint-disable */
import { useState, useRef } from "react";
import { db } from "@/utility/firebase";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { onAuthStateChangedListener } from "@/utility/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import generateUsername from "@/utility/generateUserName";
import {
  createUserAndStoreData,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "@/utility/firebase";

const AdditionalInfo = ({ isSigned, setIsSigned, uid, formFields }) => {
  const router = useRouter();
  const storage = getStorage();
  const fileInputRef1 = useRef(null);
  const [state, setState] = useState(null);
  const [file1, setFile1] = useState(null);
  const [country, setCountry] = useState(null);
  const [language, setLanguage] = useState(null);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage1, setSelectedImage1] = useState(null);

  const handleButtonClick1 = () => {
    fileInputRef1.current.click();
  };

  const handleFileChange1 = (event) => {
    const file1 = event.target.files[0];
    if (file1) {
      setFile1(file1);
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage1(reader.result);
      };
      reader.readAsDataURL(file1);
    }
    console.log(file1);
  };

  const handleDataUpload = async () => {
    console.log("Signing user in...");
    setIsLoading(true);

    try {
      const username = generateUsername();
      let imageUrl1 = null;

      if (file1) {
        const fileName1 = `${new Date().getTime()}_${file1.name}`;
        const storageRef1 = ref(storage, `images/${fileName1}`);
        const snapshot1 = await uploadBytes(storageRef1, file1);
        imageUrl1 = await getDownloadURL(snapshot1.ref);
      } else {
        alert("Profile Image is not selected.");
        throw new Error("File upload failed: No file provided");
      }
      const {
        floating_first_name,
        floating_last_name,
        floating_email,
        floating_password,
      } = formFields;
      const basicData = {
        floating_first_name,
        username,
        floating_last_name,
        floating_email,
      };

      const additionalData = {
        state,
        category,
        country,
        imageUrl1,
        follower: [],
        following: [],
        purchaseing_rate: [],
        timestamp: serverTimestamp(),
      };

      console.log(basicData, additionalData);
      const user = await createUserAndStoreData(
        floating_email,
        floating_password,
        basicData,
        additionalData
      );
      router.push("/signin");
      setIsSigned(true);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error("User creation encountered an error", error);
      }
    } finally {
      setIsLoading(false);
      setCategory(null);
      setLanguage(null);
      setState(null);
      setCountry(null);
      setSelectedImage1(null);
      setFile1(null);
      setIsSigned(false);
    }
  };

  const handleInCompleteSignUp = async (uid) => {
    console.log(uid);
    try {
      let user;
      const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
          user = user;
          console.log(user);
        }
      });
      // Delete user from Firebase Auth
      const auth = getAuth();
      const user1 = auth.currentUser;

      deleteUser(user1)
        .then(() => {
          console.log("user deleted ");
        })
        .catch((error) => {
          console.log(error);
        });

      // Delete user from Firestore
      await deleteDoc(doc(db, "users", uid));
      await firestore.collection("users").doc(uid).delete();
      alert("Account creation cancelled");
    } catch (e) {
      console.log(e);
    }

    setCategory(null);
    setIsLoading(false);
    setLanguage(null);
    setState(null);
    setCountry(null);
    setSelectedImage1(null);
    setFile1(null);
    setIsSigned(false);
  };

  const closeModal = () => {
    alert(
      "Please be inform that your data wasn't provided enchance no user is created"
    );
    handleInCompleteSignUp(uid);
  };

  if (!isSigned) return null;

  return (
    <div
      id="authentication-modal"
      role="dialog"
      aria-hidden="true"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-[rgba(45,27,206,0.12)] backdrop-blur-[2px]"
    >
      <div className="relative bg-white flex flex-col items-center rounded-[1rem] shadow px-4 py-[2rem] md:pb-[4rem] mx-4 w-full max-w-[36rem] md:max-w-[42rem]">
        <div className="w-[28rem] md:w-[32rem]">
          <div className="flex justify-between w-full items-center h-[52rem] flex-col">
            <div className="flex flex-col w-full ">
              <div className="flex items-center w-full mb-6">
                <h1 className="text-[1.4rem] mx-auto font-medium">
                  Additional Information
                </h1>
                <MdOutlineClose
                  className=" text-[2rem] cursor-pointer"
                  onClick={closeModal}
                />
              </div>

              <div
                onClick={handleButtonClick1}
                className=" cursor-pointer flex flex-col items-center justify-center mx-auto"
              >
                {selectedImage1 ? (
                  <img
                    src={selectedImage1}
                    className="w-[10rem] h-[10rem] mx-auto object-cover border-[rgba(137,27,165,0.54)] border rounded-full"
                  />
                ) : (
                  <img
                    src="/profile.jpg"
                    className="w-[10rem] h-[10rem] mx-auto object-cover border-[rgba(137,27,165,0.54)] border rounded-full"
                  />
                )}
                <span className="text-[1.2rem] font-medium">
                  Upload your profile pics
                </span>
              </div>

              <input
                type="file"
                ref={fileInputRef1}
                style={{ display: "none" }}
                onChange={handleFileChange1}
              />

              <div className="flex flex-col justify-center items-center w-full">
                <select
                  value={category}
                  name="category"
                  className=" px-8 py-5 cursor-pointer mt-[2rem] w-full outline-none border rounded-xl text-[1.2rem] focus:outline-none focus:border-indigo-300"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="">--Select category--</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>

                <input
                  type="text"
                  name="language"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                  placeholder="language  e.g English"
                  className=" px-8 py-5 mt-[2rem] w-full outline-none border rounded-xl text-[1.2rem] focus:outline-none focus:border-indigo-300"
                />
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  placeholder="state  e.g Lagos"
                  className=" px-8 py-5 mt-[2rem] w-full outline-none border rounded-xl text-[1.2rem] focus:outline-none focus:border-indigo-300"
                />

                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  placeholder="country  e.g Nigeria"
                  className=" px-8 py-5 mt-[2rem] w-full outline-none border rounded-xl text-[1.2rem] focus:outline-none focus:border-indigo-300"
                />
              </div>
            </div>

            {isLoading ? (
              <div className=" flex items-center justify-center bg-gradient-to-br from-[#6b08cd50] to-[#891ba554] text-center w-full shadow cursor-pointer text-white text-[1.2rem] leading-[2rem] rounded-[1rem] px-[2.4rem] md:px-[3.8rem] py-[1rem]">
                <div className="loader mr-5"></div> loading....
              </div>
            ) : (
              <button
                onClick={handleDataUpload}
                className="bg-gradient-to-br from-[#6A08CD] to-[#8A1BA5] text-center w-full shadow cursor-pointer text-white text-[1.2rem] leading-[2rem] rounded-[1rem] px-[2.4rem] md:px-[3.8rem] py-[1rem]"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
