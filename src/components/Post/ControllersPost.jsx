import React, { useState } from "react";
import axiosClient from "../../axios/axios";
import PrimaryButton from "../Buttons/PrimaryButton";
import EditPost from "./EditPost";
import DangerButton from "../Buttons/DangerButton";
import { useHomeContext } from "../../contexts/HomeContext";
import { useNavigate, useNavigation } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import IFCondition from "../IFCondition";

function ControllersPost({ post, user, authUser }) {
    const { setPosts } = useHomeContext();
    const [showEditAlert, setShowEditAlert] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    const handleDestroy = async () => {
        try {
            const res = await axiosClient.delete(`/posts/${post.id}`);
            if (res.status == 200) {
                setPosts((prevPosts) =>
                    prevPosts.filter((p) => p.post.id !== post.id)
                );

                if (location.pathname.startsWith("/posts/")) {
                    navigate("/");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {post.created_at !== post.updated_at && (
                <p className="text-gray-400">Updated</p>
            )}
            <div className="flex items-center justify-center">
                <IFCondition condition={authUser.id == user.id}>
                    <div className="relative">
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className="w-10 h-10 rounded-full hover:bg-slate-800 flex items-center justify-center z-0"
                        >
                            <CiMenuKebab />
                        </button>
                        <IFCondition condition={openMenu}>
                            <div
                                className={`absolute bg-slate-800 p-2 rounded-xl right-0 flex flex-col items-center justify-center c-z-1`}
                            >
                                <DangerButton
                                    className={"mx-1 w-11/12"}
                                    onClick={handleDestroy}
                                >
                                    Delete
                                </DangerButton>
                                {showEditAlert && (
                                    <EditPost
                                        post={post}
                                        onClose={() => setShowEditAlert(false)}
                                    />
                                )}
                                <PrimaryButton
                                    className={"mx-1 w-11/12"}
                                    onClick={() => {
                                        setShowEditAlert(!showEditAlert);
                                    }}
                                >
                                    Edit
                                </PrimaryButton>
                            </div>
                        </IFCondition>
                    </div>
                </IFCondition>
            </div>
        </div>
    );
}

export default ControllersPost;
