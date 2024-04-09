import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import TextInput from "../components/TextInput";
import { useAuth } from "../contexts/AuthContext";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import DangerButton from "../components/Buttons/DangerButton-1";
import DeleteAccount from "../components/Settings/DeleteAccount";
import CreateNewPassword from "../components/Settings/CreateNewPassword";
import UpdateProfile from "../components/Settings/UpdateProfile";
import AccountConfiration from "../components/Settings/AccountConfiration";

function SettingsScreen() {
  const { user } = useAuth();

  return (
    <AuthLayout>
      <div className="py-6 text-white">
        <div className="bg-slate-800 rounded shadow-xl p-6 max-w-xl mx-auto mt-2">
          <AccountConfiration />
        </div>
        <div className="bg-slate-800 rounded shadow-xl p-6 max-w-xl mx-auto mt-2">
          <UpdateProfile />
        </div>
        <div className="bg-slate-800 rounded shadow-xl p-6 max-w-xl mx-auto mt-2">
          <CreateNewPassword />
        </div>
        <div className="bg-slate-800 rounded shadow-xl p-6 max-w-xl mx-auto mt-2">
          <DeleteAccount />
        </div>
      </div>
    </AuthLayout>
  );
}

export default SettingsScreen;
