import axios from "../../axios";
import { enqueueError } from "./notification";
import { enqueueMessage } from "./notification";

export const editNotificationOnFieldChange = (field, value) => ({
  type: "EDIT_NOTIFICATION_CHANGE_FIELD",
  field,
  value
});

export const handleClickOpenDeleteImage = id => ({
  type: "DELETE_IMAGE_OPEN_DIALOG",
  id
});

export const handleCloseDelete = () => ({
  type: "DELETE_IMAGE_CLOSE_DIALOG"
});

// //Request Edit Get Notification//////////////////////////
const request = () => ({
  type: "REQUEST_START_EDIT_GET_NOTIFICATION"
});

const success = value => ({
  type: "SUCCESS_EDIT_GET_NOTIFICATION",
  value
});

const failure = () => ({
  type: "FAILURE_GET_EDIT_NOTIFICATION"
});

// const exitLoadingError = () => ({
//   type: "EXIT_LOADING_ERROR"
// });

export const requestGetNotification = id => async (dispatch, getState) => {
  dispatch(request());
  try {
    // console.log("legueeeeeeq",id);
    const response = await axios.get(
      `http://localhost:8000/vehicleNotifications/${id}`
    );
    // console.log("response",response);
    dispatch(success(response.data));
    // dispatch(exitLoadingError());
    return response.data;
  } catch (error) {
    dispatch(failure());
    dispatch(enqueueError("No se encontro la notificacion"));
  }
};

export const UpdateNotification = NotifiID => async (dispatch, getState) => {
  const { editNotification } = getState();

  dispatch(request());
  try {
    const response = await axios.post(
      `http://localhost:8000/vehicleNotifications/${NotifiID}`,
      editNotification
    );

    // console.log("response.data",response.data);
    dispatch(success(response.data));
    return response.data;
  } catch (error) {
    dispatch(failure());
    dispatch(enqueueError("No se actualizo la Notificacion"));
  }
};

//REMOVE IMAGE

const requestRemoveImage = () => ({
  type: "START_REMOVE_IMAGE_NOTIFICATION"
});

const successRemoveImage = value => ({
  type: "SUCCESS_REMOVE_IMAGE_NOTIFICATION",
  value
});

const failureRemoveImage = () => ({
  type: "FAILURE_REMOVE_IMAGE_NOTIFICATION"
});

export const updateImageArray = image => ({
  type: "UPDATE_IMAGES_ARRAY",
  image
});

export const OnRemoveImageNotification = (id, imageID) => async (
  dispatch,
  getState
) => {
  dispatch(requestRemoveImage());
  try {
    // console.log("id notification", id);
    // console.log("imageID", imageID);

    const response = await axios.delete(
      `http://localhost:8000/vehicleNotifications/${id}/images/${imageID}`
    );

    // console.log("response.data", response.status);

    dispatch(handleCloseDelete());
    dispatch(updateImageArray(imageID));
    dispatch(successRemoveImage(response.data));
    dispatch(enqueueMessage("La imagen se elimino correctamente"));
    return response.data;
  } catch (error) {
    console.log(error);
    dispatch(failureRemoveImage());
    dispatch(enqueueError("No se pudo eliminar la Imagen"));
  }
};

const requestAddImage = () => ({
  type: "START_ADD_IMAGE_NOTIFICATION"
});

const successAddImage = value => ({
  type: "SUCCESS_ADD_IMAGE_NOTIFICATION",
  value
});

const failureAddImage = () => ({
  type: "FAILURE_ADD_IMAGE_NOTIFICATION"
});

export const updateNewImagesArray = images => ({
  type: "UPDATE_NEW_IMAGES_ARRAY",
  images
});

export const addImageNotificationVehicleOnSave = (
  notificationID,
  imagesSelected
) => async (dispatch, getState) => {
  let formData = new FormData();
  const images = [];
  Array.from(imagesSelected).forEach(image => {
    formData.append("images", image);
  });
  dispatch(requestAddImage());
  try {
    const response = await axios.post(
      `http://localhost:8000/vehicleNotifications/${notificationID}/addImages`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    console.log("imagesSelected", imagesSelected);
    console.log("response", response.data);
    dispatch(successAddImage(response.data));
    dispatch(updateNewImagesArray(response.data.images));
    dispatch(enqueueMessage("Se agrego la imagen correctamente"));
    return response.data;
  } catch (error) {
    console.log(error);
    dispatch(failureAddImage());
    dispatch(enqueueError("No se agrego la imagen"));
  }
};
