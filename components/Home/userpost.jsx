import React, { useState, useEffect } from "react";
import { db } from "@/utility/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  arrayUnion,
  arrayRemove,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { reelFormatTimestamp } from "@/utility/date-time-format/format";
import { onAuthStateChangedListener } from "@/utility/firebase";

const UserPost = () => {
  const [userUpdate, setUserUpdate] = useState([]);
  const [userData, setUserData] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [currentUserUid, selectCurrentUserUid] = useState("");
  const [inputCommentValue, setInputCommentValue] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        selectCurrentUserUid(user.uid);

        fetchReelPost();
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  const fetchReelPost = async () => {
    try {
      const userQuery = query(collection(db, "users"));
      const userSnapshot = await getDocs(userQuery);

      for (const userDoc of userSnapshot.docs) {
        const reelsQuery = query(
          collection(db, "reels", userDoc.id, "post"),
          orderBy("timestamp", "asc")
        );

        onSnapshot(reelsQuery, (reelsSnapshot) => {
          reelsSnapshot.forEach((reelDoc) => {
            setUserUpdate((prevProfile) => [
              // ...prevProfile,

              { ...reelDoc.data(), ...userDoc.data() }, // Combine reel + user data if needed
            ]);
          });

          console.log(userUpdate);
        });
      }

      const currentUserDoc = await getDoc(doc(db, "users", currentUserUid));
      if (currentUserDoc.exists()) {
        setUserData(currentUserDoc.data());
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  const handleInputChange = (id, value) => {
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

    try {
      // Querying the specific post under reels/{reelId}/post
      const reelsQuery = query(
        collection(db, "reels", reelId, "post"),
        orderBy("timestamp", "asc") // Assuming posts have a 'timestamp' field for sorting
      );

      const querySnapshot = await getDocs(reelsQuery);
      let selectedReelRef = null;

      querySnapshot.forEach((document) => {
        selectedReelRef = doc(db, "reels", reelId, "post", document.id); // Correct document reference
        console.log(document.id, " => ", document.data());
      });

      if (!selectedReelRef) {
        console.error("No selected reel found");
        return;
      }

      // Update the comments array with the new comment
      await updateDoc(selectedReelRef, {
        comments: arrayUnion(commentObject),
      });

      setInputCommentValue({}); // Reset the comment input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async (postUid) => {
    try {
      // Fetch the specific post under reels/{postUid}/post
      const reelsQuery = query(
        collection(db, "reels", postUid, "post"),
        orderBy("timestamp", "asc") // Assuming multiple posts with timestamps
      );

      const querySnapshot = await getDocs(reelsQuery);
      let selectedReelRef = null;

      querySnapshot.forEach((document) => {
        selectedReelRef = doc(db, "reels", postUid, "post", document.id); // Correct document reference
        // console.log(document.id, " => ", document.data());
      });

      if (!selectedReelRef) {
        console.error("No selected reel found");
        return;
      }

      const isLiked = likedPosts[postUid];

      if (isLiked) {
        await updateDoc(selectedReelRef, {
          likes: arrayRemove(currentUserUid),
        });
      } else {
        await updateDoc(selectedReelRef, {
          likes: arrayUnion(currentUserUid),
        });
      }

      // Toggle like state in UI
      setLikedPosts((prevState) => ({
        ...prevState,
        [postUid]: !isLiked,
      }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

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

export default UserPost;
