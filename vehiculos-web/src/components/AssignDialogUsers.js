import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import ReactSelectUsers from "./ReactSelectUsers";
import { confirmUserVehicle } from "../store/Actions/assignUser";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { addAssignmentGangOnSave } from "../store/Actions/assignUser";
import { GetIdlastAssignment } from "../store/Reducers/assignUser";
import { GetGangAssignment } from "../store/Reducers/gangs";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";

// const useStyles = makeStyles(theme => ({
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

class AssignDialogUsers extends Component {
  
  render() {
   
    const { classes } = this.props;

    if (this.props.error)
      return <ApiError className={classes.progress} error="Error al Guardar" />;

    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Asignacion</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid xs={12} sm={3} item>
                <Card className={classes.card}>
                  <CardContent>
                    <ReactSelectUsers />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            {/* <Button onClick={props.confirm}  color="primary"> */}
            <Button
              size="small"
              onClick={() =>
                this.props.addAssignmentGangOnSave(
                  this.props.vehicleId,
                  this.props.IdLastAssignment
                    ? this.props.IdLastAssignment._id
                    : null,
                  this.props.Idassign 
                  ? this.props.Idassign.assign
                  : null,
                  this.props.userID,
                  this.props.userName
                )
              }
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
  vehicleId: state.assignUser.id,
  Idassign: GetGangAssignment(state, state.assignUser.id),
  loading: state.assignUser.loading,
  error: state.assignUser.error,
  IdLastAssignment: GetIdlastAssignment(state, state.assignUser.id),
  userName: state.user.name,
  userID: state.user.id
});

const mapDispatchToProps = dispatch => ({
  confirm: () => dispatch(confirmUserVehicle()),

  addAssignmentGangOnSave: (value, IdLastAssignment,Idassign,userName,userID) =>
    dispatch(addAssignmentGangOnSave(value, IdLastAssignment,Idassign,userName,userID)),

  GetIdlastAssignment: vehicleID => dispatch(GetIdlastAssignment(vehicleID))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AssignDialogUsers));
