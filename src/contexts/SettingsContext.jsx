import { createContext, useContext, useState } from "react";
import axiosClient from "../axios/axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const { setUser, handleLogout } = useAuth();
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);
  const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false);
  const [loadingDeleteAccount, setLoadingDeleteAccount] = useState(false);
  const [errors, setErrors] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState({
    name: null,
    message: null,
  });

  const navigate = useNavigate();

  const handleUpdateProfile = async (data) => {
    setLoadingUpdateProfile(true);
    try {
      const res = await axiosClient.put("/user", data);
      if (res.status == 200) {
        setUser(res.data);
        setMessageSuccess({
          name: "update",
          message: "Profile updated successfully",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpdateProfile(false);
    }
  };

  const handleUpdatePassword = async (data) => {
    if (data.new_password != data.confirm_password) {
      setErrors("password and confirm password does not match");
      return;
    }

    setLoadingUpdatePassword(true);

    try {
      const res = await axiosClient.put("/user/password",data);
      if (res.status == 200) {
        if (res.data.status) {
          setUser(res.data);
          setMessageSuccess({
            name: "newPassword",
            message: "Password updated successfully",
          });
          setErrors(null);
        } else {
          setErrors(res.data.error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpdatePassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoadingDeleteAccount(true);
    try {
      const res = await axiosClient.delete("/user");
      if (res.status == 200) {
        handleLogout({ defaultNavigate: false });
        navigate("/login", {
          replace: true,
          state: { message: "Your account has been deleted" },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDeleteAccount(false);
    }
  };

  const values = {
    loadingUpdateProfile,
    loadingUpdatePassword,
    loadingDeleteAccount,
    handleUpdateProfile,
    handleUpdatePassword,
    handleDeleteAccount,
    errors,
    setErrors,
    messageSuccess,
    setMessageSuccess,
  };
  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
