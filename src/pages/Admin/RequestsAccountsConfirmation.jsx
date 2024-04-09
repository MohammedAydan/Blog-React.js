import React, { useEffect, useState } from "react";
import SuccessButton from "../../components/Buttons/SuccessButton";
import DangerButton from "../../components/Buttons/DangerButton-1";
import OpenImage from "../../components/OpenImage";
import IFCondition from "../../components/IFCondition";
import axiosClient from "../../axios/axios";
import Loading from "../../components/Loading";
import { MediaAccountsConfirmations } from "../../MyMethods/MyMethods";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import AdminLayout from "../../layouts/AdminLayout";
import OutlinedButton from "../../components/Buttons/OutlinedButton";
import TextInput from "../../components/TextInput";

function RequestsAccountsConfirmation() {
  const [openImg, setOpenImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchByName, setSearchByName] = useState(true);
  const [loadingOne, setLoadingOne] = useState({
    id: null,
    loading: false,
  });
  const [requests, setRequests] = useState([]);

  const handleGetRequests = async () => {
    console.log(page);
    setLoading(true);
    try {
      const res = await axiosClient.get(
        `/user/accounts-confirmations/${limit}/${page}`
      );
      if (res.status == 200) {
        setRequests(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetRequests();
  }, [page]);

  const getMoreRequests = () => {
    setPage((p) => p + 1);
  };

  const getPrevRequests = () => {
    setPage((p) => p - 1);
  };

  const handleConfirmation = async (id) => {
    setLoadingOne({
      id: id,
      loading: true,
    });
    try {
      const res = await axiosClient.put(`/user/account-confirmation/${id}`);
      if (res.status == 200) {
        if (res.data.request) {
          setRequests((req) =>
            req.filter((r) => {
              if (r.id == id) {
                r.status = true;
                return r;
              }
              return r;
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOne({
        id: id,
        loading: false,
      });
    }
  };

  const handleCancelConfirmation = async (id) => {
    setLoadingOne({
      id: id,
      loading: true,
    });
    try {
      const res = await axiosClient.delete(`/user/account-confirmation/${id}`);
      if (res.status == 200) {
        setRequests((req) =>
          req.filter((r) => {
            if (r.id == id) {
              r.status = false;
              return r;
            }
            return r;
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOne({
        id: id,
        loading: false,
      });
    }
  };

  const handleDestroyAccountConfirmation = async (id) => {
    setLoadingOne({
      id: id,
      loading: true,
    });
    try {
      const res = await axiosClient.delete(
        `/user/account-confirmation/${id}/destroy`
      );
      if (res.status == 200) {
        setRequests((req) => req.filter((r) => r.id != id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOne({
        id: id,
        loading: false,
      });
    }
  };

  const handleSearchByUserId = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`user/account-confirmation/${search}`);
      if (res.status == 200) {
        setRequests(res.data);
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
      const res = await axiosClient.get(
        `user/account-confirmation/${search}/ByName`
      );
      if (res.status == 200) {
        setRequests(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
      handleGetRequests();
    }
  }, [search, searchByName]);

  return (
    <AdminLayout>
      <div className=" text-white">
        <div className="w-full p-3 bg-slate-800 sticky top-16">
          <div className="max-w-xl mx-auto flex">
            <TextInput
              placeholder={"search requests"}
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
        <IFCondition condition={loading}>
          <center className="p-2">
            <Loading />
          </center>
        </IFCondition>

        <div className="requests py-3">
          <IFCondition condition={!loading}>
            <IFCondition condition={requests.length == 0}>
              <center className="p-4">
                <p>Not found</p>
              </center>
            </IFCondition>
            {requests.map((req) => {
              return (
                <div
                  key={req.id}
                  className="max-w-xl rounded bg-slate-800 mx-auto p-4 mb-3"
                >
                  <a
                    href={`/profile/${req.owner_id}`}
                    className="text-blue-500"
                  >
                    Show user profile
                  </a>
                  <div className="flex items-center justify-start p-2">
                    <p>Full name ar: </p>
                    <p>{req.full_name_in_arabic}</p>
                  </div>
                  <div className="flex items-center justify-start p-2">
                    <p>Full name en: </p>
                    <p>{req.full_name_in_english}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="w-full cursor-pointer rounded-lg overflow-hidden mr-1">
                      <img
                        onClick={() => setOpenImg(req?.id_card_front)}
                        src={MediaAccountsConfirmations + req?.id_card_front}
                        alt={req?.id_card_front}
                        className="w-full"
                      />
                    </div>
                    <div className="w-full cursor-pointer rounded-lg overflow-hidden mr-1">
                      <img
                        onClick={() => setOpenImg(req?.id_card_back)}
                        src={MediaAccountsConfirmations + req?.id_card_back}
                        alt={req?.id_card_back}
                        className="w-full cursor-pointer rounded-lg ml-1"
                      />
                    </div>
                  </div>
                  <div className="w-full mt-4 flex items-center justify-between">
                    <IFCondition
                      condition={loadingOne.id == req.id && loadingOne.loading}
                    >
                      <center className="w-full">
                        <Loading />
                      </center>
                    </IFCondition>
                    <IFCondition condition={!loadingOne.loading}>
                      <IFCondition condition={!req.status}>
                        <div className="w-full flex items-center justify-between">
                          <SuccessButton
                            onClick={() => handleConfirmation(req.id)}
                            className={"w-full"}
                          >
                            Accepted
                          </SuccessButton>
                          <SecondaryButton
                            onClick={() => handleCancelConfirmation(req.id)}
                            className={"w-full"}
                          >
                            Unaccepted
                          </SecondaryButton>
                        </div>
                        <div className="w-full">
                          <DangerButton
                            onClick={() =>
                              handleDestroyAccountConfirmation(req.id)
                            }
                            className={"w-full"}
                          >
                            Delete confirmation
                          </DangerButton>
                        </div>
                      </IFCondition>
                      <IFCondition condition={req.status == true}>
                        <SecondaryButton
                          onClick={() => handleCancelConfirmation(req.id)}
                          className={"w-full"}
                        >
                          Cancel confirmation
                        </SecondaryButton>
                        <DangerButton
                          onClick={() =>
                            handleDestroyAccountConfirmation(req.id)
                          }
                          className={"w-full"}
                        >
                          Delete confirmation
                        </DangerButton>
                      </IFCondition>
                    </IFCondition>
                  </div>
                </div>
              );
            })}
          </IFCondition>
        </div>

        <IFCondition condition={openImg}>
          <OpenImage
            baseUrl={MediaAccountsConfirmations}
            imgUrl={openImg}
            onClose={() => setOpenImg(null)}
          />
        </IFCondition>

        <div className="flex max-w-fit mx-auto">
          <IFCondition condition={page > 1}>
            <OutlinedButton onClick={getPrevRequests}>Prev</OutlinedButton>
          </IFCondition>
          <IFCondition condition={requests.length > 0}>
            <OutlinedButton onClick={getMoreRequests}>Next</OutlinedButton>
          </IFCondition>
        </div>
      </div>
    </AdminLayout>
  );
}

export default RequestsAccountsConfirmation;
