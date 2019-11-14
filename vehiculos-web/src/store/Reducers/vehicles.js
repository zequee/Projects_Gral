// import vehicles from "../../vehicles.json";
// const initialState = {
//   id: null,
//   openDelete: false,
//   // vehicles:[]
// };
// const reducer = (state = initialState, action) => {


  const reducer = (
    state = {
      id: null,
      openDelete: false,
      vehicles:[],
      loading: false,
      error: false,
    },
    action ) => {
// const reducer = (state = [], action) => {
  switch (action.type) {
    case "REQUEST_LIST_VEHICLES":
      return {...state, vehicles: action.vehicles};
    case "REMOVE_VEHICLE":
      // console.log("vehicles removeeeeeeee");
      return {...state, vehicles: state.vehicles.filter(vehicle => vehicle._id !== action.id)};
    case "UPDATE_VEHICLE_LIST":
      // console.log("action.vehicle",action.vehicle);
       return {...state, vehicles: state.vehicles.map(vehicle =>
        vehicle._id === action.vehicle
          ? { ...vehicle, assign: action.assign }
          : vehicle
      )}; 
    case "DELETE_VEHICLE_OPEN_DIALOG":
      console.log("reducer id", action.id);
      return { ...state, openDelete: true, id: action.id };
    case "DELETE_VEHICLE_CLOSE_DIALOG":
      return { ...state, openDelete: false };
      case "SUCCESS_REMOVE_VEHICLE":
          // console.log("request assignnnnn", action.vehicle);
          return { ...state, vehicle: action.vehicle, loading: false };
        case "FAILURE_REMOVE_VEHICLE":
          return { ...state, error: true };
        case "REQUEST_START_REMOVE_VEHICLE":
          return { ...state, loading: true };

    default:
      return state;
  }
};
export default reducer;

export const getVehicles = state => {
  return state.vehicles.vehicles.map(vehicle => {
    const user = state.users.find(user => {
      return user.id === vehicle.assign;
    });
    return { ...vehicle, assign: user };
  });
};

export const getVehicleAssign = (state, vehicleId) => {
  const vehId = state.assignments.assignments.find(
    assign => assign.vehicleAssign === Number(vehicleId)
  );
  if (vehId) {
    const vehicleAssign = state.vehicles.find(
      vehicle => vehicle.id === vehId.vehicleAssign
    );
    return { vehicleAssign };
  } else {
    return null;
  }
};

//listassigmentsvehicles - DeleteVehicle
export const getVehicle = (state, vehicleId) => {
  return state.vehicles.vehicles.find(vehicle => vehicle._id === vehicleId);
};

//ListVehicles valid
export const getVehiclesStore = (state, StoreId) => {
  const vehicles = state.vehicles.vehicles.filter(vehicle => vehicle.store === StoreId);
  return vehicles.filter(veh => veh.removeDate === null);
};

// db.Vehicle.vehicles.update({_id: ObjectId("5d430444665c543e801c3ca7")},{$set:{removeDate:null}})
