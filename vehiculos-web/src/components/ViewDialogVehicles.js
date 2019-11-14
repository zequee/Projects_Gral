import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ViewVehicle from "./ViewVehicle";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getVehicle } from "../store/Reducers/viewVehicle";

function ViewDialogVechicle(props) {
  // console.log("props.vehicle",props.vehicle);
  return props.vehicle  ? (
    <Dialog
      open={props.openView}
      onClose={props.handleViewClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.vehicle.vehi ? props.vehicle.vehi.brand + " " + props.vehicle.vehi.model : ""}
      </DialogTitle>
      <DialogContent>
        <ViewVehicle vehicle={props.vehicle} />
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={props.handleViewClose} color="primary" /> */}
        <Button onClick={props.handleViewClose} color="primary" autoFocus>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}

const mapStateToProps = state => ({
  vehicle: getVehicle(state) //selector,
});

export default connect(mapStateToProps)(ViewDialogVechicle);
