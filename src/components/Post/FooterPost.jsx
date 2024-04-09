import React, { useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import SharingPost from "./SharingPost";

function FooterPost({
    handleAddOrRemoveLike,
    like,
    likes,
    postId,
    commentsCount,
    sharingsCount = 0,
}) {
    const [sharingPost, setSharingPost] = useState(false);

    return (
        <div className="footer flex items-center justify-around mt-2">
            <button
                onClick={handleAddOrRemoveLike}
                className="w-full hover:bg-slate-600 p-2 flex items-center justify-center rounded-lg"
            >
                <FaHeart color={like ? "red" : "white"} />
                <p className="ml-1">{likes}</p>
            </button>
            <Link
                to={`/posts/${postId}`}
                className="w-full hover:bg-slate-600 p-2 flex items-center justify-center rounded-lg"
            >
                <FaComment />
                <p className="ml-1">{commentsCount}</p>
            </Link>
            <button
                onClick={() => setSharingPost(true)}
                className="w-full hover:bg-slate-600 p-2 flex items-center justify-center rounded-lg"
            >
                <FaShare />
                <p className="ml-1">{sharingsCount}</p>
            </button>
            {sharingPost && <SharingPost postId={postId} onClose={() => setSharingPost(false)} />}
        </div>
    );
}

export default FooterPost;
