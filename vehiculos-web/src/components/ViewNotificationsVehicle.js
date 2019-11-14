import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { requestListVehicles } from "../store/Actions/vehicles";
import { handleChangeSingle } from "../store/Actions/viewNotificationsVehicle";
import { searchOnFieldChange } from "../store/Actions/viewNotificationsVehicle";
import { handleChangeSingleNotification } from "../store/Actions/notificationsVehicle";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ReactSelectSearch from "./ReactSelectSearch";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  formControl: {
    marginBottom: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(3)
  },
  select: { marginTop: 16 },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 145
  },
  grid: {
    minHeight: 500
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
class ViewNotificationsVehicle extends Component {
  async componentDidMount() {
    this.props.requestListVehicles();
  }

  render() {
    // console.log("this.props.selectedValueNotification",this.props.selectedValueNotification);
    // console.log("this.props.selectedValue",this.props.selectedValue);


    const { classes } = this.props;

    const vehicles = this.props.vehicles.vehicles.filter(
      v => v.removeDate === null
    );

    const vehiclesActive = vehicles.map(veh => ({
      value: veh._id,
      label: "[" + veh.numberPlate + "]" + veh.brand + " " + veh.model
    }));

    if (this.props.error)
      return (
        <ApiError
          className={classes.progress}
          error="Error al buscar el vehiculo"
        />
      );
    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <Grid container spacing={16} justify="center" className={classes.grid}>
        <Grid item xs={12} md={5}>
          <Paper className={classes.root}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ReactSelectSearch
                placeholder="Seleccione Vehiculo"
                label="Vehiculo"
                options={vehiclesActive}
                value={this.props.selectedValue}
                onChange={this.props.handleChangeSingle}
              />
              <ReactSelectSearch
                placeholder="Seleccione..."
                label="Tipo Notificacion"
                options={NotificationType}
                value={this.props.selectedValueNotification}
                onChange={this.props.handleChangeSingleNotification}
              />
              <FormControl fullWidth className={classes.formControl}>
                <KeyboardDatePicker
                  margin="normal"
                  id="startDate"
                  label="Fecha Inicio"
                  value={this.props.startDate}
                  onChange={date => this.props.onFieldChange("startDate", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <KeyboardDatePicker
                  margin="normal"
                  id="endDate"
                  label="Fecha Fin"
                  value={this.props.endDate}
                  onChange={date => this.props.onFieldChange("endDate", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </FormControl>
              <Button
                variant="contained"
                disabled={this.props.selectedValue === null && 
                  this.props.selectedValueNotification === null}
                component={Link}
                className={classes.button}
                to={`/Notificaciones/vehiculos/${
                  this.props.selectedValue
                    ? this.props.selectedValue.value
                    : null
                }?startDate=${new Date(
                  this.props.startDate
                ).toLocaleDateString()}&endDate=${new Date(
                  this.props.endDate
                ).toLocaleDateString()}&type=${
                  this.props.selectedValueNotification
                    ? this.props.selectedValueNotification.value
                    : null
                }
                  `}
              >
                Buscar
              </Button>
            </MuiPickersUtilsProvider>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  vehicles: state.vehicles,
  selectedValue: state.viewNotificationsVehicle.selectedValue,
  selectedValueNotification: state.notificationsVehicle.selectedValueNotification,
  startDate: state.viewNotificationsVehicle.startDate,
  endDate: state.viewNotificationsVehicle.endDate
});

const mapDispatchToProps = dispatch => ({
  handleChangeSingle: value => dispatch(handleChangeSingle(value)),

  onFieldChange: (field, value) => dispatch(searchOnFieldChange(field, value)),

  requestListVehicles: value => dispatch(requestListVehicles(value)),

  handleChangeSingleNotification: value =>
    dispatch(handleChangeSingleNotification(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ViewNotificationsVehicle));
