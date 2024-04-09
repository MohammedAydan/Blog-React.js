import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";

function Login() {
    const { user, handleLogin, loading } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({
            email: e.target.email.value,
            password: e.target.password.value,
        });
    };


    return (
        <GuestLayout>
            <div className="flex w-full h-screen items-center justify-center bg-slate-900">
                <div className="w-96 p-4">
                    <form onSubmit={handleSubmit}>
                        <p className="pb-4 font-bold text-2xl text-white text-center">
                            Login
                        </p>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter email"
                            className="w-full p-3 border rounded-lg mb-1"
                        />
                        <input
                            type="text"
                            name="password"
                            placeholder="Enter password"
                            className="w-full p-3 border rounded-lg mb-1"
                        />
                        {!loading ? (
                            <button className="w-full p-3 border rounded-lg mt-5 text-white ">
                                Login
                            </button>
                        ) : (
                            <div className="flex items-center justify-center mt-6">
                                <Loading />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

export default Login;
