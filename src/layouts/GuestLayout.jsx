import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Splash from "../components/Splash";

function GuestLayout({ children }) {
    const { loading, user, token, isAuthenticated } = useAuth();

    if (loading === true) {
        return <Splash />;
    }

    if (!loading && user != null && token != null && isAuthenticated === true) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="body">{children}</div>
        </div>
    );
}

export default GuestLayout;
