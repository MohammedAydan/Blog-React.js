import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { useHomeContext } from "./HomeContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { fetchPosts } = useHomeContext();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const res = await axiosClient.get("/user");
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (data) => {
        setLoading(true);
        try {
            const res = await axiosClient.post("/register", data);
            if (res.data.access_token) {
                setToken(res.data.access_token);
                localStorage.setItem("ACCESS_TOKEN", res.data.access_token);
                setUser(res.data.user);
                setIsAuthenticated(true);
                fetchPosts();
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (data) => {
        setLoading(true);
        try {
            const res = await axiosClient.post("/login", data);
            if (res.data.access_token) {
                setToken(res.data.access_token);
                localStorage.setItem("ACCESS_TOKEN", res.data.access_token);
                setUser(res.data.user);
                setIsAuthenticated(true);
                fetchPosts();
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem("ACCESS_TOKEN");
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
            navigate("/login");
            await axiosClient.post("/logout");
        } catch (error) {
            console.log(error);
        } finally {
            navigate("/login");
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("ACCESS_TOKEN");
        if (storedToken) {
            setToken(storedToken);
            getUser();
        } else {
            setLoading(false);
        }
    }, []); // Run only once on component mount

    const values = {
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        handleRegister,
        handleLogin,
        handleLogout,
        getUser,
    };

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
