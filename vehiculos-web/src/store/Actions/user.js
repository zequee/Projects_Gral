const types = { LOGIN_USER: 'LOGIN_USER' };

export const loginUser = usr => ({
  type: types.LOGIN_USER,
  user: usr
});
