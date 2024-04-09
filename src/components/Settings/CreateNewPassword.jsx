import React from "react";
import TextInput from "../TextInput";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useSettings } from "../../contexts/SettingsContext";
import IFCondition from "../IFCondition";
import Loading from "../Loading";

function CreateNewPassword() {
  const {
    loadingUpdatePassword,
    handleUpdatePassword,
    errors,
    setErrors,
    messageSuccess,
  } = useSettings();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const data = {
      password: e.target.password.value,
      new_password: e.target.new_password.value,
      confirm_password: e.target.confirm_password.value,
    };

    if (data.password == null || data.password == "") {
      setErrors("Password is required");
      return;
    }

    if (data.new_password == null || data.new_password == "") {
      setErrors("New password is required");
      return;
    }

    if (data.confirm_password == null || data.confirm_password == "") {
      setErrors("Confirm password is required");
      return;
    }

    handleUpdatePassword(data);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <p className="mb-4 font-bold">Create new password</p>
        {errors && <p className="text-red-500 mb-4">{errors}</p>}
        {messageSuccess.name == "newPassword" && (
          <p className="text-green-500 mb-4">{messageSuccess.message}</p>
        )}
        <TextInput
          name={"password"}
          className={"mb-2"}
          placeholder={"Enter password"}
        />
        <TextInput
          name={"new_password"}
          className={"mb-2"}
          placeholder={"Enter new password"}
        />
        <TextInput
          name={"confirm_password"}
          className={"mb-2"}
          placeholder={"Confirm new password"}
        />
        <IFCondition condition={loadingUpdatePassword}>
          <center className="mt-3">
            <Loading />
          </center>
        </IFCondition>
        <IFCondition condition={!loadingUpdatePassword}>
          <PrimaryButton className={"w-full mt-2"}>New password</PrimaryButton>
        </IFCondition>
      </form>
    </div>
  );
}

export default CreateNewPassword;
