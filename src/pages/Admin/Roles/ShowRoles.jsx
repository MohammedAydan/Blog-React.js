import React, { useState, useEffect } from "react";
import TextInput from "../../../components/TextInput";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import axiosClient from "../../../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import IFCondition from "../../../components/IFCondition";
import AdminLayout from "../../../layouts/AdminLayout";
import Loading from "../../../components/Loading";
import DangerButton from "../../../components/Buttons/DangerButton-1";

function ShowRoles() {
  const [loading, setLoading] = useState(false);
  const [loadingOne, setLoadingOne] = useState({
    id: null,
    loading: false,
  });
  const [premissions, setPremissions] = useState([]);
  // const [error, setError] = useState(null);

  const handleGetRoles = async (e) => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/premissions");
      if (res.status == 200) {
        setPremissions(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

  const handleDeleteRole = async (id) => {
    setLoadingOne({ id: id, loading: true });
    try {
      const res = await axiosClient.delete(`/premissions/${id}`);
      if (res.status == 200) {
        setPremissions((prev) => prev.filter((p) => p.id != id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOne({ id: null, loading: false });
    }
  };

  return (
    <AdminLayout>
      <div className="text-white">
        <div className="w-full max-w-xl mx-auto p-2">
          <IFCondition condition={loading}>
            <center className="p-2">
              <Loading />
            </center>
          </IFCondition>
          <IFCondition condition={!loading}>
            {premissions.map((premission) => {
              return (
                <div
                  key={premission.id}
                  className="w-full bg-slate-800 rounded p-4 flex items-center justify-between my-1"
                >
                  <p>{premission.name}</p>
                  <IFCondition
                    condition={
                      loadingOne.id == premission.id && loadingOne.loading
                    }
                  >
                    <Loading />
                  </IFCondition>
                  <IFCondition
                    condition={
                      !loadingOne.loading &&
                      premission.id != 1 &&
                      premission.id != 2
                    }
                  >
                    <DangerButton
                      onClick={() => handleDeleteRole(premission.id)}
                      className={"max-w-fit"}
                    >
                      Delete
                    </DangerButton>
                  </IFCondition>
                </div>
              );
            })}
          </IFCondition>
        </div>
        <div className="btn-add-premission fixed right-3 bottom-5">
          <Link to="/admin/roles/addRole" className="px-4 py-3 bg-slate-800 rounded-full shadow-lg">Add Role</Link>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ShowRoles;
