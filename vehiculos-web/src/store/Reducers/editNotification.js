const initialState = {
  error: null,
  loading: null,
  notification: null,
  openDelete: false,
  imageID: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_START_EDIT_GET_NOTIFICATION":
      return { ...state, loading: true };
    case "SUCCESS_EDIT_GET_NOTIFICATION":
      // console.log("action notification",action.value);
      return { ...state, ...action.value, loading: false };
    case "FAILURE_GET_EDIT_NOTIFICATION":
      // console.log("errorrrr");
      return { ...state, error: true };
    case "EDIT_NOTIFICATION_CHANGE_FIELD":
      // console.log("llegue al reducer edi notifi",action.value);
      return { ...state, [action.field]: action.value };
    // case "EXIT_LOADING_ERROR":
    //     return { ...state, loading: false };
    case "DELETE_IMAGE_OPEN_DIALOG":
      // console.log("image id", action.id);
      return { ...state, openDelete: true, imageID: action.id };
    case "DELETE_IMAGE_CLOSE_DIALOG":
      // console.log("cloase dialog");
      return { ...state, openDelete: false, loading: false };

    case "START_REMOVE_IMAGE_NOTIFICATION":
      return { ...state, loading: true };
    case "SUCCESS_REMOVE_IMAGE_NOTIFICATION":
      // console.log("action notification",action.value);
      return { ...state, ...action.value, loading: false, openDelete: false };
    case "FAILURE_REMOVE_IMAGE_NOTIFICATION":
      // console.log("errorrrr");
      return { ...state, error: true };
    case "UPDATE_IMAGES_ARRAY":
      // console.log("action.image", action.image);
      return {
        ...state,
        images: state.images.filter(
          noti => noti.replace("/ImagesNotifications/", "") !== action.image
        )
      };

    case "START_ADD_IMAGE_NOTIFICATION":
      return { ...state, loading: true };
    case "SUCCESS_ADD_IMAGE_NOTIFICATION":
      // console.log("action notification",action.value);
      return { ...state, ...action.value, loading: false };
    case "FAILURE_ADD_IMAGE_NOTIFICATION":
      // console.log("errorrrr");
      return { ...state, error: true };
    case "UPDATE_NEW_IMAGES_ARRAY":
      // console.log("action.images", action.images); 
      //solo muestra las nuevas imagenes:
      return { ...state, images: [...action.images] };
      // asi mostraria las imagenes viejas y las nuevas:
      // return { ...state, images: [...state.images, ...action.images] };

    default:
      return state;
  }
};
export default reducer;
