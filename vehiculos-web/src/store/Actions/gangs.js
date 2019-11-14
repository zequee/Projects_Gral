// import axios from "axios";
import axios from "../../axios";
import { enqueueError } from "./notification";

//Get Gang
const request = () => ({
  type: "COSA_REQUEST"
});

const success = gang => ({
  type: "REQUEST_GET_GANG",
  gang
});

const failure = () => ({
  type: "COSA_FAILURE"
});

export const requestGetGang = id => async dispatch => {
  dispatch(request());
  try {
    // console.log("id action", id);
    const response = await axios.get(`http://chalmers/cuadrillas/api/${id}`);
    // console.log("response.data", response.data);
    dispatch(success(response.data));
    return response.data;
  } catch (error) {
    dispatch(failure());
  }
};


//Get List Gangs
const requestList = () => ({
  type: "REQUEST_START_GANGS"
});

const successList = gangs => ({
  type: "SUCCESS_GANGS",
  gangs
});

const failureList = () => ({
  type: "FAILURE_GANGS"
});

export const requestListGangs = () => async dispatch => {
  dispatch(requestList());
  try {
    const response = await axios.get(`http://chalmers/cuadrillas/api/`);
    dispatch(successList(response.data));
    return response.data;
  } catch (error) {
    dispatch(failureList());
    dispatch(enqueueError("No se Guardo Correctamente"));
  }
};
