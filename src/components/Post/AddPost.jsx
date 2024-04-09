import React, { useState } from "react";
import TextInput from "../TextInput";
import PrimaryButton from "../Buttons/PrimaryButton";
import axiosClient from "../../axios/axios";
import { useHomeContext } from "../../contexts/HomeContext";
import Loading from "../Loading";

function AddPost({ onClose }) {
    const { setPosts } = useHomeContext();
    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState(null);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // const fd = new FormData();
        // fd.append("img_url", media);
        // console.log(fd.get("img_url"));

        const data = {
            title: e.target.title.value,
            body: e.target.body.value,
            media_type: media != null && media.type,
            media_url: media,
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
                    <p>Add post</p>
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

                    <div className="flex items-center">
                        <label
                            htmlFor="fileInput"
                            className="cursor-pointer m-1 bg-blue-900 text-white rounded-lg px-6 py-2 shadow-lg border border-blue-500 w-full block text-center"
                        >
                            Select File
                        </label>
                        {media != null && (
                            <button
                                type="button"
                                onClick={() => setMedia(null)}
                                className="float-end text-red-500 w-10 h-10 hover:bg-red-500 hover:text-white rounded-lg"
                            >
                                X
                            </button>
                        )}
                    </div>
                    <TextInput
                        id={"fileInput"}
                        type="file"
                        name={"media_url"}
                        placeholder={"Enter media url"}
                        className={"mb-2 sr-only"}
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            setMedia(e.target.files[0]);
                        }}
                    />
                    {media != null && <p>File name: {media.name}</p>}

                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loading />
                        </div>
                    ) : (
                        <PrimaryButton className={"mt-3 w-full"}>
                            Add
                        </PrimaryButton>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AddPost;
