import axios from "../../axios"
import { enqueueError } from "./notification";
import { getStore } from "../Reducers/stores";

///// Request List Stores////////////////
const request = () => ({
  type: "REQUEST_START_STORES"
});

const success = stores => ({
  type: "SUCCESS_STORES",
  stores
});

const failure = () => ({
  type: "FAILURE_STORES"
});

export const requestListStores = () => async dispatch => {
  dispatch(request());
  try {
    const response = await axios.get(`/depositos/api`);
    dispatch(success(response.data));
    return response.data;
  } catch (error) {
    dispatch(failure());
    dispatch(enqueueError("Error al intentar traer los depositos"));
  }
};


export const requestStoresAssignments = () => async (dispatch , getState) => {
  const  user = getState().user;
  console.log("user",user);

  dispatch(request());
  try {
    const response = await axios.get(`/depositos/api/users/${user.id}`);
    dispatch(success(response.data.stores));
    return response.data;
  } catch (error) {
    console.log("error",error);
    dispatch(failure());
    dispatch(enqueueError("Error al intentar traer los depositos"));
  }
};
