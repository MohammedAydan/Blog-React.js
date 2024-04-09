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
  const [errors, setErrors] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axiosClient.get("/user");
      if (res.status == 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data) => {
    if (data.name == null || data.name == "") {
      setErrors("The name field is required");
      return;
    }
    if (data.username == null || data.username == "") {
      setErrors("The username field is required");
      return;
    }
    if (data.email == null || data.email == "") {
      setErrors("The email field is required");
      return;
    }
    if (data.phone == null || data.phone == "") {
      setErrors("The phone field is required");
      return;
    }
    if (data.age == null || data.age == "") {
      setErrors("The age field is required");
      return;
    }
    if (data.img_url == null || data.img_url == "") {
      setErrors("The image field is required");
      return;
    }
    if (data.password == null || data.password == "") {
      setErrors("The password field is required");
      return;
    }

    if (data.password.length < 8) {
      setErrors("Password must be at least 8 characters long");
      return;
    }

    const passwordRegex = /^(?=.*[0-9]{6,})(?=.*[a-zA-Z]{2,})/;

    if (!passwordRegex.test(data.password)) {
      setErrors("Password must have at least 8 numbers and 2 letters.");
      return;
    }

    if (data.confirm_password == null || data.confirm_password == "") {
      setErrors("The comfirm password field is required");
      return;
    }

    if (data.confirm_password !== data.password) {
      setErrors("Confirm password and password do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosClient.post("/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      setErrors(error.response.data.message.split(".")[0]);
      navigate("/register", {
        replace: true,
        state: {
          message: error.response.data.message.split(".")[0],
        },
      });
    } finally {
      setLoading(false);
      setErrors(null);
    }
  };

  const handleLogin = async (data) => {
    if (data.email == null || data.email == "") {
      setErrors("The email field is required");
      return;
    }

    if (data.password == null || data.password == "") {
      setErrors("The password field is required");
      return;
    }

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
      setErrors(error.response.data.message.split(".")[0]);
      navigate("/login", {
        replace: true,
        state: {
          message: error.response.data.message.split(".")[0],
        },
      });
    } finally {
      setLoading(false);
      setErrors(null);
    }
  };

  const handleLogout = async ({ defaultNavigate = true }) => {
    try {
      localStorage.removeItem("ACCESS_TOKEN");
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      if (defaultNavigate) {
        navigate("/login");
      }
      await axiosClient.post("/logout");
    } catch (error) {
      console.log(error);
    } finally {
      if (defaultNavigate) {
        navigate("/login");
      }
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
    errors,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
