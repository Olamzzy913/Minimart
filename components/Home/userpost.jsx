import React from "react";
import { useState } from "react";

const userpost = () => {
  const userUpdate = [
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
      postUrl:
        "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHN8ZW58MHx8MHx8fDA%3D",
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
      postUrl:
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
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
      postUrl:
        "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uc3RydWN0aW9ufGVufDB8fDB8fHww",
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
      postUrl:
        "https://images.unsplash.com/photo-1595161397851-cb282659df5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdhZGdldHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];
  const [inputValue, setInputValue] = useState();
  const [liked, setliked] = useState(false);

  return (
    <>
      {userUpdate.map((post, index) => (
        <div
          key={index}
          className="flex flex-col justify-center mx-[.8rem] md:mx-[9rem] mt-[1.5rem]"
        >
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-6 cursor-pointer">
              <img
                className="w-[3.2rem] h-[3.2rem] rounded-full"
                src={post.profileUrl}
              />
              <div className="flex flex-col">
                <h1 className="text-[1rem] font-semibold">{post.username}</h1>
                <p className="text-[.8rem] font-normal">{post.name}</p>
              </div>
              <h1 className="text-[1.1rem] font-medium">
                &#x2022; {post.uploadTime}
              </h1>
            </div>
            <i class="bx bxs-badge-check text-blue-700 text-[2rem]"></i>
          </div>
          <div className="flex flex-col justify-center mt-[1rem]">
            <img
              className="w-[32rem] h-[34.4rem] cursor-pointer"
              src={post.postUrl}
              onClick={() => {
                setliked(!liked);
                console.log(userUpdate[index].noLikes++);
              }}
            />
            <div className="flex flex-col justify-start">
              <div className="icon flex gap-2 my-3">
                <i
                  class={
                    liked
                      ? "bx bx-heart text-[2rem] font-medium cursor-pointer hover:text-[rgba(112,111,111,0.84)]"
                      : "bx bxs-heart text-[2rem] font-medium text-[#FF3040] cursor-pointer"
                  }
                  onClick={() => {
                    setliked(!liked);
                  }}
                ></i>
                <i class="bx bx-message-rounded-dots text-[2rem] font-medium cursor-pointer hover:text-[rgba(112,111,111,0.84)]"></i>
                <i class="bx bx-send text-[2rem] font-medium cursor-pointer  hover:text-[rgba(112,111,111,0.84)]"></i>
              </div>
              <div className="context">
                <p className="font-semibold">{post.noLikes} likes</p>
                <p className="font-semibold">{post.postDescription}</p>
                <p className="font-normal text-[#979797]">
                  View all {post.noComments} comments
                </p>
                <div className="flex border-b-[.03rem] w-full pb-2">
                  <input
                    placeholder="Add your comment..."
                    type="text"
                    className=" w-full  outline-none"
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {inputValue && (
                    <button className="text-purple-800 font-medium">
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
