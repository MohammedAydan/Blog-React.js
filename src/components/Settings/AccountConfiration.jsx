import React, { useEffect, useState } from "react";
import TextInput from "../TextInput";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useAuth } from "../../contexts/AuthContext";
import { FaIdCard } from "react-icons/fa6";
import Loading from "../Loading";
import axiosClient from "../../axios/axios";

const InitErrors = {
  fullname_in_arabic: null,
  fullname_in_english: null,
  identity_card_front: null,
  identity_card_back: null,
};

function AccountConfirmation() {
  const [RequestDone, setRequestDone] = useState(false);
  const [RequestIsDone, setRequestIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [idF, setIdF] = useState(null);
  const [idB, setIdB] = useState(null);
  const [errors, setErrors] = useState(InitErrors);

  useEffect(() => {
    const handleCheckRequest = async () => {
      setIsLoading(true);
      try {
        const res = await axiosClient.get(`/user/account-confirmation`);
        if (res.status == 200) {
          if (res.data.request == true) {
            if (res.data.status == true) {
              setRequestIsDone(true);
              setRequestDone(false);
            } else {
              setRequestIsDone(false);
              setRequestDone(true);
            }
          } else {
            setRequestIsDone(false);
            setRequestDone(false);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleCheckRequest();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullname_in_arabic: e.target.fullname_in_arabic.value,
      fullname_in_english: e.target.fullname_in_english.value,
      identity_card_front: idF,
      identity_card_back: idB,
    };

    if (!data.fullname_in_arabic) {
      setErrors({
        fullname_in_arabic: "This field is required",
        fullname_in_english: null,
        identity_card_front: null,
        identity_card_back: null,
      });
      return;
    }
    if (!data.fullname_in_english) {
      setErrors({
        ...errors,
        fullname_in_arabic: null,
        fullname_in_english: "This field is required",
        identity_card_front: null,
        identity_card_back: null,
      });
      return;
    }

    if (!idF) {
      setErrors({
        fullname_in_arabic: null,
        fullname_in_english: null,
        identity_card_front: "This field is required",
        identity_card_back: null,
      });
      return;
    }

    if (!idB) {
      setErrors({
        fullname_in_arabic: null,
        fullname_in_english: null,
        identity_card_front: null,
        identity_card_back: "This field is required",
      });
      return;
    }

    setErrors({
      fullname_in_arabic: null,
      fullname_in_english: null,
      identity_card_front: null,
      identity_card_back: null,
    });

    handleRequest(data);
  };

  const handleRequest = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosClient.post("user/account-confirmation", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 200) {
        if (res.data.request == true) {
          setRequestDone(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <p className="mb-4 font-bold">Account confirmation</p>
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  if (RequestDone) {
    return (
      <div>
        <p className="mb-4 font-bold">Account confirmation</p>
        <p className="text-center text-gray-300">
          Your request has been submitted
        </p>
      </div>
    );
  }

  if (RequestIsDone) {
    return (
      <div>
        <p className="mb-4 font-bold">Account confirmation</p>
        <p className="text-center text-gray-300">
          Your request has been accepted 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={handleOnSubmit} className="flex flex-col">
        <p className="mb-4 font-bold">Account confirmation</p>
        <ShowError error={errors.fullname_in_arabic} />
        <TextInput
          className={"mb-2"}
          placeholder={"Enter full name in arabic"}
          name={"fullname_in_arabic"}
        />
        <ShowError error={errors.fullname_in_english} />
        <TextInput
          className={"mb-2"}
          placeholder={"Enter full name in english"}
          name={"fullname_in_english"}
        />
        <p className="p-1 text-gray-300 text-center">National identity card</p>
        <div className="flex mb-2">
          <div className="w-full flex flex-col">
            <ShowError error={errors.identity_card_front} />
            <label
              htmlFor="front-img-id"
              className={`w-full p-2 border ${
                idF ? "border-green-600" : "border-slate-700"
              } rounded-lg flex items-center justify-between mr-1`}
            >
              <span className="text-gray-400">SELECT ID CARD FRONT</span>
              <span>
                <FaIdCard />
              </span>
            </label>
            <TextInput
              id={"front-img-id"}
              type="file"
              onChange={(e) => setIdF(e.target.files[0])}
              className={"mb-2 sr-only hidden"}
            />
          </div>
          <div className="w-full flex flex-col">
            <ShowError error={errors.identity_card_back} />
            <label
              htmlFor="back-img-id"
              className={`w-full p-2 border ${
                idB ? "border-green-600" : "border-slate-700"
              } rounded-lg flex items-center justify-between ml-1`}
            >
              <span className="text-gray-400">SELECT ID CARD BACK</span>
              <span>
                <FaIdCard />
              </span>
            </label>
            <TextInput
              id={"back-img-id"}
              type="file"
              onChange={(e) => setIdB(e.target.files[0])}
              className={"mb-2 sr-only hidden"}
            />
          </div>
        </div>
        <PrimaryButton className={"w-full mt-2"}>Request</PrimaryButton>
      </form>
    </div>
  );
}

export default AccountConfirmation;

const ShowError = ({ error }) => {
  if (error != null) {
    return <p className="text-red-500 text-sm">{error}</p>;
  } else {
    return <p className="w-full h-5"></p>;
  }
};
