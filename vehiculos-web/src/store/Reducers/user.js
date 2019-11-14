const types = { LOGIN_USER: 'LOGIN_USER' };

const reducer = (state = {}, action) => {
    switch (action.type) {
      case types.LOGIN_USER:
        return action.user;
      default:
        return state;
    }
  };
  
  export default reducer;
  