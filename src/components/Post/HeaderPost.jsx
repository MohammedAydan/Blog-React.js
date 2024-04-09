import React from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import ControllersPost from "./ControllersPost";

function HeaderPost({ post, user, authUser }) {
    return (
        <div className="header flex items-center justify-between mb-2">
            <Link to={`/profile/${user.id}`}>
                <div className="user flex items-center justify-start">
                    <div className="mr-2 rounded-full border-2 object-contain relative">
                        <img
                            loading="lazy"
                            src={user?.img_url ?? "https://picsum.photos/200"}
                            alt=""
                            className="w-12 h-12 rounded-full"
                        />
                        {user.id == 2 && (
                            <div className="absolute -top-1 -left-1 text-blue-600 bg-white rounded-full">
                                <MdVerified size={22} />
                            </div>
                        )}
                    </div>
                    <p>{user.name}</p>
                </div>
            </Link>
            <ControllersPost post={post} user={user} authUser={authUser} />
        </div>
    );
}

export default HeaderPost;
