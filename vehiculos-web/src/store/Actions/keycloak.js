const types = {
  AUTH_START: "AUTH_START",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_ERROR: "AUTH_ERROR",
  ROLE_ERROR: "ROLE_ERROR"
};

export const authStart = () => ({
  type: types.AUTH_START
});

export const authSuccess = keycloak => ({
  type: types.AUTH_SUCCESS,
  keycloak
});

export const authError = () => ({
  type: types.AUTH_ERROR
});

export const roleError = () => ({
  type: types.ROLE_ERROR
});
