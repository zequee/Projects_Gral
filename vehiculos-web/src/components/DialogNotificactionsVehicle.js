import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ReactSelectSearch from "./ReactSelectSearch";
import { addNotificationVehicleOnSave } from "../store/Actions/notificationsVehicle";
import { handleChangeSingleNotification } from "../store/Actions/notificationsVehicle";
import { notificationVehicleOnFieldChange } from "../store/Actions/notificationsVehicle";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";
import { ImageNotificationOnFieldChange } from "../store/Actions/notificationsVehicle";
// import { FilledInput } from "@material-ui/core";
// import UploadImage from '../components/UploadImage';

const styles = theme => ({
  card: {
    minWidth: 500,
    height: 250
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
const NotificationType = [
  {
    value: "transito",
    label: "Transito"
  },
  {
    value: "averias",
    label: "Averias"
  }
];
class DialogNotificactionsVehicle extends Component {
  render() {
    const { classes } = this.props;

    // console.log("userName",this.props.userName);
    // console.log("userID",this.props.userID);
    // console.log("this.props.images",this.props.images);

    if (this.props.error)
      return <ApiError className={classes.progress} error="Error al Guardar" />;

    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <div>
        <Dialog
          open={this.props.openNotifications}
          onClose={this.props.handleCloseNotificationsVehicle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Notificaciones</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid xs={12} sm={3} item>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid justify="center" container>
                      {/* <Grid xs={12} sm={6} item> */}
                      <ReactSelectSearch
                        placeholder="Seleccione..."
                        label="Tipo Notificacion"
                        options={NotificationType}
                        value={this.props.selectedValueNotification}
                        onChange={this.props.handleChangeSingleNotification}
                      />
                      {/* </Grid> */}
                    </Grid>
                    <TextField
                      id="notification"
                      // label="Notificationes"
                      rowsMax={4}
                      multiline={true}
                      style={{ margin: 8 }}
                      value={this.props.notification}
                      disabled={!this.props.selectedValueNotification}
                      onChange={e =>
                        this.props.onFieldChange("notification", e.target.value)
                      }
                      placeholder="Detalle..."
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="inpImage"
                      type="file"
                      multiple
                      onChange={inpImage =>
                        this.props.ImageNotificationOnFieldChange(
                          "inpImage",
                          inpImage
                        )
                      }
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.handleCloseNotificationsVehicle}
              color="primary"
            >
              Cancel
            </Button>
            {/* <Button onClick={props.confirm}  color="primary"> */}
            <Button
              size="small"
              disabled={
                this.props.notification === "" ||
                this.props.notification === null ||
                this.props.notification === undefined ||
                this.props.notification === []
              }
              onClick={() =>
                this.props.addNotificationVehicleOnSave(
                  this.props.userName,
                  this.props.userID,
                  this.props.images
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

const mapStateToProps = state => ({
  //   vehicleId: state.notificationsVehicle.id,
  loading: state.notificationsVehicle.loading,
  error: state.notificationsVehicle.error,
  notification: state.notificationsVehicle.notification,
  selectedValueNotification:state.notificationsVehicle.selectedValueNotification,
  userName: state.user.name,
  userID: state.user.id,
  images: state.notificationsVehicle.images
});

const mapDispatchToProps = dispatch => ({
  onFieldChange: (field, value) =>
    dispatch(notificationVehicleOnFieldChange(field, value)),

  addNotificationVehicleOnSave: (userName, userID, images) =>
    dispatch(addNotificationVehicleOnSave(userName, userID, images)),

  handleChangeSingleNotification: value =>
    dispatch(handleChangeSingleNotification(value)),

  ImageNotificationOnFieldChange: (field, value) =>
    dispatch(ImageNotificationOnFieldChange(field, value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DialogNotificactionsVehicle));
