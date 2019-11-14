const reducer = (
  state = {
    loading: false,
    assignments: [],
    error: false
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_START_ASSIGNMENTS":
      return { ...state, loading: true };
    case "SUCCESS_ASSIGNMENTS":
      // console.log("request LIST assignments",action.assignments);
      return { ...state, assignments: action.assignments, loading: false };
    case "FAILURE_ASSIGNMENTS":
      return { ...state, error: true };
    default:
      return state;
  }
};
export default reducer;
