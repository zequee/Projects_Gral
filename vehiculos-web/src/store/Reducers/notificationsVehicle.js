const reducer = (
  state = {
    id: null,
    openNotifications: false,
    notifications: [],
    loading: false,
    error: false,
    vehicle: null,
    openDelete: false,
    selectedValueNotification:null,
    images:null
  },
  action
) => {
  // const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFICATION_OPEN_DIALOG":
      // console.log("reducer notifi", action.vehicle._id);
      return {
        ...state,
        openNotifications: true,
        id: action.vehicle._id
      };
    case "NOTIFICATION_CLOSE_DIALOG":
      return { ...state, openNotifications: false, id: null,notification: "",selectedValueNotification:null };
    case "NOTIFICATION_VEHICLE_CHANGE_FIELD":
      // console.log([action.field], action.value);
      return { ...state, [action.field]: action.value };
      case "NOTIFICATION_IMAGE_VEHICLE_CHANGE_FIELD":
        // console.log([action.field], action.value.target.files);
        return { ...state, images: action.value.target.files };
    case "REQUEST_START_NOTIFICATION":
      return { ...state, loading: true };

    case "SUCCESS_NOTIFICATION":
      // console.log("request add vehicle", action.vehicle);
      return { ...state, vehicle: action.vehicle, loading: false };

    case "FAILURE_NOTIFICATION":
      // console.log("errorrrr");
      return { ...state, error: true };

    case "CONFIRM_DIALOG":
      return { ...state, openNotifications: false };
    case "RENEW_STATE_NOTIFICATION_VEHICLE":
      // console.log("renew state",state);
      return { ...state,notification: ""};
    case "REQUEST_START_NOTIFICATIONS":
      return { ...state, loading: true };
    case "SUCCESS_NOTIFICATIONS":
      // console.log("success notifications", action.notifications);
      return { ...state, notifications: action.notifications, loading: false };
    case "FAILURE_NOTIFICATIONS":
      // console.log("errorrrr");
      return { ...state, error: true };

      case "DELETE_NOTIFICATION_OPEN_DIALOG":
        // console.log("reducer id", action.id);
        return { ...state, openDelete: true, id: action.id };
        case "DELETE_NOTIFICATION_CLOSE_DIALOG":
          return { ...state, openDelete: false };
          case "SELECT_TYPE_NOTIFI_DIALOG":
            // console.log(action.value );
            return { ...state, selectedValueNotification: action.value };
          case "START_REMOVE_NOTIFICATION":
            return { ...state, loading: true };
          case "SUCCESS_REMOVE_NOTIFICATION":
            // console.log("request notification", action.notification);
            return { ...state, notification: action.notification, loading: false };
          case "FAILURE_REMOVE_NOTIFICATION":
            return { ...state, error: true };
  
          case "REMOVE_NOTIFICATION":
            // console.log("removeeeeeeee action.id",action.id);
            // console.log("state.notificationsVehicle",state);
            return {...state, notifications: state.notifications.filter(noti => noti._id !== action.id)};
    default:
      return state;
  }
};
export default reducer;
