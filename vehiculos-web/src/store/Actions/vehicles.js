// import axios from "axios";
import axios from "../../axios"
import { enqueueError } from "./notification";

export const removeVehicle = id => ({
  type: "REMOVE_VEHICLE",
  id
});

export const updateVehicleList = (vehicle,assign) => ({
  type: "UPDATE_VEHICLE_LIST",
  vehicle,
  assign
});

export const handleClickOpenDeleteVehicle = id => ({
  type: "DELETE_VEHICLE_OPEN_DIALOG",id
});

export const handleCloseDelete = () => ({
  type: "DELETE_VEHICLE_CLOSE_DIALOG"
});

//ListVehicle//////////////////////////
const request = () => ({
  type: "COSA_REQUEST"
});

const success = vehicles => ({
  type: "REQUEST_LIST_VEHICLES",
  vehicles
});

// const failure = () => ({
//   type: "COSA_FAILURE"
// });

export const requestListVehicles = () => async (dispatch, getState) => {
  dispatch(request());
  try {
    const response = await axios.get(`http://localhost:8000/vehicles`);
    // console.log("response vehicles",response);
    dispatch(success(response.data));
  } catch (error) {
    dispatch(enqueueError("No se listaron los vehiculos"));
    // dispatch(failure());
  }
};

//solo me traigo los vehiculos asigandos al usuario logueado
// export const requestListVehiclesAssignment = (userID) => async (dispatch, getState) => {
//   console.log("userID",userID);
//   dispatch(request());
//   try {
//     const response = await axios.get(`http://localhost:8000/vehicles/${userID}`);
//     // console.log("response vehicles",response);
//     dispatch(success(response.data));
//   } catch (error) {
//     dispatch(enqueueError("No se listaron los vehiculos"));
//     // dispatch(failure());
//   }
// };


const requestRemove = () => ({
  type: "REQUEST_START_REMOVE_VEHICLE"
});

const successRemove = vehicle => ({
  type: "SUCCESS_REMOVE_VEHICLE",
  vehicle
});

const failureRemove = () => ({
  type: "FAILURE_REMOVE_VEHICLE"
});


export const OnRemoveVehicle = id => async (dispatch, getState) => {
  dispatch(requestRemove());
  try {
    // console.log("id remove",id);
    dispatch(removeVehicle(id));
    const response = await axios.delete(`http://localhost:8000/vehicles/${id}`);
    dispatch(handleCloseDelete());
    dispatch(successRemove(response));
    return response.data;
  } catch (error) {
    dispatch(failureRemove());
    dispatch(enqueueError("No se pudo dar de baja el Vehiculo"));
  }
};
