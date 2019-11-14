import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { getVehicle } from "../store/Reducers/vehicles";
import { getFilters } from "../store/Reducers/viewNotificationsVehicle";
import { requestListVehicles } from "../store/Actions/vehicles";
import { requestListNotifications } from "../store/Actions/notificationsVehicle";
import { getNotifications } from "../store/Reducers/viewNotificationsVehicle";
import { requestListStores } from "../store/Actions/stores";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { handleClickOpenDeleteNotification } from "../store/Actions/notificationsVehicle";
import DeleteDialogNotification from "./DeleteDialogNotification";
import { handleCloseDelete } from "../store/Actions/notificationsVehicle";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
});

class ListNotificationVehicle extends Component {
  async componentDidMount() {
    const vehiclesPromise = this.props.requestListVehicles();
    const notificationsPromise = this.props.requestListNotifications();
    const storesPromise = this.props.requestListStores();
    await Promise.all([vehiclesPromise, notificationsPromise, storesPromise]);
  }

  render() {
    const { classes } = this.props;

    if (this.props.error)
      return (
        <ApiError
          className={classes.progress}
          error="Error al buscar las Notificaciones"
        />
      );
    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <>
        <DeleteDialogNotification
          openDelete={this.props.openDelete}
          handleCloseDelete={this.props.handleCloseDelete}
        />
        <div>
          <Typography variant="h6" id="tableTitle">
            {this.props.vehicle
              ? "NOTIFICACIONES - [ " +
                this.props.vehicle.numberPlate +
                " ] " +
                this.props.vehicle.brand +
                " " +
                this.props.vehicle.model
              : "No Existe el vehiculo"}
          </Typography>
          <Typography variant="h6" id="tableTitle">
            {this.props.search.length ? "" : "No tiene notificaciones"}
          </Typography>
          <Typography variant="subtitle1" id="tableTitle">
            Desde: {this.props.datesFilter.start} - Hasta:{" "}
            {this.props.datesFilter.end}
          </Typography>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>Creador</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Notificacion</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Fotos</TableCell>
                  <TableCell>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.search.map(noti => (
                  <TableRow key={noti._id}>
                    {/* <TableCell>{user.assign ? user.assign._id : "-"}</TableCell> */}
                    <TableCell>{noti.userName ? noti.userName : "-"}</TableCell>
                    <TableCell>
                      {new Date(noti.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{noti.notification}</TableCell>
                    <TableCell>{noti.type ? noti.type : "-"}</TableCell>
                    <TableCell padding="none">
                      <IconButton
                        // align=" center"
                        component={Link}
                        to={`/vehiculos/notificacion/editar/${noti._id}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell padding="none">
                      <IconButton
                        // align=" center"
                        component={Link}
                        to={`/vehiculos/notificacion/images/${noti._id}`}
                      >
                        <PhotoCameraIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell padding="none">
                      <IconButton
                        //disabled={vehicle.state !== "Malo"}
                        align=" center"
                        onClick={() =>
                          this.props.handleClickOpenDeleteNotification(noti._id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div align="right">
              <Button
                variant="contained"
                className={classes.button}
                component={Link}
                to={`/Notificaciones`}
              >
                Volver
              </Button>
            </div>
          </Paper>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  vehicle: getVehicle(state, ownProps.match.params.id), //selector
  datesFilter: getFilters(ownProps.location.search),
  loading: state.notificationsVehicle.loading,
  error: state.notificationsVehicle.error,
  openDelete: state.notificationsVehicle.openDelete,
  search: getNotifications(
    state,
    ownProps.match.params.id,
    ownProps.location.search
  )
});

const mapDispatchToProps = dispatch => ({
  requestListVehicles: value => dispatch(requestListVehicles(value)),

  requestListNotifications: value => dispatch(requestListNotifications(value)),

  requestListStores: value => dispatch(requestListStores(value)),

  handleClickOpenDeleteNotification: id =>
    dispatch(handleClickOpenDeleteNotification(id)),

  handleCloseDelete: () => dispatch(handleCloseDelete())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListNotificationVehicle));
