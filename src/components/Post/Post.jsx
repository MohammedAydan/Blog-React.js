import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axiosClient from "../../axios/axios";
import { useHomeContext } from "../../contexts/HomeContext";
import FooterPost from "./FooterPost";
import MediaPost from "./MediaPost";
import HeaderPost from "./HeaderPost";

function Post({
    user,
    post,
    isLike,
    likesCount,
    commentsCount,
    sharingsCount,
    borderFull = false,
}) {
    const { user: authUser } = useAuth();
    const { setPosts } = useHomeContext();
    const [like, setLike] = useState(isLike ?? false);
    const [likes, setLikesCount] = useState(likesCount);
    const [sharings, setSharings] = useState(sharingsCount);

    const handleAddOrRemoveLike = async () => {
        if (like) {
            try {
                setLike(false);
                const res = await axiosClient.delete(`/likes/${post.id}`);
                setLikesCount((p) => p - 1);
                setPosts((prevPost) =>
                    prevPost.map((p) => {
                        if (p.post.id == post.id) {
                            p.likesCount = p.likesCount - 1;
                            p.isLike = false;
                            return p;
                        }
                        return p;
                    })
                );
            } catch (error) {
                console.log(error);
            }
        } else {
            const data = {
                post_id: post.id,
            };
            try {
                setLike(true);
                const res = await axiosClient.post("/likes", data);
                setLikesCount((p) => p + 1);
                setPosts((prevPost) =>
                    prevPost.map((p) => {
                        if (p.post.id == post.id) {
                            p.likesCount = p.likesCount + 1;
                            p.isLike = true;
                            return p;
                        }
                        return p;
                    })
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (!authUser) return null;

    return (
        <div
            key={post.id}
            className={`max-w-xl  p-4 bg-slate-900  m-4 mx-auto ${borderFull ?"border border-slate-800 rounded-2xl shadow-2xl":"border-b border-b-slate-800"}`}
        >
            <HeaderPost post={post} user={user} authUser={authUser} />

            <div className="body">
                <p className="text-white font-medium text-lg">{post.title}</p>
                <p className="text-white mt-2">{post.body}</p>
                <MediaPost post={post} />
            </div>

            <FooterPost
                handleAddOrRemoveLike={handleAddOrRemoveLike}
                like={like}
                likes={likes}
                postId={post.id}
                commentsCount={commentsCount}
                sharingsCount={sharings}
            />
        </div>
    );
}

export default Post;
