import React, { useState, useEffect } from "react";
import TextInput from "../../../components/TextInput";
import AdminLayout from "../../../layouts/AdminLayout";
import axiosClient from "../../../axios/axios";
import IFCondition from "../../../components/IFCondition";
import Loading from "../../../components/Loading";
import { MediaAccountsPath } from "../../../MyMethods/MyMethods";
import SuccessButton from "../../../components/Buttons/SuccessButton";
import DangerButton from "../../../components/Buttons/DangerButton-1";
import { Link } from "react-router-dom";
import OutlinedButton from "../../../components/Buttons/OutlinedButton";
import AssignRole from "../../../components/AssignRole";

function ShowUsers() {
  const [selectUserId, setSelectUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchByName, setSearchByName] = useState(true);
  const [loadingRemoveRole, setLoadingRemoveRole] = useState({
    userId: null,
    roleId: null,
    loading: false,
  });

  const handleGetUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/user/${limit}/${page}`);
      if (res.status == 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByName = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`users/${search}`);
      if (res.status == 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByUserId = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`users/${search}/Id`);
      if (res.status == 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRole = async (userId, premissionId) => {
    setLoadingRemoveRole({
      userId: userId,
      roleId: premissionId,
      loading: true,
    });

    try {
      const res = await axiosClient.delete(
        `user/premissions/${userId}/${premissionId}`
      );
      if (res.status === 200) {
        setUsers((prev) =>
          prev.map((u) => {
            if (u.id === userId) {
              const updatedPermissions = u.premissions.filter(
                (p) => p.id !== premissionId
              );
              return { ...u, premissions: updatedPermissions };
            }
            return u;
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRemoveRole({
        userId: null,
        roleId: null,
        loading: false,
      });
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      if (searchByName) {
        handleSearchByName();
      } else {
        handleSearchByUserId();
      }
    } else {
      handleGetUsers();
    }
  }, [page, search, searchByName]);

  const getMoreRequests = () => {
    setPage((p) => p + 1);
  };

  const getPrevRequests = () => {
    setPage((p) => p - 1);
  };

  return (
    <AdminLayout>
      <div className="text-white">
        <div className="w-full p-3 bg-slate-800 sticky top-16">
          <div className="max-w-xl mx-auto flex">
            <TextInput
              placeholder={"search users"}
              className={"mr-1"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              onChange={(e) => {
                if (e.target.value == "name") {
                  setSearchByName(true);
                } else {
                  setSearchByName(false);
                }
              }}
              className="bg-slate-800 border border-slate-700 p-2 rounded-lg ml-1"
            >
              <option value="name">By name</option>
              <option value="id">By id</option>
            </select>
          </div>
        </div>
        <div className="max-w-xl mx-auto p-3">
          <IFCondition condition={loading}>
            <center className="p-2 w-">
              <Loading />
            </center>
          </IFCondition>
          <IFCondition condition={!loading && users.length == 0}>
            <center className="p-2 w-">
              <p>Not found</p>
            </center>
          </IFCondition>
          <IFCondition condition={!loading}>
            {users.map((user) => {
              return (
                <div key={user.id} className="bg-slate-800 rounded-lg my-2">
                  <div className="p-2 flex items-center justify-between">
                    <Link to={`profile/${user.id}`}>
                      <div className="p-2 bg-slate-800 rounded-lg my-1 flex items-center">
                        <img
                          src={MediaAccountsPath + user.img_url}
                          className="w-12 h-12 rounded-full"
                          alt=""
                        />
                        <p className="ml-2">{user.name}</p>
                      </div>
                    </Link>
                    <div className="flex">
                      <DangerButton>Delete</DangerButton>
                    </div>
                  </div>
                  <div className="mt-3 border-t border-t-slate-700">
                    <div className="flex flex-wrap mx-auto p-2">
                      <IFCondition condition={user.premissions.length == 0}>
                        <p className="p-2">No roles assigned</p>
                      </IFCondition>
                      {user.premissions.map((premission) => {
                        let user_id = premission.pivot.user_id;
                        let premission_id = premission.pivot.premission_id;

                        return (
                          <div
                            key={premission.id}
                            className="max-w-max p-2 border border-slate-700 rounded m-1 hover:bg-slate-600 transition duration-150 flex items-center justify-between"
                          >
                            <p className="mr-3">{premission.name}</p>
                            <IFCondition
                              condition={
                                loadingRemoveRole.userId == user_id &&
                                loadingRemoveRole.roleId == premission_id &&
                                loadingRemoveRole.loading
                              }
                            >
                              <Loading size={"small"} />
                            </IFCondition>
                            <IFCondition condition={!loadingRemoveRole.loading}>
                              <button
                                onClick={() =>
                                  handleRemoveRole(user_id, premission_id)
                                }
                                className="text-red-500"
                              >
                                X
                              </button>
                            </IFCondition>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-3 border-t border-t-slate-700">
                    <div className="flex flex-wrap mx-auto p-2">
                      <OutlinedButton
                        onClick={() => setSelectUserId(user.id)}
                        className={"mx-auto"}
                      >
                        Assign role
                      </OutlinedButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </IFCondition>
        </div>
        <div className="flex max-w-fit mx-auto">
          <IFCondition condition={page > 1}>
            <OutlinedButton onClick={getPrevRequests}>Prev</OutlinedButton>
          </IFCondition>
          <IFCondition condition={users.length > 0}>
            <OutlinedButton onClick={getMoreRequests}>Next</OutlinedButton>
          </IFCondition>
        </div>
      </div>
      <IFCondition condition={selectUserId}>
        <AssignRole
          userId={selectUserId}
          setUsers={setUsers}
          onClose={() => setSelectUserId(null)}
        />
      </IFCondition>
    </AdminLayout>
  );
}

export default ShowUsers;
