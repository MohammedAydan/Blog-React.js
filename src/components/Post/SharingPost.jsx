import React, { useState } from "react";
import TextInput from "../TextInput";
import PrimaryButton from "../Buttons/PrimaryButton";
import axiosClient from "../../axios/axios";
import { useHomeContext } from "../../contexts/HomeContext";
import Loading from "../Loading";

function SharingPost({ onClose, postId }) {
    const { setPosts } = useHomeContext();
    const [loading, setLoading] = useState(false);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title: e.target.title.value,
            body: e.target.body.value,
            sharing_post_id: postId,
        };

        setLoading(true);

        try {
            const res = await axiosClient.post("/posts", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.status == 200) {
                setPosts((p) => [...p, res.data]);
            }
        } catch (error) {
            console.log(error);
        } finally {
            onClose();
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-70 flex items-center justify-center text-white px-4">
            <div className="add-post-alert rounded-xl bg-slate-800 p-6 max-w-md shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <p>Sharing post</p>
                    <button onClick={onClose}>X</button>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <TextInput
                        name={"title"}
                        placeholder={"Enter title"}
                        className={"mb-2"}
                    />
                    <TextInput
                        name={"body"}
                        placeholder={"Enter body"}
                        className={"mb-2"}
                    />

                    <p className="w-full py-2 px-3 text-center border rounded-lg border-slate-400">
                        Post:{postId} Selected
                    </p>

                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loading />
                        </div>
                    ) : (
                        <PrimaryButton className={"mt-3 w-full"}>
                            Sharing post
                        </PrimaryButton>
                    )}
                </form>
            </div>
        </div>
    );
}

export default SharingPost;
