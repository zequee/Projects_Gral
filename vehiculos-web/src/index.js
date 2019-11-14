import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import reducer from "./store/Reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { SnackbarProvider } from "notistack";


// ****************keycloak****************
import Keycloak from "keycloak-js";
import Auth from "./utils/KeycloakAuth";
import {
  authStart,
  authSuccess,
  authError,
  roleError
} from "./store/Actions/keycloak";
import { loginUser } from "./store/Actions/user";
import axios from "./axios";

const keycloak = Keycloak(`${process.env.PUBLIC_URL}/keycloak.json`);

const setAxiosInterceptos = keycloak => {
  axios.interceptors.request.use(async config => {
    try {
      const refreshed = await keycloak.updateToken();
      if (refreshed) {
        Auth.updateSavedToken(keycloak);
      }
      config.headers.Authorization = `Bearer ${keycloak.token}`;
      return Promise.resolve(config);
    } catch (error) {
      keycloak.login();
    }
  });
};

const startApp = async store => {
  store.dispatch(authStart());
  try {
    const authenticated = await keycloak.init({
      onLoad: "login-required",
      token: localStorage.getItem("vehiculos-token"),
      refreshToken: localStorage.getItem("vehiculos-refreshToken")
    });
    if (authenticated) {
      try {
        await keycloak.updateToken();
      } catch (error) {
        return keycloak.login();
      }
      const user = Auth.getUser(keycloak);

      store.dispatch(loginUser(user));
      // if (user.roles.find(role => role === "compras")) {
      Auth.updateSavedToken(keycloak);
      setAxiosInterceptos(keycloak);
      store.dispatch(authSuccess(keycloak));
      // } else {
      //   Auth.clearSavedToken();
      //   store.dispatch(roleError());
      // }
    } else {
      return keycloak.login();
    }
  } catch (error) {
    store.dispatch(authError());
  }
};
// ****************keycloak****************

// Note: this API requires redux@>=3.1.0

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </Provider>
);

startApp(store);
ReactDOM.render(app, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();