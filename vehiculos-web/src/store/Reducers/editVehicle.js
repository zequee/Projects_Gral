
const initialState = {
  selectedValueStore: null,
  selectedValueAssign:null,
  error:null,
  loading:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_START_EDIT_GET_VEHICLE":
      // console.log("start");
        return { ...state, loading: true };
    case "SUCCESS_EDIT_GET_VEHICLE":
      // console.log("action vehicle",action.vehicle);
      return { ...state, ...action.vehicle,loading: false };
        case "FAILURE_GET_EDIT_VEHICLE":
            // console.log("errorrrr");
          return { ...state, error: true };
    // case "REQUEST_EDIT_GET_STORE":
    //   // console.log("action vehicle REQUEST",action.store);
    //   return action.store;
    case "EDIT_VEHICLE_CHANGE_FIELD":
      // console.log([action.field], action.value);
      return { ...state, [action.field]: action.value };
    case "SELECT_STORE_EDIT":
      // console.log("SELECT_STORE_EDIT",action.value.label);
      return { ...state, selectedValueStore: action.value };
    case "SELECT_ASSIGN_EDIT":
      // console.log("reducer edit vehi",action.value);
      return { ...state, selectedValueAssign: action.value };
  
    // case "ASSIGN_USER_OPEN_DIALOG":
    //   return {
    //     ...state,
    //     open: true,
    //     id: action.vehicle.id,
    //     selectedValueAssign: action.vehicle.assign
    //       ? {
    //           value: action.vehicle.assign.id,
    //           name: action.vehicle.assign.name + action.vehicle.assign.lastName,
    //           label:
    //             "[" +
    //             action.vehicle.assign.dni +
    //             "]" +
    //             action.vehicle.assign.name +
    //             " " +
    //             action.vehicle.assign.lastName
    //         }
    //       : null
    //   };
    default:
      return state;
  }
};
export default reducer;

export const getStore = (state, StoreVehId) => {
  // console.log("state editVehicle", state.editVehicle);
  // console.log("StoreVehId", StoreVehId);
  const p = state.editVehicle.find(st => st._id === StoreVehId);
  // console.log("get store", p);
  return { p };
};
