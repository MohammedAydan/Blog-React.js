import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import axiosClient from "../axios/axios";
import Loading from "../components/Loading";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";

function ProfileScreen() {
    const { loading, user } = useAuth();
    const [resFriends, setResFriends] = useState(null);
    const [loadingReq, setLoadingReq] = useState(false);
    const [showFriends, setShowFriends] = useState(false);

    const handleGetFrends = async () => {
        setLoadingReq(true);
        try {
            const res = await axiosClient.get("/friends");
            if (res.status == 200) {
                setResFriends(Object.values(res.data));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingReq(false);
        }
    };

    useEffect(() => {
        handleGetFrends();
    }, []);

    return (
        <AuthLayout>
            <div className="w-full h-screen p-6 bg-slate-900 shadow-md mx-auto">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-center space-x-4 max-w-2xl mx-auto">
                        <img
                            loading="lazy"
                            className="w-52 h-52 rounded-full object-cover border-2 border-white dark:border-gray-600"
                            src={user?.img_url ?? "http://picsum.photos/400"}
                            alt={`${user?.username}'s avatar`}
                        />
                        <div>
                            <div className="text-lg text-gray-300 dark:text-gray-300">
                                <p
                                    className="cursor-pointer"
                                    onClick={() => setShowFriends(true)}
                                >
                                    Friends:{" "}
                                    {resFriends == null
                                        ? ""
                                        : resFriends.length}
                                </p>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-200 dark:text-white">
                                {user?.name}
                            </h1>
                            <p className="text-gray-400 dark:text-gray-300">
                                @{user?.username}
                            </p>
                        </div>
                    </div>
                    {showFriends && (
                        <Popup
                            title={
                                <div className="w-full flex items-center justify-between">
                                    <p>FRIENDS</p>
                                    <button
                                        onClick={() => setShowFriends(false)}
                                        className="w-10 h-10 "
                                    >
                                        X
                                    </button>
                                </div>
                            }
                        >
                            {loadingReq && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Loading />
                                </div>
                            )}
                            {!loadingReq &&
                                resFriends != null &&
                                Object.values(resFriends).map((f) => {
                                    let userData =
                                        f.owner_id == user.id
                                            ? f.user
                                            : f.owner;

                                    return (
                                        <Link
                                            key={f.id}
                                            to={`/profile/${userData.id}`}
                                        >
                                            <div className="flex items-center p-2">
                                                <img
                                                    src={userData.img_url}
                                                    alt=""
                                                    className="w-12 h-12 rounded-full mr-2"
                                                />
                                                <p>{userData.name}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </Popup>
                    )}

                    <div className="w-max mx-auto justify-center">
                        {/* <div className="mt-6">
                            <h2 className="text-xl font-bold mb-2 text-gray-200 dark:text-white">
                                Contact
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                {user.email}
                            </p>
                        </div> */}
                    </div>

                    <div className="flex items-center justify-center mt-7 border-t-2 border-t-slate-800 p-4"></div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default ProfileScreen;
