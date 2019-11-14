import axios from "../../axios";
import { enqueueError } from "./notification";
import { enqueueMessage } from "./notification";
import FormData from "form-data";

export const handleChangeSingleNotification = value => ({
  type: "SELECT_TYPE_NOTIFI_DIALOG",
  value
});

export const handleClickOpenNotificactionVehicle = vehicle => ({
  type: "NOTIFICATION_OPEN_DIALOG",
  vehicle
});

export const handleCloseNotificationsVehicle = () => ({
  type: "NOTIFICATION_CLOSE_DIALOG"
});

export const notificationVehicleOnFieldChange = (field, value) => ({
  type: "NOTIFICATION_VEHICLE_CHANGE_FIELD",
  field,
  value
});

export const ImageNotificationOnFieldChange = (field, value) => ({
  type: "NOTIFICATION_IMAGE_VEHICLE_CHANGE_FIELD",
  field,
  value
});

export const handleClickOpenDeleteNotification = id => ({
  type: "DELETE_NOTIFICATION_OPEN_DIALOG",
  id
});

export const handleCloseDelete = () => ({
  type: "DELETE_NOTIFICATION_CLOSE_DIALOG"
});

const request = () => ({
  type: "REQUEST_START_NOTIFICATION"
});

const success = vehicle => ({
  type: "SUCCESS_NOTIFICATION",
  vehicle
});

const failure = () => ({
  type: "FAILURE_NOTIFICATION"
});

const confirmDialog = () => ({
  type: "CONFIRM_DIALOG"
});
const renewState = () => ({
  type: "RENEW_STATE_NOTIFICATION_VEHICLE"
});

export const addNotificationVehicleOnSave = (userName,userID,imagesSelected) => async (dispatch, getState) => {
  const { notificationsVehicle } = getState();

  // console.log("notificationsVehicle",notificationsVehicle);
  // console.log("imagesSelected", imagesSelected);

  let formData = new FormData();

  Array.from(imagesSelected).forEach(image => {
    formData.append('images', image);
  });
  // formData.append("image", imagesSelected[0]);
  formData.append("id", notificationsVehicle.id);
  formData.append("notification", notificationsVehicle.notification);
  formData.append("selectedValueNotification", notificationsVehicle.selectedValueNotification.value);
  formData.append("userName", userName);
  formData.append("userID", userID);

  dispatch(request());
  try {
    const response = await axios.post(
      `http://localhost:8000/vehicleNotifications/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    dispatch(success(response));
    dispatch(confirmDialog());
    dispatch(renewState());
    dispatch(enqueueMessage("Se agrego la notificacion correctamente"));
    return response.data;
  } catch (error) {
    console.log(error);
    dispatch(failure());
    dispatch(enqueueError("No se agrego la notificacion"));
  }
};

const requestList = () => ({
  type: "REQUEST_START_NOTIFICATIONS"
});

const successList = notifications => ({
  type: "SUCCESS_NOTIFICATIONS",
  notifications
});

const failureList = () => ({
  type: "FAILURE_NOTIFICATIONS"
});

export const requestListNotifications = () => async dispatch => {
  dispatch(requestList());
  try {
    const response = await axios.get(
      `http://localhost:8000/vehicleNotifications`
    );
    // console.log("response.data",response.data);
    dispatch(successList(response.data));
    return response.data;
  } catch (error) {
    // console.log("error",error);
    dispatch(failureList());
    dispatch(enqueueError("Error al consultar las notificaciones"));
  }
};

const requestRemove = () => ({
  type: "START_REMOVE_NOTIFICATION"
});

const successRemove = notification => ({
  type: "SUCCESS_REMOVE_NOTIFICATION",
  notification
});

const failureRemove = () => ({
  type: "FAILURE_REMOVE_NOTIFICATION"
});

export const removeNotification = id => ({
  type: "REMOVE_NOTIFICATION",
  id
});

export const OnRemoveNotification = id => async (dispatch, getState) => {
  dispatch(requestRemove());
  try {
    console.log("id remove", id);
    dispatch(removeNotification(id));
    const response = await axios.delete(
      `http://localhost:8000/vehicleNotifications/${id}`
    );

    console.log("response.data", response.data);

    dispatch(handleCloseDelete());
    dispatch(successRemove(response));
    return response.data;
  } catch (error) {
    dispatch(failureRemove());
    dispatch(enqueueError("No se pudo dar de baja la Notificacion"));
  }
};
