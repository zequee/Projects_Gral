import axios from "../../axios";
import { enqueueError } from "./notification";
import { enqueueMessage } from "./notification";
import { updateVehicleList } from "./vehicles";

export const handleClickOpen = vehicle => ({
  type: "ASSIGN_USER_OPEN_DIALOG",
  vehicle
});

export const handleClose = () => ({
  type: "ASSIGN_USER_CLOSE_DIALOG"
});

export const handleChangeSingle = value => ({
  type: "SELECT_USER_DIALOG",
  value
});

export const confirmUserVehicle = () => async (dispatch, getState) => {
  const { assignUser } = getState();
  try {
    // await axios.post("/vehicles", {
    //   vehicle: assignUser.id,
    //   user: assignUser.selectedValue
    // });
    dispatch(handleClose());
    dispatch(updateVehicleList(assignUser.id, assignUser.selectedValue.value));
  } catch (error) {
    dispatch(enqueueError("Error al intentar seleccionar el usuario"));
    // dispatch(error());
  }
  //   dispatch(handleClose());
};

const request = () => ({
  type: "REQUEST_START_ASSIGN"
});

const success = assign => ({
  type: "SUCCESS_ASSIGN",
  assign
});

const failure = () => ({
  type: "FAILURE_ASSIGN"
});

const confirmDialog = () => ({
  type: "CONFIRM_DIALOG"
});

const exitLoadingError = () => ({
  type: "EXIT_LOADING_ERROR"
});

export const addAssignmentGangOnSave = (id,IdLastAssignment,Idassign,userID,userName) => async (dispatch, getState) => {
  const { assignUser } = getState();

  // if(assignUser.selectedValue){
  //   console.log("assignUser.selectedValue.value ",assignUser.selectedValue );
  // }
  
  dispatch(request());
  try {
    if(assignUser.selectedValue.value ){
    if (Idassign !== assignUser.selectedValue.value) {
      //actualiza fecha endDate del ultimo registro de asignacion del vehiculo en la coleccion assignments,
      //cuando se reasigna un responsable al vehiculo,
      if (IdLastAssignment) {
        // console.log("IdLastAssignment adentro",IdLastAssignment)
        axios.post(`http://localhost:8000/assignment/${IdLastAssignment}`);
      }
      
      //nuevo registro de asignacion
      // const assignPromise =  axios.post(`http://localhost:8000/assignment`, assignUser);

      const assignPromise = axios.post(`http://localhost:8000/assignment`, {
        data: {
          id: assignUser.id,
          selectedValue: assignUser.selectedValue,
          store: assignUser.store,
          userName,
          userID
        }
      });

      //actualiza el responsable en la coleccion vehicles
      const vehicleIDPromise = axios.post(
        `http://localhost:8000/vehicles/gang/${id}`,
        assignUser
      );
      const response = await Promise.all([assignPromise, vehicleIDPromise]);

      dispatch(success(response));
      dispatch(confirmDialog());
      dispatch(enqueueMessage("La asignacion se realizo correctamente"));
      dispatch(
        updateVehicleList(assignUser.id, assignUser.selectedValue.value)
      );
      return response.data;
    } else {
      dispatch(enqueueError("Asignacion Vigente, Seleccione otro responsable"));
      dispatch(exitLoadingError());
      dispatch(confirmDialog());
    }
  }
  else {
    dispatch(enqueueError("Debe Seleccionar un responsable"));
    dispatch(exitLoadingError());
    dispatch(confirmDialog());
  }
  } catch (error) {
    // console.log(error);
    dispatch(failure());
    dispatch(enqueueError("No se agrego el responsable"));
  }
};
