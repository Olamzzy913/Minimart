import React from "react";
import { db } from "@/utility/firebase";
import { useState, useEffect } from "react";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { reelFormatTimestamp } from "@/utility/date-time-format/format";
import { onAuthStateChangedListener } from "@/utility/firebase";

const userpost = () => {
  const [userUpdate, setUserUpdate] = useState([
    {
      id: "1",
      name: "Peter Joel",
      username: "Rt45g98",
      uploadTime: "4h",
      postDescription: "Taste of best designed food in the world",
      noLikes: 98,
      noComments: 36,
      profileUrl:
        "https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D",
      reel: "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "2",
      name: "Jackson Fred",
      username: "Kt98l54",
      uploadTime: "1d",
      postDescription: "Shoes can really be weird to wear",
      noLikes: 8,
      noComments: 96,
      profileUrl:
        "https://images.unsplash.com/photo-1600685890506-593fdf55949b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VhcnN8ZW58MHx8MHx8fDA%3D",
      reel: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "3",
      name: "Lawrel Sophie",
      username: "Cr67o97",
      uploadTime: "2d",
      postDescription: "Check out your constructions Tools",
      noLikes: 100,
      noComments: 6,
      profileUrl:
        "https://plus.unsplash.com/premium_photo-1666264877311-7d16380f91b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
      reel: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uc3RydWN0aW9ufGVufDB8fDB8fHww",
    },
    {
      id: "4",
      name: "Ivy Brown",
      username: "Mt93p89",
      uploadTime: "2w",
      postDescription:
        "Gadgets that brings out the best quality its really amazing",
      noLikes: 70,
      noComments: 4,
      profileUrl:
        "https://plus.unsplash.com/premium_photo-1684783848200-6d5f3eaf54ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2FkZ2V0fGVufDB8fDB8fHww",
      reel: "https://images.unsplash.com/photo-1595161397851-cb282659df5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdhZGdldHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ]);
  const [userData, setUserData] = useState([null]);
  const [likedPosts, setLikedPosts] = useState({});
  const [currentUserUid, selectCurrentUserUid] = useState("");
  const [inputCommentValue, setInputCommentValue] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        selectCurrentUserUid(user.uid);
        console.log(user);

        const fetchReelPost = async () => {
          try {
            const reelsQuerySnapshot = await getDocs(collection(db, "reels"));
            const combinedData = [];

            for (const reelDoc of reelsQuerySnapshot.docs) {
              const reel = reelDoc.data();
              console.log(reel);

              if (!reel.uid) {
                console.warn(`Reel with ID ${reelDoc.id} is missing userId`);
                continue; // Skip this reel if userId is missing
              }

              // Fetch the user document based on userId in the reel
              const userDoc = await getDoc(doc(db, "users", reel.uid));
              if (userDoc.exists()) {
                console.log(userDoc.exists(), userDoc.data());
                combinedData.push({
                  ...reel, // Reel data

                  ...userDoc.data(), // Merged user data
                });
              } else {
                console.warn(`No user found for userId ${reel.userId}`);
                combinedData.push({
                  id: reelDoc.id,
                  ...reel,
                  user: null, // If no user found
                });
              }
            }

            // Update state with combined data
            setUserUpdate(combinedData);
            console.log("Reel Data:", combinedData);

            // Fetch current user data
            const currentUserDoc = await getDoc(doc(db, "users", user.uid));
            if (currentUserDoc.exists()) {
              setUserData(currentUserDoc.data());
              // console.log("Current User Data: ", currentUserDoc.data());
            }
          } catch (err) {
            console.error("Error fetching documents:", err);
          }
        };

        fetchReelPost();
      } else {
        setUserData(null); // Clear user data on logout
      }
    });

    return unsubscribe; // Cleanup subscription
  }, [inputCommentValue, likedPosts]);

  const handleInputChange = (id, value) => {
    // Update the input value for the specific upload item
    setInputCommentValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const addCommentToReel = async (reelId, comment) => {
    const commentObject = {
      commentUser: currentUserUid,
      comment,
      timestamp: new Date(),
    };
    console.log(commentObject);
    try {
      const reelRef = doc(db, "reels", reelId); // Reference to the specific reel document
      await updateDoc(reelRef, {
        comments: arrayUnion(commentObject), // Push new comment to the comments array
      });
      setInputCommentValue({});
      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleLike = async (postUid) => {
    const postRef = doc(db, "reels", postUid); // Get the reference of the specific post

    const isLiked = likedPosts[postUid]; // Check if the post is already liked by the user

    if (isLiked) {
      // If already liked, remove the current user UID from the likes array
      await updateDoc(postRef, {
        likes: arrayRemove(currentUserUid),
      });
    } else {
      // If not liked, add the current user UID to the likes array
      await updateDoc(postRef, {
        likes: arrayUnion(currentUserUid),
      });
    }

    // Toggle the liked state for the specific post
    setLikedPosts((prevState) => ({
      ...prevState,
      [postUid]: !isLiked,
    }));
  };

  // Initialize liked state when component mounts or userUpdate changes
  useEffect(() => {
    const initialLikes = {};
    userUpdate.forEach((post) => {
      initialLikes[post.uid] = post.likes?.includes(currentUserUid);
    });
    setLikedPosts(initialLikes);
  }, [userUpdate, currentUserUid]);

  return (
    <>
      {userUpdate.map((post, index) => (
        <div
          key={index}
          className="flex flex-col justify-center mx-[.8rem] md:mx-[9rem] mt-[1.5rem]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 cursor-pointer">
              <img
                className="w-[3.2rem] h-[3.2rem] rounded-full"
                src={post.imageUrl1}
              />
              <div className="flex flex-col">
                <h1 className="text-[1rem] font-semibold">{post.username}</h1>
                <p className="text-[.8rem] font-normal">
                  {post.floating_first_name} {post.floating_last_name}
                </p>
              </div>
              <h1 className="text-[1.1rem] font-medium">
                &#x2022; {reelFormatTimestamp(post.timestamp)}
              </h1>
            </div>
            <i
              className={
                post.category === "buyer"
                  ? "bx bxs-badge-check text-blue-700 text-[2rem]"
                  : "bx bxs-badge-check text-green-600 text-[2rem]"
              }
            ></i>
          </div>

          <div className="flex flex-col justify-center mt-[1rem]">
            <img
              onClick={() => handleLike(post.uid)}
              className="w-[32rem] h-[34.4rem] cursor-pointer"
              src={post.reel}
            />
            <div className="flex flex-col justify-start">
              <div className="icon flex gap-2 my-3">
                <i
                  className={`bx text-[2rem] font-medium cursor-pointer ${
                    likedPosts[post.uid]
                      ? "bx bxs-heart text-[#FF3040]"
                      : "bx bx-heart  hover:text-[rgba(112,111,111,0.84)]"
                  }`}
                  onClick={() => handleLike(post.uid)}
                ></i>
                <i className="bx bx-message-rounded-dots text-[2rem] font-medium cursor-pointer hover:text-[rgba(112,111,111,0.84)]"></i>
                <i className="bx bx-send text-[2rem] font-medium cursor-pointer hover:text-[rgba(112,111,111,0.84)]"></i>
              </div>

              <div className="context">
                <p className="font-semibold">
                  {post.likes?.length > 0 ? post.likes.length : "0"} likes
                </p>
                <p className="font-semibold">{post.messageContent}</p>
                <p className="font-normal text-[#979797]">
                  View all{" "}
                  {post.comments?.length > 0
                    ? new Set(
                        post.comments.map((comment) => comment.commentUser)
                      ).size
                    : "0"}{" "}
                  {/* {post.comments?.length > 0 ? post.comments.length : "0"} */}
                  comments
                </p>

                <div className="flex border-b-[.03rem] w-full pb-2">
                  <input
                    placeholder="Add your comment..."
                    type="text"
                    className="w-full outline-none"
                    value={inputCommentValue[post?.uid] || ""}
                    onChange={(e) =>
                      handleInputChange(post?.uid, e.target.value)
                    }
                  />
                  {inputCommentValue[post?.uid] && (
                    <button
                      onClick={() =>
                        addCommentToReel(
                          post?.uid,
                          inputCommentValue[post?.uid]
                        )
                      }
                      className="text-purple-800 font-medium"
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default userpost;
