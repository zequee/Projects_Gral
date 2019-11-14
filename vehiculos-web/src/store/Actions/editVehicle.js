// import axios from "axios";
import axios from "../../axios";
import { enqueueError } from "./notification";
import { enqueueMessage } from "./notification";

export const editVehicleOnFieldChange = (field, value) => ({
  type: "EDIT_VEHICLE_CHANGE_FIELD",
  field,
  value
});

export const handleChangeSingleStore = value => ({
  type: "SELECT_STORE_EDIT",
  value
});

export const handleChangeSingleAssign = value => ({
  type: "SELECT_ASSIGN_EDIT",
  value
});

//Request Edit Get Vehicle//////////////////////////
const request = () => ({
  type: "REQUEST_START_EDIT_GET_VEHICLE"
});

const success = vehicle => ({
  type: "SUCCESS_EDIT_GET_VEHICLE",
  vehicle
});

const failure = () => ({
  type: "FAILURE_GET_EDIT_VEHICLE"
});

export const requestEditGetVehicle = id => async (dispatch, getState) => {
  dispatch(request());
  try {
    // console.log("legueeeeeeq",id);
    const response = await axios.get(`http://localhost:8000/vehicles/${id}`);
    // console.log("response",response);
    dispatch(success(response.data));
    return response.data;
    // return {response};
  } catch (error) {
    dispatch(failure());
    dispatch(enqueueError("No se encontro el vehiculo"));
    
  }
};

export const UpdateVehicle = (id,userID,userName) => async (dispatch, getState) => {
  const { editVehicle } = getState();

  dispatch(request());
  try {
    //me traigo el vehiculo a editar
    const response = await axios.get(`http://localhost:8000/vehicles/${id}`);

    if(response){

      // console.log("VEHICLEID",id);
      // console.log("editVehicle",editVehicle);
      // console.log("response.data",response.data);
      // console.log("response.data.assign",response.data.assign);
      // // console.log("editVehicle",editVehicle);
      // console.log("editVehicle.selectedValueAssign",editVehicle.selectedValueAssign);
      // console.log("editVehicle.selectedValueStore",editVehicle.selectedValueStore);
     
      //si no tiene responsable cuando me lo traigo, y se setea un responsable en la edicion, 
      //creo registro de asignacion en la coleccion assignments

      if(response.data.assign === null){
        if(editVehicle.selectedValueAssign.value != ""){

          // console.log("voy a agregar un responsable");
          axios.post(`http://localhost:8000/assignment`, {
            data: {
              id: id,
              selectedValue: editVehicle.selectedValueAssign,
              store: editVehicle.selectedValueStore.value,
              userName,
              userID
            }
          });
        }
      }

      //guardo una copia del vehiculo como estaba (el actual) en la coleccion vehicleeditions
      // const vehicleEditPromise =  axios.post(`http://localhost:8000/vehicleEditions`,response.data);

      const vehicleEditPromise =  axios.post(`http://localhost:8000/vehicleEditions`,{

      data: {
        _id:response.data._id,
        store: response.data.store,   
        assign: response.data.assign,  
        brand: response.data.brand,
        model: response.data.model,
        kmCurrent: response.data.kmCurrent,
        kmService: response.data.kmService,
        service: response.data.service,
        vtv: response.data.vtv,
        insurance: response.data.insurance,
        state: response.data.state,
        numberPlate: response.data.numberPlate,
        internalCode: response.data.internalCode,
        type: response.data.type,
        route: response.data.route,
        fireExtinguisher: response.data.fireExtinguisher,
        warranty: response.data.warranty,
        electronicTollCollection: response.data.electronicTollCollection,
        greenCard: response.data.greenCard,
        observation: response.data.observation,
        removeDate: response.data.removeDate,
        hoursWorked: response.data.hoursWorked,
        chassisNumber: response.data.chassisNumber,
        userName,
        userID
      }
    });


      //actualizo el vehiculo en la coleccion vehicle
      const VehiclePromise= axios.post(`http://localhost:8000/vehicles/${id}`, editVehicle);
      const [vehicleEdit]=await Promise.all([vehicleEditPromise,VehiclePromise]);
      // const [vehicleEdit, vehicleP]  = await Promise.all([vehicleEditPromise,VehiclePromise]);
      // console.log("vehicleEdit",vehicleEdit);
      
      dispatch(success(vehicleEdit.data));
      dispatch(enqueueMessage("El Vehiculo se actualizo correctamente"));
      return vehicleEdit.data;
    }    
  } catch (error) {
    dispatch(failure());
    dispatch(enqueueError("No se actualizo el Vehiculo"));
  }
};



// response = await axios.get(
//   `https://servicios.gralsaneamiento.com.ar/auth/admin/realms/master/users/${
//     req.params.userId
//   }`,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }
// );