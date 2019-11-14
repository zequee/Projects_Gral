import qs from "query-string";
import parse from "date-fns/parse";

const initialState = {
  selectedValue: null,
  startDate: new Date(),
  endDate: new Date()
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_ASSIGNMENT_VEH":
      // console.log("reducer selectedvalue",action.value)
      return { ...state, selectedValue: action.value };
    case "SEARCH_USER_CHANGE_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};
export default reducer;

export const getAssignments = (state, vehicleId, dates) => {
  const date = qs.parse(dates);
  const start = parse(date.startDate, "dd/MM/yyyy", new Date());
  const end = parse(date.endDate, "dd/MM/yyyy", new Date());

  // const usersAssignments = state.assignments.assignments.filter(
  //   assignment =>
  //     assignment.vehicleAssign === vehicleId &&
  //     ((start >= new Date(assignment.createdAt) &&
  //       start <=  new Date(assignment.updatedAt)) ||
  //       (start <= new Date(assignment.createdAt) &&
  //         end >= new Date(assignment.createdAt)))
  // );

  const usersAssignments = state.assignments.assignments.filter(
    assignment =>
      assignment.vehicleAssign === vehicleId &&
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

  return usersAssignments.map(vu => {
    const assign = state.gangs.gangs.find(gang => gang._id === vu.assignUser);
    return { usersAssignments: vu, assign };
  });
};

export const getFilters = dates => {
  const date = qs.parse(dates);
  const start = date.startDate;
  const end = date.endDate;

  return { start, end };
};
