
import axios from "../../axios";
import { enqueueError } from "./notification";

const requestList = () => ({
    type: "REQUEST_START_ASSIGNMENTS"
  });
  
  const successList = assignments => ({
    type: "SUCCESS_ASSIGNMENTS",
    assignments
  });
  
  const failureList = () => ({
    type: "FAILURE_ASSIGNMENTS"
  });
  
  export const requestListAssignments = () => async dispatch => {
    dispatch(requestList());
    try {
      const response = await axios.get(`http://localhost:8000/assignment`);
      // console.log("response.data",response.data);
      dispatch(successList(response.data));
      return response.data;
    } catch (error) {
        // console.log("error",error);
      dispatch(failureList());
      dispatch(enqueueError("Error al consultar las asignaciones"));
    }
  };
  