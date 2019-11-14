import qs from "query-string";
import parse from "date-fns/parse";

const initialState = {
  selectedValueAssign: null,
  startDate: new Date(),
  endDate: new Date(),
  selectedValueStore: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_ASSIGNMENT_USER":
      return { ...state, selectedValueAssign: action.value };
    case "SELECT_ASSIGNMENT_STORE":
      // console.log(action.value);
      return { ...state, selectedValueStore: action.value };
    case "SEARCH_VEHICLE_CHANGE_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};
export default reducer;

export const getVehiclesAssignments = (state, userId, dates) => {
  const date = qs.parse(dates);
  const start = parse(date.startDate, "dd/MM/yyyy", new Date());
  const end = parse(date.endDate, "dd/MM/yyyy", new Date());

const vehiclesUsers = state.assignments.assignments.filter(assignment => {
  // // console.log("SIN FORMAT START",assignment.createdAt);
  // // console.log("SIN FORMAT END",assignment.updatedAt);
  // console.log("FORMAT start",new Date(assignment.createdAt));
  // console.log("FORMAT end",new Date(assignment.updatedAt));
  // console.log("assignment.endDate",assignment.endDate);
  return (
    assignment.assignUser === userId &&
    assignment.endDate != null &&
    (
      (start >= new Date(assignment.startDate) &&
      start >=  new Date(assignment.endDate)) 
      ||
      (start <= new Date(assignment.startDate) &&
      end <= new Date(assignment.endDate))
      ||
      (start <= new Date(assignment.startDate) &&
        end >= new Date(assignment.endDate))
      ||
      (start >= new Date(assignment.startDate) &&
      end <= new Date(assignment.endDate))
    )
  );
});

    return vehiclesUsers.map(vu => {
      const vehU = state.vehicles.vehicles.find(
        vehicle => vehicle._id === vu.vehicleAssign
      );
      
      return { vehiclesUsers: vu, vehU };
    });
};

export const getFilters = dates => {
  const date = qs.parse(dates);
  const start = date.startDate;
  const end = date.endDate;

  return { start, end };
};


export const getGangAssignment = (state, userId) =>
  state.gangs.gangs.find(ga => ga._id === userId);



export const getAssignment = (state, userId) => {
  const assignId = state.assignments.assignments.find(
    assign => assign.assignUser === Number(userId)
  );
  if (assignId) {
    const userAssign = state.users.find(
      user => user.id === assignId.assignUser
    );
    return { userAssign };
  } else {
    return null;
  }
};


