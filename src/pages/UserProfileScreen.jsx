import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import axiosClient from "../axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Loading from "../components/Loading";
import ManageRequestsUserProfile from "../components/ManageRequestsUserProfile";
import { MediaAccountsPath } from "../MyMethods/MyMethods";
import IFCondition from "../components/IFCondition";
import OpenImage from "../components/OpenImage";
import { MdVerified } from "react-icons/md";
import UserAvater from "../components/UserAvater";

function UserProfileScreen() {
  const { id } = useParams();
  const { loading, user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [request, setRequest] = useState(null);
  const [openImg, setOpenImg] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   document.title = "BLOG | Profile";
  // }, []);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      if (authUser.id == id) {
        navigate("/profile");
      }
      try {
        const resUser = await axiosClient.get(`/user/${id}`);
        if (resUser.status == 200) {
          console.log(resUser.data);
          setUser(resUser.data);
          return;
        }
        return <NotFound />;
      } catch (error) {
        console.log(error);
        return <NotFound />;
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading && authUser) {
      getUser().then(() => checkRequest());
    }
  }, [id, loading]);

  const checkRequest = async () => {
    setRequestLoading(true);
    try {
      const resUser = await axiosClient.get(`/friends/${id}`);
      if (resUser.status == 200) {
        if (resUser.data.request == null) {
          setRequest(null);
        } else {
          setRequest(resUser.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRequestLoading(false);
    }
  };

  // return "1"

  return (
    <AuthLayout>
      {isLoading ? (
        <center className="mt-4">
          <Loading />
        </center>
      ) : (
        <div className="w-full h-screen p-6 bg-slate-900 shadow-md mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center space-x-4 max-w-2xl mx-auto">
              <UserAvater imgUrl={user?.img_url} user={user} avaterSize="big" setOpenImg={setOpenImg}/>
              <div className="mt-3 sm:mt-0">
                <div className="text-lg text-gray-300 dark:text-gray-300">
                  <p>Friends: hidden</p>
                </div>
                <h1 className="text-2xl font-bold text-gray-200 dark:text-white">
                  {user?.name}
                </h1>
                <p className="text-gray-400 dark:text-gray-300">
                  @{user?.username}
                </p>
              </div>
            </div>

            <div className="w-max mx-auto justify-center">
              {/* <div className="mt-6">
                            <h2 className="text-xl font-bold mb-2 text-gray-200 dark:text-white">
                                Contact
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                {user.email}
                            </p>
                        </div> */}
            </div>

            <ManageRequestsUserProfile
              user={user}
              authUser={authUser}
              requestLoading={requestLoading}
              request={request}
              setRequestLoading={setRequestLoading}
              setRequest={setRequest}
            />
          </div>
          <IFCondition condition={openImg}>
            <OpenImage
              baseUrl={MediaAccountsPath}
              imgUrl={openImg}
              onClose={() => setOpenImg(null)}
            />
          </IFCondition>
        </div>
      )}
    </AuthLayout>
  );
}

export default UserProfileScreen;
