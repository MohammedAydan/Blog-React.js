import React from "react";
import DangerButton from "../Buttons/DangerButton-1";
import { useAuth } from "../../contexts/AuthContext";
import { useSettings } from "../../contexts/SettingsContext";
import IFCondition from "../IFCondition";
import Loading from "../Loading";

function DeleteAccount() {
  const { user } = useAuth();
  const { loadingDeleteAccount, handleDeleteAccount } = useSettings();

  return (
    <div>
      <form>
        <p className="mb-4 font-bold">Delete account</p>

        <p>
          When you delete the account, you will not again able to recover it
          again.
        </p>
        <IFCondition condition={loadingDeleteAccount}>
          <center className="mt-3">
            <Loading />
          </center>
        </IFCondition>
        <IFCondition condition={!loadingDeleteAccount}>
          <DangerButton
            onClick={() => handleDeleteAccount()}
            className={"w-full mt-2"}
          >
            Delete account
          </DangerButton>
        </IFCondition>
      </form>
    </div>
  );
}

export default DeleteAccount;
