const initialState = {
  kc: null,
  authError: false,
  roleError: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, authError: false, loading: true };
    case "AUTH_SUCCESS":
      return {
        ...state,
        kc: action.keycloak,
        authError: false,
        loading: false
      };
    case "AUTH_ERROR":
      return { ...state, authError: true, loading: false };
    case "ROLE_ERROR":
      return { ...state, roleError: true, loading: false };
    default:
      return state;
  }
};

export default reducer;
