import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import axiosClient from "../axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Loading from "../components/Loading";
import ManageRequestsUserProfile from "../components/ManageRequestsUserProfile";

function UserProfileScreen() {
    const { id } = useParams();
    const { loading, user: authUser } = useAuth();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false);
    const [request, setRequest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);
            if (authUser.id == id) {
                navigate("/profile");
            }
            try {
                const resUser = await axiosClient.get(`/user/${id}`);
                if (resUser.status == 200) {
                    setUser(resUser.data);
                    return;
                }
                return <NotFound />;
            } catch (error) {
                console.log(error);
                return <NotFound />;
            } finally {
                setIsLoading(false);
            }
        };

        if (!loading && authUser) {
            getUser().then(() => checkRequest());
        }
    }, [id, loading]);

    const checkRequest = async () => {
        setRequestLoading(true);
        try {
            const resUser = await axiosClient.get(`/friends/${id}`);
            if (resUser.status == 200) {
                if (resUser.data.request == null) {
                    setRequest(null);
                } else {
                    setRequest(resUser.data);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRequestLoading(false);
        }
    };

    return (
        <AuthLayout>
            {isLoading ? (
                <center className="mt-4">
                    <Loading />
                </center>
            ) : (
                <div className="w-full h-screen p-6 bg-slate-900 shadow-md mx-auto">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-4 max-w-2xl mx-auto">
                            <img
                                loading="lazy"
                                className="w-52 h-52 rounded-full object-cover border-2 border-white dark:border-gray-600"
                                src={
                                    user?.img_url ?? "http://picsum.photos/400"
                                }
                                alt={`${user?.username}'s avatar`}
                            />
                            <div>
                                <div className="text-lg text-gray-300 dark:text-gray-300">
                                    <p>Friends: hidden</p>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-200 dark:text-white">
                                    {user?.name}
                                </h1>
                                <p className="text-gray-400 dark:text-gray-300">
                                    @{user?.username}
                                </p>
                            </div>
                        </div>

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

                        <ManageRequestsUserProfile
                            authUser={authUser}
                            requestLoading={requestLoading}
                            request={request}
                            setRequestLoading={setRequestLoading}
                            setRequest={setRequest}
                        />
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}

export default UserProfileScreen;
