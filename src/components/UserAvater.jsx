import React from "react";
import { MediaAccountsPath } from "../MyMethods/MyMethods";
import { MdVerified } from "react-icons/md";

function UserAvater({ imgUrl, user, avaterSize = "small", setOpenImg }) {
  return (
    <div
      onClick={setOpenImg && (() => setOpenImg(imgUrl))}
      className={`max-w-fit mr-2 rounded-full border-2 object-contain relative cursor-pointer`}
    >
      <img
        loading="lazy"
        src={imgUrl ? MediaAccountsPath + imgUrl : ""}
        alt=""
        className={`${
          avaterSize == "small" ? "w-12 h-12" : " w-52 h-52"
        } rounded-full object-cover`}
      />
      {user?.account_confirmation == true && (
        <div
          title="Account confirmation"
          className={`absolute ${
            avaterSize == "small" ? "-top-0 -left-1" : "top-9 -left-1"
          } text-blue-600 bg-white rounded-full`}
        >
          <MdVerified size={avaterSize == "small" ? 18 : 35} />
        </div>
      )}
    </div>
  );
}

export default UserAvater;
