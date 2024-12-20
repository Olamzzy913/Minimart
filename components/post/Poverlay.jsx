/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import { db } from "@/utility/firebase";
import { MdOutlineClose } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";
import { IoCameraOutline } from "react-icons/io5";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChangedListener } from "@/utility/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Post = ({ isActive, setIsActive }) => {
  const storage = getStorage();
  const fileInputRef1 = useRef(null);
  const [file1, setFile1] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [cost, setCost] = useState(null);
  const [productType, setProductType] = useState(null);
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [messaageContent, setMessaageContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage1, setSelectedImage1] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        console.log(user);
        // createUserDocumentFromAuth(user);
      }
      setUserUid(user.uid);
      const fetchUsers = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();

            const { category } = userData;
            console.log(docSnap.data());

            setCategory(category);
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

  async function removeBg(file) {
    const API_KEY = "ME2GNYmWtrWFXihkApK8P7m2";

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", file);

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": API_KEY },
        body: formData,
      });

      if (response.ok) {
        return await response.arrayBuffer();
      } else {
        const errorData = await response.json();
        throw new Error(
          `${response.status}: ${
            errorData.errors[0]?.title || response.statusText
          }`
        );
      }
    } catch (error) {
      console.error("Error removing background:", error.message);
      throw error;
    }
  }

  const handleUpload = async () => {
    setIsLoading(true);

    try {
      if (!file1) {
        alert("Profile Image is not selected.");
        throw new Error("File upload failed: No file provided");
      }

      let imageUrl = null;

      if (category === "shop") {
        try {
          const bgRemovedBuffer = await removeBg(file1);
          const bgRemovedBlob = new Blob([bgRemovedBuffer], {
            type: "image/png",
          });
          const fileName1 = `${new Date().getTime()}_${bgRemovedBlob.name}`;
          const storageRef1 = ref(storage, `images/${fileName1}`);
          const snapshot1 = await uploadBytes(storageRef1, bgRemovedBlob);
          imageUrl = await getDownloadURL(snapshot1.ref);

          await addDoc(collection(db, "shopData", userUid, "post"), {
            uid: userUid,
            product,
            productCategory: productType,
            productImage: imageUrl,
            cost: cost,
            description: description,
            timestamp: serverTimestamp(),
          });

          console.log("Background removed and uploaded successfully.");
        } catch (removeBgError) {
          console.error(
            "Failed to process image with Remove.bg:",
            removeBgError
          );
          // Fall back to the original image if Remove.bg fails
        }
      }

      if (category === "reel") {
        const fileName1 = `${new Date().getTime()}_${file1.name}`;
        const storageRef1 = ref(storage, `images/${fileName1}`);
        const snapshot1 = await uploadBytes(storageRef1, file1);
        imageUrl = await getDownloadURL(snapshot1.ref);

        await addDoc(collection(db, "reels", userUid, "post"), {
          uid: userUid,
          likes: [],
          comments: [],
          reel: imageUrl,
          messaageContent,
          timestamp: serverTimestamp(),
        });
      }

      console.log("Data saved successfully.");
      setIsActive(true);
    } catch (error) {
      console.error("Error occurred:", error.message);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setCategory(null);
      setCost(null);
      setProduct(null);
      setDescription(null);
      setMessaageContent("");
      setSelectedImage1(null);
      setFile1(null);
      setIsActive(false);
    }
  };

  const closeModal = () => {
    setIsLoading(false);
    setCategory(null);
    setMessaageContent("");
    setSelectedImage1(null);
    setFile1(null);
    setIsActive(false);
  };

  if (!isActive) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && closeModal()}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-[rgba(45,27,206,0.12)] backdrop-blur-[2px]"
    >
      <div className="relative bg-white flex flex-col items-center rounded-[1rem] shadow px-4 py-[2rem] md:pb-[4rem] mx-4 w-full max-w-[36rem] md:max-w-[42rem]">
        <div className="w-[28rem] md:w-[32rem]">
          <div className="flex justify-between w-full items-center h-[54rem] flex-col">
            <div className="flex items-center w-full mb-6">
              <h1 className="text-[1.4rem] mx-auto font-medium">
                New Highlights
              </h1>
              <MdOutlineClose
                className=" text-[2rem] cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <div className="flex flex-col w-full  mb-[1rem] h-[50rem] overflow-hidden overflow-y-scroll">
              <div className=" cursor-pointer flex flex-col items-center justify-center mx-auto">
                {selectedImage1 ? (
                  <img
                    src={selectedImage1}
                    className="w-[25rem] h-[30rem] mx-auto object-cover border-[rgba(137,27,165,0.54)] border rounded-2xl"
                  />
                ) : (
                  <>
                    <div class="flex gap-10 items-center border border-dashed rounded-2xl border-[#D5C7DE] bg-[#FFFFFE] px-12 py-8">
                      <FiUploadCloud class=" text-[2rem] text-[#994FF3]" />
                      <div class="flex flex-col w-full">
                        <h1 class="font-medium">Upload new image Highlights</h1>
                        <p class="text-[#B3B3B3] font-normal text-[1.2rem]">
                          File accepted; .jpg, .jpeg, .png
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={handleButtonClick1}
                      class="flex cursor-pointer  shadow text-black font-semibold items-center justify-center mt-6 mx-auto rounded-2xl w-full border-[#ECE6F0] border-[2px] px-[1.5rem] py-[1rem] text-center"
                    >
                      <IoCameraOutline class="text-[1.6rem] mr-2" /> Take photo
                    </div>
                  </>
                )}
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
                  className={
                    category === "buyer"
                      ? "hidden"
                      : " px-8 py-5 cursor-pointer mt-[2rem] w-full outline-none border rounded-xl text-[1.2rem] focus:outline-none focus:border-indigo-300"
                  }
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="">--Select post type--</option>
                  <option value="shop">Shop</option>
                  <option value="reel">Reel</option>
                </select>

                {category === "shop" ? (
                  <div className="">
                    <select
                      value={productType}
                      name="productType"
                      className=" px-8 py-5 cursor-pointer mt-[2rem] w-full outline-none border rounded-xl text-[1.2rem] focus:outline-none focus:border-indigo-300"
                      onChange={(e) => {
                        setProductType(e.target.value);
                      }}
                    >
                      <option value="">--Select product type--</option>
                      <option value="collections">Collections</option>
                      <option value="foods">Foods</option>
                      <option value="utensils">Utensils</option>
                      <option value="skin care">Skin care</option>
                      <option value="services">Services</option>
                    </select>

                    <input
                      type="text"
                      name="product"
                      value={product}
                      onChange={(e) => {
                        setProduct(e.target.value);
                      }}
                      placeholder="Product name e.g sneaker"
                      className=" px-8 py-5 mt-[2rem] w-full outline-none border rounded-xl text-[1.2rem] focus:outline-none focus:border-indigo-300"
                    />

                    <input
                      type="text"
                      name="description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      placeholder="e.g., Amazing product that have served billions"
                      className=" px-8 py-5 mt-[2rem] w-full outline-none border rounded-xl text-[1.2rem] focus:outline-none focus:border-indigo-300"
                    />

                    <input
                      type="number"
                      name="cost"
                      value={cost}
                      onChange={(e) => {
                        setCost(e.target.value);
                      }}
                      placeholder="Price e.g $900"
                      className=" px-8 py-5 mt-[2rem] w-full outline-none border rounded-xl text-[1.2rem] focus:outline-none focus:border-indigo-300"
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    name="messaageContent"
                    value={messaageContent}
                    onChange={(e) => {
                      setMessaageContent(e.target.value);
                    }}
                    placeholder="What's on your mind"
                    className=" px-8 py-5 mt-[2rem] w-full outline-none border rounded-xl text-[1.2rem] focus:outline-none focus:border-indigo-300"
                  />
                )}
              </div>
            </div>

            {isLoading ? (
              <div className=" flex items-center justify-center bg-gradient-to-br from-[#6b08cd50] to-[#891ba554] text-center w-full shadow cursor-pointer text-white text-[1.2rem] leading-[2rem] rounded-[1rem] px-[2.4rem] md:px-[3.8rem] py-[1rem]">
                <div className="loader mr-5"></div> loading....
              </div>
            ) : (
              <button
                onClick={handleUpload}
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

export default Post;
