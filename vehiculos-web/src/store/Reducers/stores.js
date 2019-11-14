// const reducer = (state = [], action) => {

const reducer = (
  state = {
    loading: false,
    stores: [],
    error: false
  },
  action
) => {
  switch (action.type) {
    case "SUCCESS_STORES":
      // console.log("aaaaa",action.stores);
      // return action.stores;
      // console.log("reducer stores",action.stores);
      return { ...state, stores: action.stores, loading: false };
    case "REQUEST_EDIT_GET_STORE":
      // console.log("reducer get store selected",action.store);
      // return action.store;
      return { ...state, store: action.store };
    case "REQUEST_START_STORES":
      // console.log("start");
      return { ...state, loading: true };
    case "FAILURE_STORES":
      // console.log("failure");
      return { ...state, error: true };
    default:
      return state;
  }
};
export default reducer;

//ViewVehicle
export const getStore = (state, StoreVehId) => {
  return state.stores.stores.find(st => st._id === StoreVehId);
};

//ListStores
export const getStoreActive = state => {
  if (state.stores.length) {
    return state.stores.filter(st => st.active);
  } else {
    return [];
  }
};

//listassigmentsvehicles
export const getStoreGang = (state, vehicleId) => {
  if(state.vehicles.vehicles.length){
    const veh = state.vehicles.vehicles.find(vehicle => vehicle._id === vehicleId);
    return state.stores.stores.find(st =>st._id === veh.store);
    // return store
  }
  else{
    return []
  }
};