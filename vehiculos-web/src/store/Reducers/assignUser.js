const initialState = {
  id: null,
  open: false,
  selectedValue: null,
  store: null,
  loading: false,
  error: false,
  assign: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ASSIGN_USER_OPEN_DIALOG":
      // console.log("selectedValue reducer",action.vehicle.assign);
      return {
        ...state,
        open: true,
        id: action.vehicle._id,
        selectedValue: action.vehicle.assign,
        store: action.vehicle.store
      };
    // return {
    //   ...state,
    //   open: true,
    //   id: action.vehicle._id,
    //   selectedValue: action.vehicle.assign
    //     ? {
    //         value: action.vehicle.assign.id,
    //         name: action.vehicle.assign.name + action.vehicle.assign.lastName,
    //         label:
    //           "[" + action.vehicle.assign.dni +"]" +action.vehicle.assign.name +" " + action.vehicle.assign.lastName
    //       }
    //     : null
    // };
    case "ASSIGN_USER_CLOSE_DIALOG":
      return { ...state, open: false, id: null };
    case "SELECT_USER_DIALOG":
      // console.log("selectedValue",action.value);
      return { ...state, selectedValue: action.value };
    case "SUCCESS_ASSIGN":
      // console.log("request assignnnnn", action.assign);
      return { ...state, assign: action.assign, loading: false };
    case "CONFIRM_DIALOG":
      // console.log("selectedValue",action.value);
      return { ...state, open: false };
    case "FAILURE_ASSIGN":
      return { ...state, error: true };
    case "REQUEST_START_ASSIGN":
      return { ...state, loading: true };
    
      case "EXIT_LOADING_ERROR":
        return { ...state, loading: false };
    
    // case "UPDATE_LIST_VEHICLES":
    //     console.log("action.vehicle",action.vehicle);
    // return state.vehicles.map(vehicle =>
    //   vehicle.id === action.vehicle
    //     ? { ...vehicle, assign: action.assign }
    //     : vehicle
    // );
    default:
      return state;
  }
};
export default reducer;

export const GetIdlastAssignment = (state, VehicleId) => {
  const assignments = state.assignments.assignments.filter(
    as => as.vehicleAssign === VehicleId
  );
  const lastAssignment = assignments.pop();
  if(lastAssignment){
    // console.log("lastAssignment", lastAssignment._id);
    return  lastAssignment ;
  }
  
};
