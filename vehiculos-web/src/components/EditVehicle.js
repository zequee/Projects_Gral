import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { requestEditGetVehicle } from "../store/Actions/editVehicle";
import { requestListStores } from "../store/Actions/stores";
// import { requestGetGang } from "../store/Actions/gangs";
import { requestListGangs } from "../store/Actions/gangs";
import { getListGangsForStore } from "../store/Reducers/gangs";
import { editVehicleOnFieldChange } from "../store/Actions/editVehicle";
import { handleChangeSingleStore } from "../store/Actions/editVehicle";
import { handleChangeSingleAssign } from "../store/Actions/editVehicle";
import { UpdateVehicle } from "../store/Actions/editVehicle";
// import { getStore } from "../store/Reducers/stores";
// import { getUserAssignment } from "../store/Reducers/users";
// import { getVehicleEdit } from "../store/Reducers/editVehicle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import ReactSelectSearch from "./ReactSelectSearch";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";

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

const currencies = [
  {
    value: "Bueno",
    label: "Bueno"
  },
  {
    value: "Malo",
    label: "Malo"
  },
  {
    value: "Regular",
    label: "Regular"
  },
  {
    value: "Reparacion",
    label: "En Reparacion"
  }
];

const currenciesBool = [
  {
    value: "Si",
    label: "Si"
  },
  {
    value: "No",
    label: "No"
  }
];

const currenciesType = [
  {
    value: "auto",
    label: "Auto"
  },
  {
    value: "camioneta",
    label: "Camioneta"
  },
  {
    value: "camion",
    label: "Camion"
  },
  {
    value: "retroexcavadora",
    label: "Retroexcavadora"
  },
  {
    value: "minicargadora",
    label: "Minicargadora [Bobcat]"
  }
];

class EditVehicle extends Component {
  async componentDidMount() {
    const VehicleIdUrl = this.props.match.params.id;
    const store = null;
    const gang = null;

    const vehiclePromise = this.props.requestEditGetVehicle(VehicleIdUrl);
    const storesPromise = this.props.requestListStores();
    const gangsPromise = this.props.requestListGangs();
    const [vehicle, stores, gangs] = await Promise.all([
      vehiclePromise,
      storesPromise,
      gangsPromise
    ]);

    // console.log("vehicles edit request", vehicle.internalCode);

    if (vehicle) {
      const store = stores.find(s => s._id === vehicle.store);
      const gang = gangs.find(g => g._id === vehicle.assign);

      this.props.handleChangeSingleStore({
        label: store ? store.name + " - " + store.type.name : "",
        value: store ? store._id : ""
      });

      this.props.handleChangeSingleAssign({
        value: gang ? gang._id : "",
        label: gang ? gang.name : "Seleccione..."
      });

      // console.log("vtv vehicle parse",parse(vehicle.vtv, "dd/MM/yyyy", new Date()));
      this.props.onFieldChange("type", vehicle.type);
      this.props.onFieldChange("hoursWorked", vehicle.hoursWorked);
      this.props.onFieldChange("numberPlate", vehicle.numberPlate);
      this.props.onFieldChange("internalCode", vehicle.internalCode);
      this.props.onFieldChange("chassisNumber", vehicle.chassisNumber);
      this.props.onFieldChange("brand", vehicle.brand);
      this.props.onFieldChange("model", vehicle.model);
      this.props.onFieldChange("kmCurrent", vehicle.kmCurrent);
      this.props.onFieldChange("kmService", vehicle.kmService);
      this.props.onFieldChange("service", vehicle.service);
      this.props.onFieldChange("vtv", vehicle.vtv);
      this.props.onFieldChange("route", vehicle.route);
      this.props.onFieldChange("fireExtinguisher", vehicle.fireExtinguisher);
      this.props.onFieldChange("insurance", vehicle.insurance);
      this.props.onFieldChange("warranty", vehicle.warranty);
      this.props.onFieldChange("greenCard", vehicle.greenCard);
      this.props.onFieldChange("electronicTollCollection",vehicle.electronicTollCollection);
      this.props.onFieldChange("state", vehicle.state);
      this.props.onFieldChange("observation", vehicle.observation);
    }
  }

