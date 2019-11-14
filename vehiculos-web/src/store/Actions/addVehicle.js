import axios from "axios";
// import { enqueueError, enqueueMessage } from "./notification";
import { enqueueError } from "./notification";
import { enqueueMessage } from "./notification";

export const addVehicleOnFieldChange = (field, value) => ({
  type: "ADD_VEHICLE_CHANGE_FIELD",
  field,
  value
});

export const handleChangeSingleStore = value => ({
  type: "SELECT_STORE_DIALOG",
  value
});

export const handleChangeSingleAssign = value => ({
  type: "SELECT_ASSIGN_DIALOG",
  value
});

const requestAddVehicle = () => ({
  type: "REQUEST_START_ADD_VEHICLE"
});

const successAddVehicle = vehicle => ({
  type: "SUCCESS_ADD_VEHICLE",
  vehicle
});

const failureAddVehicle = () => ({
  type: "FAILURE_ADD_VEHICLE"
});

const renewState = () => ({
  type: "RENEW_STATE_ADD_VEHICLE"
});

const exitLoadingError = () => ({
  type: "EXIT_LOADING_ERROR"
});


export const addVehicleOnSave = (userID,userName) => async (dispatch, getState) => {
  const { addVehicle } = getState();

  const vehicle = await axios.get(`http://localhost:8000/vehicles`);

  const numberPlate = vehicle.data.find(np => np.numberPlate === addVehicle.numberPlate)
  const internalCode = vehicle.data.find(ic => Number(ic.internalCode) === Number(addVehicle.internalCode))

  // console.log("numberPlate",numberPlate);
  // console.log("internalCode",internalCode);


  // if(numberPlate === undefined){
  //   console.log(" NO existe numberPlate");
  // }
  // else{
  //   console.log("Existe numberPlate");
  // }

  // if(internalCode === undefined){
  //   console.log("No existe internalCode");
  // }
  // else{
  //   console.log("Existe internalCode");
  // }
  // console.log("request vechiel add",vehicle.data)

  dispatch(requestAddVehicle());
  try {

    if(numberPlate === undefined && internalCode === undefined ){
    // const response = await axios.post(`http://localhost:8000/vehicles`,addVehicle);
    const response = await axios.post(`http://localhost:8000/vehicles`,{
    data: {
      selectedValueStore: addVehicle.selectedValueStore,
      selectedValueAssign: addVehicle.selectedValueAssign,
      brand: addVehicle.brand,
      model: addVehicle.model,
      kmCurrent: addVehicle.kmCurrent,
      kmService: addVehicle.kmService,
      service: addVehicle.vtv,
      vtv: addVehicle.vtv,
      insurance: addVehicle.insurance,
      state: addVehicle.state,
      numberPlate: addVehicle.numberPlate,
      internalCode: addVehicle.internalCode,
      chassisNumber:addVehicle.chassisNumber,
      hoursWorked: addVehicle.hoursWorked,
      type: addVehicle.type,
      route: addVehicle.route,
      fireExtinguisher: addVehicle.fireExtinguisher,
      warranty: addVehicle.warranty,
      electronicTollCollection: addVehicle.electronicTollCollection,
      greenCard: addVehicle.greenCard,
      observation: addVehicle.observation,
      removeDate: addVehicle.removeDate,
      userName,
      userID
    }
  });
    // console.log("response", response);
    // console.log("response.data", response.data);
    dispatch(successAddVehicle(response.data));
    dispatch(renewState());
    dispatch(enqueueMessage("Se agrego el Vehiculo correctamente"));
    return response.data;

  } else {
    dispatch(enqueueError("Dominio o Nro interno existente"));
    dispatch(exitLoadingError());
    // dispatch(confirmDialog());
  }
  } catch (error) {
    dispatch(failureAddVehicle());
    dispatch(enqueueError("No se agrego el Vehiculo"));
    // dispatch(error());
    console.log(error);
  }
};
