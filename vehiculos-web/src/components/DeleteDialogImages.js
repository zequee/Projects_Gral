import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { OnRemoveImageNotification } from "../store/Actions/editNotification";
// import { requestListNotifications } from "../store/Actions/notificationsVehicle";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
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

class DeleteDialogImages extends Component {
  componentDidMount() {
    // this.props.requestListNotifications();
  }

  render() {
    const { classes } = this.props;

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
          <DialogTitle id="form-dialog-title">Desea Eliminar la imagen? {this.props.imageID ? this.props.imageID.replace(`${process.env.REACT_APP_BACKEND_URI}//ImagesNotifications/`, ""):""}</DialogTitle>
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
              onClick={() => this.props.OnRemoveImageNotification(this.props.notification._id,this.props.imageID.replace("/ImagesNotifications/", ""))}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notificationID: state.editNotification._id,
  imageID: state.editNotification.imageID,
  loading: state.editNotification.loading,
  error:state.editNotification.error,
});

const mapDispatchToProps = dispatch => ({
  OnRemoveImageNotification: (id,imageID) => dispatch(OnRemoveImageNotification(id,imageID.replace(`${process.env.REACT_APP_BACKEND_URI}/`, ""))),

    // requestListNotifications: value => dispatch(requestListNotifications(value)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DeleteDialogImages));
