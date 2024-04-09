import React from "react";
import axiosClient from "../axios/axios";
import IFCondition from "./IFCondition";
import SuccessButton from "../components/Buttons/SuccessButton";
import DangerButton from "../components/Buttons/DangerButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Loading from "../components/Loading";

function ManageRequestsUserProfile({
    authUser,
    requestLoading,
    request,
    setRequestLoading,
    setRequest,
}) {
    const handleSendRequest = async () => {
        setRequestLoading(true);
        try {
            const resUser = await axiosClient.post(`/friends`, {
                user_id: user.id,
            });
            if (resUser.status == 200) {
                setRequest(resUser.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRequestLoading(false);
        }
    };

    const handleAcceptRequest = async () => {
        setRequestLoading(true);
        try {
            const resUser = await axiosClient.put(
                `/friends/${request.request.id}`
            );
            if (resUser.status == 200) {
                setRequest(resUser.data);
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
            const resUser = await axiosClient.delete(
                `/friends/${request.request.id}`
            );
            if (resUser.status == 200) {
                setRequest(null);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRequestLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center mt-7 border-t-2 border-t-slate-800 p-4">
            <IFCondition condition={requestLoading}>
                <Loading />
            </IFCondition>

            <IFCondition condition={!requestLoading && request == null}>
                <PrimaryButton onClick={handleSendRequest}>
                    Request
                </PrimaryButton>
            </IFCondition>

            <IFCondition
                condition={
                    !requestLoading &&
                    request != null &&
                    request.owner_id != authUser.id &&
                    request.request.status == false
                }
            >
                <>
                    <SuccessButton onClick={handleAcceptRequest}>
                        Accept request
                    </SuccessButton>
                    <DangerButton onClick={handleCancelRequest}>
                        Unaccept request
                    </DangerButton>
                </>
            </IFCondition>

            <IFCondition
                condition={
                    !requestLoading &&
                    request != null &&
                    request.owner_id == authUser.id &&
                    request.request.status == false
                }
            >
                <SecondaryButton onClick={handleCancelRequest}>
                    Cancel request
                </SecondaryButton>
            </IFCondition>

            <IFCondition
                condition={
                    !requestLoading &&
                    request != null &&
                    request.request.status == true
                }
            >
                <DangerButton onClick={handleCancelRequest}>
                    Cancel friend
                </DangerButton>
            </IFCondition>
        </div>
    );
}

export default ManageRequestsUserProfile;
