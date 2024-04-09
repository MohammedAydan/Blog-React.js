import React, { useState } from "react";
import TextInput from "../TextInput";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useAuth } from "../../contexts/AuthContext";
import { useSettings } from "../../contexts/SettingsContext";
import IFCondition from "../IFCondition";
import Loading from "../Loading";

function UpdateProfile() {
  const { user } = useAuth();
  const {
    loadingUpdateProfile,
    handleUpdateProfile,

    messageSuccess,
  } = useSettings();
  const [errors, setErrors] = useState(null);
  const [defualtData, setDefualtData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    age: user.age,
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (defualtData.name == null || defualtData.name == "") {
      setErrors("Name is required");
      return;
    }

    if (defualtData.username == null || defualtData.username == "") {
      setErrors("Username is required");
      return;
    }

    if (defualtData.email == null || defualtData.email == "") {
      setErrors("Email is required");
      return;
    }

    if (defualtData.phone == null || defualtData.phone == "") {
      setErrors("Phone number is required");
      return;
    }

    if (defualtData.age == null || defualtData.age == "") {
      setErrors("Age is required");
      return;
    }

    setErrors(null);
    handleUpdateProfile(defualtData);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <p className="mb-4 font-bold">Update profile</p>
        {errors && <p className="text-red-500 mb-4">{errors}</p>}
        {messageSuccess.name == "update" && (
          <p className="text-green-500 mb-4">{messageSuccess.message}</p>
        )}
        <label className="mb-1" htmlFor="name">
          Name:
        </label>
        <TextInput
          id={"name"}
          className={"mb-2"}
          placeholder={"Enter name"}
          value={defualtData.name}
          onChange={(e) =>
            setDefualtData({
              ...defualtData,
              name: e.target.value,
            })
          }
        />
        <label className="mb-1" htmlFor="username">
          Username:
        </label>
        <TextInput
          id={"username"}
          className={"mb-2"}
          placeholder={"Enter username"}
          value={defualtData.username}
          onChange={(e) =>
            setDefualtData({
              ...defualtData,
              username: e.target.value,
            })
          }
        />
        <label className="mb-1" htmlFor="email">
          Email:
        </label>
        <TextInput
          id={"email"}
          className={"mb-2"}
          placeholder={"Enter email"}
          value={defualtData.email}
          onChange={(e) =>
            setDefualtData({
              ...defualtData,
              email: e.target.value,
            })
          }
        />
        <label className="mb-1" htmlFor="phone_number">
          Phone number:
        </label>
        <TextInput
          id={"phone_number"}
          type="number"
          className={"mb-2"}
          placeholder={"Enter phone number"}
          value={defualtData.phone}
          onChange={(e) =>
            setDefualtData({
              ...defualtData,
              phone: e.target.value,
            })
          }
        />
        <label className="mb-1" htmlFor="age">
          Age:
        </label>
        <TextInput
          id={"age"}
          type="number"
          className={"mb-2"}
          placeholder={"Enter age"}
          value={defualtData.age}
          onChange={(e) =>
            setDefualtData({
              ...defualtData,
              age: e.target.value,
            })
          }
        />
        <IFCondition condition={loadingUpdateProfile}>
          <center className="mt-3">
            <Loading />
          </center>
        </IFCondition>
        <IFCondition condition={!loadingUpdateProfile}>
          <PrimaryButton className={"w-full mt-2"}>Update</PrimaryButton>
        </IFCondition>
      </form>
    </div>
  );
}

export default UpdateProfile;