  render() {
    const { classes } = this.props;

    const gangs = this.props.gangs.map(g => ({
      value: g._id,
      label: g.name
    }));

    const stores = this.props.stores.stores.map(store => ({
      value: store._id,
      label: store.name + "- " + store.type.name
    }));

    // console.log('userName',this.props.userName);
    // console.log('userID',this.props.userID);
    // console.log('vehicle',this.props.vehicle);

    if (this.props.error)
      return (
        <ApiError
          className={classes.progress}
          error="Error al Actualizar el Vehiculo"
        />
      );
    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <Card className={classes.card}>
        <CardContent>
          <Grid justify="center" container>
            <Grid xs={12} sm={6} item>
              <ReactSelectSearch
                placeholder="Seleccione Deposito"
                label="Deposito"
                options={stores}
                value={this.props.vehicle.selectedValueStore}
                onChange={this.props.handleChangeSingleStore}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <ReactSelectSearch
                placeholder="Seleccione Responsable"
                label="Responsable"
                options={gangs}
                value={this.props.vehicle.selectedValueAssign}
                onChange={this.props.handleChangeSingleAssign}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="type"
                select
                label="Tipo"
                className={classes.textField}
                value={this.props.type}
                required={true}
                onChange={e => this.props.onFieldChange("type", e.target.value)}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
              >
                {currenciesType.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="hoursWorked"
                label="Hs.Trabajadas [150]"
                disabled={
                  this.props.type !== "retroexcavadora" &&
                  this.props.type !== "minicargadora"
                }
                className={classes.textField}
                value={this.props.hoursWorked}
                onChange={e =>
                  this.props.onFieldChange("hoursWorked", e.target.value)
                }
                margin="normal"
                required={true}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="brand"
                label="Marca"
                className={classes.textField}
                value={this.props.brand}
                onChange={e =>
                  this.props.onFieldChange("brand", e.target.value)
                }
                margin="normal"
                required={true}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="model"
                label="Modelo"
                className={classes.textField}
                value={this.props.model}
                onChange={e =>
                  this.props.onFieldChange("model", e.target.value)
                }
                margin="normal"
                required={true}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="numberPlate"
                label="Dominio"
                className={classes.textField}
                value={this.props.numberPlate}
                onChange={e =>
                  this.props.onFieldChange("numberPlate", e.target.value)
                }
                margin="normal"
                required={true}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="internalCode"
                label="Nro. Interno"
                className={classes.textField}
                value={this.props.internalCode}
                onChange={e =>
                  this.props.onFieldChange("internalCode", e.target.value)
                }
                margin="normal"
                required={true}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="chassisNumber"
                label="Nro Chasis"
                className={classes.textField}
                value={this.props.chassisNumber}
                onChange={e =>
                  this.props.onFieldChange("chassisNumber", e.target.value)
                }
                margin="normal"
                required={false}
              />
            </Grid>
            
            <Grid xs={12} sm={6} item>
              <TextField
                id="kmCurrent"
                label="Km Actual [Semanal]"
                className={classes.textField}
                value={this.props.kmCurrent}
                onChange={e =>
                  this.props.onFieldChange("kmCurrent", e.target.value)
                }
                margin="normal"
                required={true}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="state"
                select
                label="Estado"
                className={classes.textField}
                value={this.props.state}
                required={true}
                onChange={e =>
                  this.props.onFieldChange("state", e.target.value)
                }
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                // helperText="Selecione estado"
                margin="normal"
              >
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <div className={classes.divider} />
            </Grid>

            <Grid xs={12} sm={6} item>
              <TextField
                id="kmService"
                label="Km Service"
                className={classes.textField}
                value={this.props.kmService}
                onChange={e =>
                  this.props.onFieldChange("kmService", e.target.value)
                }
                margin="normal"
                required={true}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="electronicTollCollection"
                select
                label="Telepeaje"
                className={classes.textField}
                value={this.props.electronicTollCollection}
                required={true}
                onChange={e =>
                  this.props.onFieldChange(
                    "electronicTollCollection",
                    e.target.value
                  )
                }
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                // helperText="Selecione..."
                margin="normal"
              >
                {currenciesBool.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid xs={12} sm={6} item>
                <KeyboardDatePicker
                  margin="normal"
                  id="service"
                  label="Service"
                  value={this.props.service}
                  onChange={date => this.props.onFieldChange("service", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <KeyboardDatePicker
                  margin="normal"
                  id="vtv"
                  label="VTV"
                  value={this.props.vtv}
                  onChange={date => this.props.onFieldChange("vtv", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <KeyboardDatePicker
                  margin="normal"
                  id="route"
                  label="Ruta"
                  value={this.props.route}
                  onChange={date => this.props.onFieldChange("route", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <KeyboardDatePicker
                  margin="normal"
                  id="fireExtinguisher"
                  label="Matafuego"
                  value={this.props.fireExtinguisher}
                  onChange={date =>
                    this.props.onFieldChange("fireExtinguisher", date)
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <KeyboardDatePicker
                  margin="normal"
                  id="insurance"
                  label="Seguro"
                  value={this.props.insurance}
                  onChange={date => this.props.onFieldChange("insurance", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <KeyboardDatePicker
                  margin="normal"
                  id="warranty"
                  label="Garantia"
                  value={this.props.warranty}
                  onChange={date => this.props.onFieldChange("warranty", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <KeyboardDatePicker
                  margin="normal"
                  id="greenCard"
                  label="Tarjeta Verde"
                  value={this.props.greenCard}
                  onChange={date => this.props.onFieldChange("greenCard", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
              <TextField
                id="observation"
                value={this.props.observation}
                onChange={e =>
                  this.props.onFieldChange("observation", e.target.value)
                }
                label="Observaciones"
                style={{ margin: 8 }}
                // placeholder="Detalle..."
                placeholder="Observaciones..."
                fullWidth
                margin="normal"
                required={true}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            </MuiPickersUtilsProvider>
            <Grid xs={12} sm={6} item>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
          variant="contained"
            size="small"
            component={Link}
            disabled={
              this.props.storeSelected === null ||
              this.props.brand === "" ||
              this.props.model === "" ||
              this.props.kmCurrent === "" ||
              this.props.service === "" ||
              this.props.vtv === "" ||
              this.props.insurance === "" ||
              this.props.state === "" || 
              this.props.numberPlate === "" ||
              this.props.internalCode === "" ||
              this.props.type === "" ||
              this.props.route === "" ||
              this.props.fireExtinguisher === "" ||
              this.props.warranty === "" ||
              this.props.greenCard === ""      
            }
            to={`/vehiculos`}
            onClick={() => this.props.UpdateVehicle(this.props.vehicle._id,this.props.userID,this.props.userName)}
          >
            Guardar
          </Button>
          {/* <Button className={classes.button} variant="contained"> 
            Guardar
          </Button> */}
          <Button
            variant="contained"
            className={classes.button}
            // component={Link}
            // to={`/vehiculos`}
            onClick={() =>this.props.history.goBack()}
          >
            Cancelar
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    vehicle: state.editVehicle,
    gangs: getListGangsForStore(state, state.editVehicle.selectedValueStore), //selector
    stores: state.stores,
    type: state.editVehicle.type,
    hoursWorked: state.editVehicle.hoursWorked,
    numberPlate: state.editVehicle.numberPlate,
    internalCode:state.editVehicle.internalCode,
    chassisNumber: state.editVehicle.chassisNumber,
    brand: state.editVehicle.brand,
    model: state.editVehicle.model,
    kmCurrent: state.editVehicle.kmCurrent,
    kmService: state.editVehicle.kmService,
    service: state.editVehicle.service,
    vtv: state.editVehicle.vtv,
    route: state.editVehicle.route,
    fireExtinguisher: state.editVehicle.fireExtinguisher,
    insurance: state.editVehicle.insurance,
    warranty: state.editVehicle.warranty,
    electronicTollCollection: state.editVehicle.electronicTollCollection,
    greenCard: state.editVehicle.greenCard,
    state: state.editVehicle.state,
    observation: state.editVehicle.observation,
    loading: state.editVehicle.loading,
    error: state.editVehicle.error,
    userID: state.user.id,
    userName: state.user.name
  };
};

const mapDispatchToProps = dispatch => ({
  UpdateVehicle: (value,userID,userName) => dispatch(UpdateVehicle(value,userID,userName)),

  onFieldChange: (field, value) =>
    dispatch(editVehicleOnFieldChange(field, value)),

  handleChangeSingleStore: value => dispatch(handleChangeSingleStore(value)),

  handleChangeSingleAssign: value => dispatch(handleChangeSingleAssign(value)),

  requestEditGetVehicle: id => dispatch(requestEditGetVehicle(id)),

  requestListStores: () => dispatch(requestListStores()),

  // requestGetGang: id => dispatch(requestGetGang(id)),

  requestListGangs: value => dispatch(requestListGangs(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditVehicle));
