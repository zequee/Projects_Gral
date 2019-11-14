import qs from "query-string";
import parse from "date-fns/parse";
// import format from "date-fns/format";

const initialState = {
  selectedValue: null,
  startDate: new Date(),
  endDate: new Date()
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_VEHICLE":
      // console.log("reducer selectedvalue", action.value);
      return { ...state, selectedValue: action.value };
    case "SEARCH_CHANGE_FIELD":
      // console.log("action.value", action.value);
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};
export default reducer;

export const getNotifications = (state, vehicleId, params) => {
  const pms = qs.parse(params);
  const start = parse(pms.startDate, "dd/MM/yyyy", new Date());
  const end = parse(pms.endDate, "dd/MM/yyyy", new Date());
  end.setDate(end.getDate() + 1);
  const typeNotification=pms.type;

  // console.log("typeNotification",typeNotification);


  if(typeNotification != null){

  }
  const viewNotifications = state.notificationsVehicle.notifications.filter(
    notification => {

      // console.log(new Date(start) <= new Date(notification.startDate));
      // console.log(new Date(end) >= new Date(notification.startDate));

      return (
          (notification.vehicleAssign === vehicleId &&
            notification.endDate === null) &&
            (notification.type.toString() === typeNotification) &&
            (new Date(start) <= new Date(notification.startDate) &&
              new Date(end) >= new Date(notification.startDate))
      );
    }
  );
  // console.log("viewNotifications", viewNotifications);
  return viewNotifications;
};

export const getFilters = params => {
  const pms = qs.parse(params);
  const start = pms.startDate;
  const end = pms.endDate;

  return { start, end };
};
