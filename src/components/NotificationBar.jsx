import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import axiosClient from "../axios/axios";
import PrimaryButton from "./Buttons/PrimaryButton";
import DangerButton from "./Buttons/DangerButton-1";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MediaAccountsPath } from "../MyMethods/MyMethods";
import { FaUserGroup } from "react-icons/fa6";
import IFCondition from "./IFCondition";
import UserAvater from "./UserAvater";

function NotificationBar() {
  const [open, setOpen] = useState(false);
  const [lodaing, setLodaing] = useState(false);
  const [requests, setRequests] = useState([]);

  const openOrClose = () => {
    setOpen(!open);
  };

  const getRequests = async () => {
    if (open) {
      setLodaing(true);
      try {
        const res = await axiosClient.get("/friends/requests");
        if (res.status == 200) {
          setRequests(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLodaing(false);
      }
    }
  };

  useEffect(() => {
    if (open) {
      getRequests();
    }
  }, [open]);

  return (
    <div className="w-11 h-11 mr-2 relative">
      <button
        onClick={openOrClose}
        className={`w-full h-full rounded-full flex items-center justify-center border`}
      >
        <FaUserGroup size={23} color="white" />
      </button>
      <div
        className={`fixed top-0 bg-slate-800 shadow-2xl w-full max-w-sm h-screen text-white transition-all duration-500 z-50 ${
          open == true
            ? "right-0 transition-all duration-500"
            : "-right-96 transition-all duration-500"
        }`}
      >
        <div className="header w-full flex">
          <button onClick={openOrClose} className="w-12 h-12">
            X
          </button>
        </div>
        <div
          className="mt-2 p-3 w-full overflow-auto"
          style={{ height: "calc(100% - 2rem)" }}
        >
          <IFCondition condition={lodaing}>
            <center>
              <Loading />
            </center>
          </IFCondition>

          <IFCondition
            condition={!lodaing && Object.keys(requests).length == 0}
          >
            <center>
              <p>No requests</p>
            </center>
          </IFCondition>

          <IFCondition condition={!lodaing && Object.keys(requests).length > 0}>
            {Object.values(requests).map((r) => {
              return (
                <Card
                  key={r.id}
                  {...r}
                  user={r.owner}
                  setRequests={setRequests}
                />
              );
            })}
          </IFCondition>
        </div>
      </div>
    </div>
  );
}

export default NotificationBar;

const Card = ({ user, id, owner_id, status, setRequests }) => {
  // const { user:authUser, loading } = useAuth();
  const [requestLoading, setRequestLoading] = useState(false);

  const handleAcceptRequest = async () => {
    setRequestLoading(true);
    try {
      const resUser = await axiosClient.put(`/friends/${id}`);
      if (resUser.status == 200) {
        setRequests((prevData) =>
          prevData.filter((r) => {
            if (r.id == id) {
              r.status = true;
              return r;
            }
            return r;
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRequestLoading(false);
    }
  };

  const handleCancelRequest = async () => {
    setRequestLoading(true);
    try {
      const resUser = await axiosClient.delete(`/friends/${id}`);
      if (resUser.status == 200) {
        setRequests((prevData) => prevData.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className="w-full p-2 border-b border-b-slate-700">
      <div className="w-full flex items-center justify-between">
        <Link to={`/profile/${user.id}`}>
          <div className="w-full flex items-center">
            <UserAvater
              imgUrl={user?.img_url}
              user={user}
              avaterSize="small"
            />

            <p>{user.name}</p>
          </div>
        </Link>
        <div className="text-white">Request</div>
      </div>
      {requestLoading && (
        <center>
          <Loading />
        </center>
      )}
      {!requestLoading && status == true && (
        <>
          <p className="p-3 text-center rounded-lg border border-slate-700 mt-2">
            Successfull
          </p>
        </>
      )}
      {!requestLoading && status == false && (
        <div className="controllers flex mt-2">
          <PrimaryButton onClick={handleAcceptRequest} className="w-full m-1">
            Yes
          </PrimaryButton>
          <DangerButton onClick={handleCancelRequest} className="w-full m-1">
            NO
          </DangerButton>
        </div>
      )}
    </div>
  );
};
