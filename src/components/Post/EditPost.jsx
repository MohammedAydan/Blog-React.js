import React, { useState } from "react";
import TextInput from "../TextInput";
import PrimaryButton from "../Buttons/PrimaryButton";
import axiosClient from "../../axios/axios";
import { useHomeContext } from "../../contexts/HomeContext";
import Loading from "../Loading";

function EditPost({ post, onClose }) {
    const { setPosts } = useHomeContext();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title: e.target.title.value,
            body: e.target.body.value,
        };

        setLoading(true);

        try {
            const res = await axiosClient.put(`/posts/${post.id}`, data);
            if (res.status == 200) {
                setPosts((prevPost) =>
                    prevPost.map((p) => {
                        if (p.post.id == post.id) {
                            p.post = res.data;
                            return p;
                        }
                        return p;
                    })
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            onClose();
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-70 flex items-center justify-center px-4">
            <div className="add-post-alert rounded-xl bg-slate-800 p-6 max-w-md shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <p>Edit post</p>
                    <button onClick={onClose}>X</button>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <TextInput
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name={"title"}
                        placeholder={"Enter title"}
                        className={"mb-2"}
                    />
                    <TextInput
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        name={"body"}
                        placeholder={"Enter body"}
                        className={"mb-2"}
                    />
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loading />
                        </div>
                    ) : (
                        <PrimaryButton className={"mt-3 w-full"}>Update</PrimaryButton>
                    )}
                </form>
            </div>
        </div>
    );
}

export default EditPost;
