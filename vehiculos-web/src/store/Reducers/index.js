import { combineReducers } from "redux";
import vehicles from "./vehicles";
import stores from "./stores";
import addVehicle from "./addVehicle";
import user from "./user";
import assignUser from "./assignUser";
import notification from "./notification";
import viewVehicle from "./viewVehicle";
import assignmentUsers from "./assignmentUsers";
import assignmentVeh from "./assignmentVeh";
import assignments from "./assignments";
import editVehicle from "./editVehicle";
import notificationsVehicle from "./notificationsVehicle";
import viewNotificationsVehicle from "./viewNotificationsVehicle";
import editNotification from "./editNotification";
import gangs from "./gangs";
import keycloak from "./keycloak";

export default combineReducers({
  vehicles,
  stores,
  addVehicle,
  user,
  assignUser,
  notification,
  viewVehicle,
  assignmentUsers,
  assignmentVeh,
  assignments,
  editVehicle,
  gangs,
  keycloak,
  notificationsVehicle,
  viewNotificationsVehicle,
  editNotification
});
