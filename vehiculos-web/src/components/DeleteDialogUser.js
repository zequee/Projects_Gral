import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { OnRemoveVehicle } from "../store/Actions/vehicles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { requestListVehicles } from "../store/Actions/vehicles";
import { getVehicle } from "../store/Reducers/vehicles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";

const styles = theme => ({
  card: {
    minWidth: 500
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class DeleteDialogUser extends Component {
  componentDidMount() {
    this.props.requestListVehicles();
  }

  render() {
    const { classes } = this.props;
    // console.log("REMOVE this.props.vehicleId", this.props.vehicleId);
    // console.log("REMOVE this.props.vehicle FULL", this.props.vehicle);

    if (this.props.error)
      return <ApiError className={classes.progress} error="Error al Eliminar" />;

    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
    // return (
      <div>
        <Dialog
          open={this.props.openDelete}
          onClose={this.props.handleCloseDelete}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Desea Eliminar - {this.props.vehicle ? this.props.vehicle.brand +" "+ this.props.vehicle.model +" ["+this.props.vehicle.numberPlate +"] ?": ""}</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid xs={12} sm={3} item>
                <Card className={classes.card}></Card>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
          <Button onClick={this.props.handleCloseDelete} color="primary">
              Cancel
            </Button>
            {/* <Button onClick={props.confirm}  color="primary"> */}
            <Button
              size="small"
              onClick={() => this.props.OnRemoveVehicle(this.props.vehicleId)}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// export default AssignDialogUsers;

const mapStateToProps = state => ({
  vehicleId: state.vehicles.id,
  vehicle: getVehicle(state, state.vehicles.id),
  loading: state.vehicles.loading,
  error:state.vehicles.error,
});

const mapDispatchToProps = dispatch => ({
  OnRemoveVehicle: id => dispatch(OnRemoveVehicle(id)),

  requestListVehicles: value => dispatch(requestListVehicles(value)),

  //   addAssignmentGangOnSave: (value, IdLastAssignment,Idassign) =>
  //     dispatch(addAssignmentGangOnSave(value, IdLastAssignment,Idassign)),

  //   GetIdlastAssignment: vehicleID => dispatch(GetIdlastAssignment(vehicleID))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DeleteDialogUser));
