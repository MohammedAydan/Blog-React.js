import React, { useState, useEffect } from "react";
import axiosClient from "../axios/axios";
import Loading from "./Loading";
import PrimaryButton from "./Buttons/PrimaryButton";
import IFCondition from "./IFCondition";

function AddPost({ onClose, setUsers, userId }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [premissions, setPremissions] = useState([]);

  useEffect(() => {
    const getPremissions = async () => {
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
    getPremissions();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      premission_id: e.target.premission_id.value,
      user_id: userId,
    };
    console.log(data)

    if (
      data.premission_id == null ||
      data.premission_id == "" ||
      data.user_id == null ||
      data.user_id == ""
    ) {
      setErrors("Role is required");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosClient.post(`user/premissions`, data);
      if (res.status == 200) {
        setUsers((prev) =>
          prev.map((u) => {
            if (u.id === userId) {
              return { ...u, premissions: res.data };
            }
            return u;
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-70 flex items-center justify-center text-white px-4">
      <div className="w-full rounded-xl bg-slate-800 p-6 max-w-md shadow-xl">
        <div className="w-full flex items-center justify-between mb-4">
          <p>Assign role</p>
          <button onClick={onClose}>X</button>
        </div>
        <form onSubmit={handleOnSubmit}>
            <IFCondition condition={errors}>
                <p className="text-red-500">{errors}</p>
            </IFCondition>
          <select
            className="w-full p-2 bg-slate-800 rounded-lg border border-slate-700"
            name="premission_id"
            disabled={loading}
          >
            <option value={""}>Select role</option>
            <IFCondition condition={!loading}>
              {premissions.map((premission) => {
                return (
                  <option key={premission.id} value={premission.id}>
                    {premission.name}
                  </option>
                );
              })}
            </IFCondition>
          </select>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <PrimaryButton className={"mt-3 w-full"}>Add</PrimaryButton>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddPost;
