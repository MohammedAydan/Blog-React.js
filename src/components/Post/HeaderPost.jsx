import React from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import ControllersPost from "./ControllersPost";
import { MediaAccountsPath } from "../../MyMethods/MyMethods";

function HeaderPost({ post, authUser }) {
  return (
    <div className="header flex items-center justify-between mb-2">
      <Link to={`/profile/${post.user.id}`}>
        <div className="user flex items-center justify-start">
          <div className="mr-2 rounded-full border-2 object-contain relative c-z-1">
            <img
              loading="lazy"
              src={
                post.user.img_url ? MediaAccountsPath + post.user.img_url : ""
              }
              alt=""
              className="w-12 h-12 rounded-full"
            />
            {post.user.account_confirmation == true && (
              <div className="absolute -top-1 -left-1 text-blue-600 bg-white rounded-full">
                <MdVerified size={22} />
              </div>
            )}
          </div>
          <p>{post.user.name}</p>
        </div>
      </Link>
      <ControllersPost post={post} user={post.user} authUser={authUser} />
    </div>
  );
}

export default HeaderPost;
