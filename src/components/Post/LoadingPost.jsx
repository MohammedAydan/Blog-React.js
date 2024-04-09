import React from "react";
import { FaComment, FaHeart, FaShare } from "react-icons/fa";

function LoadingPost() {
    return (
        <div className="max-w-xl  p-4 bg-slate-900  m-4 mx-auto border-b border-b-slate-800 animate-pulse">
            <div className="header flex items-center justify-between mb-2">
                <div className="user flex items-center justify-start">
                    <div className="w-12 h-12 rounded-full mr-2 bg-black bg-opacity-50 animate-pulse"></div>
                    <p className="text-white font-medium text-lg w-28 h-3 rounded-lg bg-black bg-opacity-50 animate-pulse"></p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center"></div>
                </div>
            </div>
            <div className="body">
                <p className="text-white font-medium text-lg w-28 h-3 rounded-lg bg-black bg-opacity-50 animate-pulse"></p>
                <p className="text-white mt-2 w-52 h-3 rounded-lg bg-black bg-opacity-50 animate-pulse"></p>
            </div>
            <div className="footer flex items-center justify-around mt-2">
                <button className="w-full m-1 bg-black bg-opacity-50 animate-pulse text-slate-800 p-2 flex items-center justify-center rounded-lg">
                    <FaHeart />
                </button>
                <button className="w-full m-1 bg-black bg-opacity-50 animate-pulse text-slate-800 p-2 flex items-center justify-center rounded-lg">
                    <FaComment />
                </button>
                <button className="w-full m-1 bg-black bg-opacity-50 animate-pulse text-slate-800 p-2 flex items-center justify-center rounded-lg">
                    <FaShare />
                </button>
            </div>
        </div>
    );
}

export default LoadingPost;
