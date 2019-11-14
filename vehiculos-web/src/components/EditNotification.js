import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { requestGetNotification } from "../store/Actions/editNotification";
import { editNotificationOnFieldChange } from "../store/Actions/editNotification";
import { UpdateNotification } from "../store/Actions/editNotification";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";
import EditImagesNotificationVehicle from "./EditImagesNotificationVehicle";

const styles = theme => ({
  card: {
    minWidth: 275
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
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2),
    height: 80
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },

  control: {
    padding: theme.spacing(2)
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "xs"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500
  },

  input: {
    display: "flex",
    padding: 0,
    height: "auto"
  }
});

class EditNotification extends Component {
  async componentDidMount() {
    const VehicleIdUrl = this.props.match.params.id;

    const notification = await this.props.requestGetNotification(VehicleIdUrl);

    this.props.onFieldChange("notification", notification.notification);
  }

  render() {
    const { classes } = this.props;

    if (this.props.error)
      return (
        <ApiError
          className={classes.progress}
          error="Error al Actualizar la Notificacion"
        />
      );
    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <Grid container spacing={16} justify="center" className={classes.grid}>
      <Card className={classes.card}>
        <CardContent>
          <Grid justify="left" container>
            <Grid xs={12} sm={4} item>
              <TextField
                id="notification"
                label="-Editar Notificacion-"
                rowsMax={10}
                multiline={true}
                style={{ margin: 8 }}
                className={classes.textField}
                value={this.props.notification.notification}
                onChange={e =>
                  this.props.onFieldChange("notification", e.target.value)
                }
                margin="normal"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
            <Button
              size="small"
              component={Link}
              to={`/Notificaciones`}
              onClick={() => this.props.UpdateNotification(this.props.notification._id)}
            >
              Guardar
            </Button>
            <Button
              // variant="contained"
              className={classes.button}
              onClick={() =>this.props.history.goBack()}
            >
              Cancelar
            </Button>
        </CardActions>
      </Card>
      <Grid justify="center" container>
        <Grid xs={12} sm={6} item>
          <EditImagesNotificationVehicle notification={this.props.notification}/> 
        </Grid>
      </Grid>
    </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.editNotification,
    loading: state.editNotification.loading,
    error: state.editNotification.error,
    // userID: state.user.id,
    // userName: state.user.name
  };
};

const mapDispatchToProps = dispatch => ({
  requestGetNotification: id => dispatch(requestGetNotification(id)),

  onFieldChange: (field, value) =>
    dispatch(editNotificationOnFieldChange(field, value)),

  UpdateNotification: (value) =>
    dispatch(UpdateNotification(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditNotification));
