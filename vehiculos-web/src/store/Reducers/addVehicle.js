// import qs from "query-string";
// import parse from "date-fns/parse";

const initialState = {
  brand: "",
  model: "",
  kmCurrent: "",
  kmService: "",
  state: "",
  numberPlate:"",
  internalCode: "",
  chassisNumber:"",
  type:"",
  electronicTollCollection:"",
  observation:"",
  selectedValueStore: null,
  selectedValueAssign: null,
  service:  new Date(),
  vtv: new Date(),
  route:new Date(),
  fireExtinguisher:new Date(),
  insurance:new Date(),
  warranty:new Date(),
  greenCard:new Date(),
  loading: false,
  vehicle: null,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_VEHICLE_CHANGE_FIELD":
      // console.log([action.field], action.value);
      return { ...state, [action.field]: action.value };
    case "SELECT_STORE_DIALOG":
      // console.log(action.value );
      return { ...state, selectedValueStore: action.value };
    case "SELECT_ASSIGN_DIALOG":
        // console.log(action.value );
      return { ...state, selectedValueAssign: action.value };
      case "SUCCESS_ADD_VEHICLE":
          console.log("request add vehicle",action.vehicle);
          return { ...state, vehicle: action.vehicle, loading: false };
        case "REQUEST_START_ADD_VEHICLE":
          return { ...state, loading: true };
        case "FAILURE_ADD_VEHICLE":
            console.log("errorrrr");
          return { ...state, error: true };
          case "RENEW_STATE_ADD_VEHICLE":
            // console.log("request add vehicle",action.vehicle);
            return { ...initialState };
            case "EXIT_LOADING_ERROR":
              return { ...state, loading: false };
          
    default:
      return state;
  }
};
export default reducer;

// const date = qs.parse(dates);
// const start = parse(date.startDate, "dd/MM/yyyy", new Date());
// const end = parse(date.endDate, "dd/MM/yyyy", new Date());