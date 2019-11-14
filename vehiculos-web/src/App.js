import React from "react";
import "./App.css";
import { Component } from "react";
import ListStores from "./components/ListStores";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListVehicle from "./components/ListVehicle";
import Layout from "./components/UI/Layout/Layout";
import AddVehicle from "./components/AddVehicle";
import ListAssignmentVehicles from "./components/ListAssignmentVehicles";
import ListAssignmentUsers from "./components/ListAssignmentUsers";
import ViewNotificationsVehicle from "./components/ViewNotificationsVehicle";
import ListNotificationVehicle from "./components/ListNotificationVehicle";
import EditNotification from "./components/EditNotification";
import Assignments from "./components/Assignments";
import CssBaseline from "@material-ui/core/CssBaseline";
import Notifier from "./components/UI/Notifier";
import EditVehicle from "./components/EditVehicle";
import ImagesNotificationVehicle from "./components/ImagesNotificationVehicle";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        {!this.props.loading ? (
          <div>
            <Router>
              <Notifier />
              <Layout>
                {/* <VehicleForm onAddVehicle={this.handleAddVehicle} /> */}
                <Switch>
                <Route
                    path="/vehiculos/notificacion/images/:id"
                    exact
                    component={ImagesNotificationVehicle}
                  />
                <Route
                    path="/vehiculos/notificacion/editar/:id"
                    exact
                    component={EditNotification}
                  />
                <Route
                    path="/Notificaciones/vehiculos/:id"
                    exact
                    component={ListNotificationVehicle}
                  />
                  <Route
                    path="/Notificaciones"
                    exact
                    component={ViewNotificationsVehicle}
                  />
                  <Route
                    path="/vehiculos/editar/:id"
                    exact
                    component={EditVehicle}
                  />
                  <Route
                    path="/Ver/Asignaciones/Vehiculo/:id"
                    exact
                    component={ListAssignmentVehicles}
                  />
                  <Route
                    path="/Ver/Asignaciones/Usuario/:id"
                    exact
                    component={ListAssignmentUsers}
                  />
                  <Route path="/Asignaciones" exact component={Assignments} />
                  <Route path="/vehiculos/nuevo" exact component={AddVehicle} />
                  <Route
                    path="/vehiculos/store/:id"
                    exact
                    component={ListVehicle}
                  />
                  <Route path="/" component={ListStores} />
                </Switch>
              </Layout>
            </Router>
          </div>
        ) : (
          <h1>Cargando</h1>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.keycloak.loading
});

export default connect(mapStateToProps)(App);
