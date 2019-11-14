export const handleChangeSingle = value => ({
    type: "SELECT_ASSIGNMENT_VEH",
    value
  });
  export const searchUserOnFieldChange = (field, value) => ({
    type: "SEARCH_USER_CHANGE_FIELD",
    field,
    value 
  });

  

  
// import axios from "axios";
// // import { enqueueError, enqueueMessage } from "./notification";
// import { enqueueError } from "./notification";

// export const addVehicleOnFieldChange = (field, value) => ({
//   type: "ADD_VEHICLE_CHANGE_FIELD",
//   field,
//   value
// });

// export const handleChangeSingleStore = value => ({
//   type: "SELECT_STORE_DIALOG",
//   value
// });

// export const handleChangeSingleAssign = value => ({
//   type: "SELECT_ASSIGN_DIALOG",
//   value
// });

// export const addVehicleOnSave = () => async (dispatch, getState) => {
//   const { addVehicle } = getState();
//   // console.log(addVehicle);
//   try {
//     await axios.post(`http://localhost:8000/vehicles`, addVehicle);
//   } catch (error) {
//     dispatch(enqueueError("No se agrego el Vehiculo"));
//     // dispatch(error());
//     // console.log(error);
//   }
// };