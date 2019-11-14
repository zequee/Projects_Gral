const initialState = {
  id: null,
  openView: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VIEW_VEHICLE_OPEN_DIALOG":
      // console.log("reducer view", action.vehicle._id);
      return { ...state, openView: true, id: action.vehicle._id };
    case "VIEW_VEHICLE_CLOSE_DIALOG":
      return { ...state, openView: false };
    default:
      return state;
  }
};
export default reducer;

export const getVehicle = state => {
  // console.log("state.viewVehicle.id",state.viewVehicle.id);
  if (!state.viewVehicle.id) return null;
  const vehi = state.vehicles.vehicles.find(
    vehicle => vehicle._id === state.viewVehicle.id
  );
  if(vehi){
    const user = state.gangs.gangs.find(ga => ga.id === vehi.assign);
    if (user) {
      return { vehi, user };
    } else {
      return { vehi };
    }
  }
};

export const getStoreVehicle = (state,VehicleId) => {
  if (state.stores.stores.length) {
    if (!VehicleId) return null;
    const vehi = state.vehicles.find(
      vehicle => vehicle._id === VehicleId
    );

    const store = state.stores.stores.find(st => st._id === vehi.store);
    if (store) {
      return { store };
    } else {
      return null;
    }
  }
  else{
    return []
  }
};
