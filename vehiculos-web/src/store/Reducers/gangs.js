const reducer = (
  state = {
    loading: false,
    gangs: [],
    error: false
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_GET_GANG":
      // console.log("request gang",action.gang);
      return { ...state, gangs: action.gang };
    case "SUCCESS_GANGS":
      // console.log("request LIST gangs",action.gangs);
      return { ...state, gangs: action.gangs, loading: false };
    case "REQUEST_START_GANGS":
      return { ...state, loading: true };
    case "FAILURE_GANGS":
      return { ...state, error: true };
    default:
      return state;
  }
};
export default reducer;

//ListVehicle
export const getGangsVehicles = (state, StoreId) => {
  const vehicles = state.vehicles.vehicles.filter(
    vehicle => vehicle.store === StoreId
  );
  // console.log("vehicles", vehicles);
  return state.gangs.gangs.length
    ? vehicles.map(ve => {
        return ve.assign
          ? state.gangs.gangs.find(ga => ga._id === ve.assign)
          : null;
      })
    : [];
};

//AddVehicle - EditVehicle
export const getListGangsForStore = (state, StoreId) => {
  // console.log("StoreId", StoreId);
  if (StoreId) {
    const store = state.stores.stores.find(st => st._id === StoreId.value);
    if (store) {
      return store.gangs.length
        ? store.gangs.map(st => {
            return state.gangs.gangs.find(ga => ga._id === st);
          })
        : [];
    } else return [];
  } else return [];
};

//ReactSelectUsers
export const getListGangsForAStore = (state, StoreId) => {
  if (state.stores.stores.length) {
    if (StoreId) {
      const store = state.stores.stores.find(st => st._id === StoreId);
      return store.gangs.length
        ? store.gangs.map(st => {
            return state.gangs.gangs.find(ga => ga._id === st);
          })
        : [];
    } else return [];
  } else return [];
};

export const GetGangAssignment = (state, VehicleId) => {
  if (VehicleId) {
    return state.vehicles.vehicles.find(veh => veh._id === VehicleId);
  }
};
