import React from "react";

function Loading({ size = null }) {
  return (
    <div>
      <div
        className={`${
          size == "small" ? `w-7 h-7` : "w-10 h-10"
        } rounded-full border-8 border-blue-700 border-l-transparent animate-spin`}
      ></div>
    </div>
  );
}

export default Loading;
