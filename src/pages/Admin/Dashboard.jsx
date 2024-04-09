import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import axiosClient from "../../axios/axios";
import IFCondition from "../../components/IFCondition";
import Loading from "../../components/Loading";
import { FaUsers } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { BsFilePostFill } from "react-icons/bs";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState({
    users_count: 0,
    posts_count: 0,
    accounts_confirmation_count: 0,
  });

  useEffect(() => {
    const getCounts = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get("admin/counts");
        if (res.status == 200) {
          setRes(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCounts();
  }, []);

  return (
    <AdminLayout>
      <div className="text-white">
        <div className="p-4 bg-slate-800">
          <h1 className="text-lg font-bold text-white">Dashboard</h1>
        </div>

        <IFCondition condition={loading}>
          <center className="p-3">
            <Loading />
          </center>
        </IFCondition>
        <IFCondition condition={!loading}>
          <div className="dashboard-body mt-3 max-w-4xl mx-auto">
            <div className="block sm:flex items-center justify-center p-3">
              <div className="w-full sm:w-2/6 bg-slate-800 rounded-xl border border-slate-700 m-1 p-6 h-32">
                <Link to="/admin/Posts">
                  <div className="flex items-center text-white">
                    <BsFilePostFill size={25} />
                    <h1 className="text-lg font-bold ml-2">Posts</h1>
                  </div>
                </Link>
                <p className="text-white w-full h-full flex items-center justify-center">
                  Total: {res.posts_count}
                </p>
              </div>
              <div className="w-full sm:w-2/6 bg-slate-800 rounded-xl border border-slate-700 m-1 p-6 h-32">
                <Link to="/admin/users">
                  <div className="flex items-center text-white">
                    <FaUsers size={25} />
                    <h1 className="text-lg font-bold ml-2">Users</h1>
                  </div>
                </Link>
                <p className="text-white w-full h-full flex items-center justify-center">
                  Total: {res.users_count}
                </p>
              </div>
              <div className="w-full sm:w-2/6 bg-slate-800 rounded-xl border border-slate-700 m-1 p-6 h-32">
                <Link to="/admin/RequestsAccountsConfirmation">
                  <div className="flex items-center text-white">
                    <MdVerified size={25} />
                    <h1 className="text-lg font-bold ml-2"> Requests AC</h1>
                  </div>
                </Link>
                <p className="text-white w-full h-full flex items-center justify-center">
                  Total: {res.accounts_confirmation_count}
                </p>
              </div>
            </div>
          </div>
          <div className="manage px-3">
            <MagageSecction />
          </div>
        </IFCondition>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;

const MagageSecction = () => {
  return (
    <div className="max-w-4xl mx-auto mt-3 border-y border-slate-700 p-3">
      <div className="">
        <p className="text-lg font-bold text-white mb-2">
          Manage accounts confirmations
        </p>
        <div className="flex flex-wrap">
          <Link to={"/admin/RequestsAccountsConfirmation"}>
            <OutlinedButton className={"bg-slate-800"}>Requests accounts confirmations</OutlinedButton>
          </Link>
        </div>
      </div>
      <div className="border-t border-t-slate-700 mt-3 pt-3">
        <p className="text-lg font-bold text-white mb-2">Manage policy</p>
        <div className="flex flex-wrap">
          <Link to={"/admin/roles"}>
            <OutlinedButton className={"bg-slate-800"}>Show roles</OutlinedButton>
          </Link>
          <Link to={"/admin/roles/addRole"}>
            <OutlinedButton className={"bg-slate-800"}>Add Role</OutlinedButton>
          </Link>
        </div>
      </div>

      <div className="border-t border-t-slate-700 mt-3 pt-3">
        <p className="text-lg font-bold text-white mb-2">Manage users</p>
        <div className="flex flex-wrap">
          <Link to={"/admin/users"}>
            <OutlinedButton className={"bg-slate-800"}>Assign a role to a user</OutlinedButton>
          </Link>
        </div>
      </div>
      <div className="border-t border-t-slate-700 mt-3 pt-3">
        <p className="text-lg font-bold text-white mb-2">Manage posts</p>
        <div className="flex flex-wrap">
          <Link to={"/admin/posts"}>
            <OutlinedButton className={"bg-slate-800"}>Show posts</OutlinedButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
