import React, { useState } from "react";
import TextInput from "../../../components/TextInput";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import axiosClient from "../../../axios/axios";
import { useNavigate } from "react-router-dom";
import IFCondition from "../../../components/IFCondition";
import AdminLayout from "../../../layouts/AdminLayout";

function AddRole() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddRole = async (e) => {
    e.preventDefault();
    setError(null);
    const data = {
      name: e.target.name.value,
    };

    if (data.name == null || data.name == "") {
      setError("Name is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosClient.post("/premissions/", data);
      if (res.status == 200) {
        navigate("/admin/roles");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="text-white">
        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-full max-w-md p-4 rounded-xl bg-slate-800">
            <form onSubmit={handleAddRole}>
              <p className="mb-3 font-bold">Add new role</p>
              <IFCondition condition={error}>
                <p className="text-red-500">{error}</p>
              </IFCondition>
              <TextInput placeholder={"Enter name role"} name={"name"} />
              <PrimaryButton type={"submits"} className={"w-full mt-3"}>
                Add role
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddRole;
