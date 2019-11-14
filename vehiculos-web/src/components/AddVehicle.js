import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { addVehicleOnFieldChange } from "../store/Actions/addVehicle";
import { handleChangeSingleAssign } from "../store/Actions/addVehicle";
import { handleChangeSingleStore } from "../store/Actions/addVehicle";
import { addVehicleOnSave } from "../store/Actions/addVehicle";
import { requestListStores } from "../store/Actions/stores";
import { requestListGangs } from "../store/Actions/gangs";
import { getStoreActive } from "../store/Reducers/stores";
import { getListGangsForStore } from "../store/Reducers/gangs";
import NoSsr from "@material-ui/core/NoSsr";
import CancelIcon from "@material-ui/icons/Cancel";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";
// import { Link } from "react-router-dom";

// const useStyles = makeStyles(theme => ({
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
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    bottom: 6,
    fontSize: 16
  },
  divider: {
    height: theme.spacing(2)
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired
};

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool
};

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired
};

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool,
  removeProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

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

// function AddVehicle(props) {
class AddVehicle extends Component {
  async componentDidMount() {
    this.props.requestListStores();

    this.props.requestListGangs();

    // this.props.handleChangeSingleAssign({
    //   value: gang ? gang._id : "",
    //   label: gang._id ? gang.name : "Seleccione..."
    // });
  }

  render() {
    const { classes } = this.props;
    // const theme = useTheme();
    const selectStyles = {
      input: base => ({
        ...base,
        // color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    if (this.props.error) return <ApiError className={classes.progress} error="Error al Guardar el Vehiculo"/>;
    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <Card className={classes.card}>
        <CardContent>
          <Grid justify="center" container>
            <Grid xs={12} sm={6} item>
              <div className={classes.root}>
                <NoSsr>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-single"
                    required={true}
                    TextFieldProps={{
                      label: "Deposito",
                      InputLabelProps: {
                        htmlFor: "react-select-single",
                        shrink: true
                      },
                      placeholder: "Seleccione un Deposito"
                    }}
                    options={this.props.stores.map(store => ({
                      value: store._id,
                      label: store.name + " - " + store.type.name
                    }))}
                    components={components}
                    value={this.props.selectedValueStore}
                    onChange={this.props.handleChangeSingleStore}
                  />
                  <div className={classes.divider} />
                </NoSsr>
              </div>
            </Grid>
            <Grid xs={12} sm={6} item>
              <div className={classes.root}>
                <NoSsr>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-single"
                    TextFieldProps={{
                      label: "Responsable",
                      // disabled: !this.props.selectedValueStore,
                      InputLabelProps: {
                        htmlFor: "react-select-single",
                        shrink: true
                      },
                      placeholder: "Seleccione un Responsable"
                    }}
                    options={this.props.gangs.map(s => ({
                      value: s._id,
                      label: s.name
                    }))}
                    components={components}
                    value={this.props.selectedValueAssign}
                    onChange={this.props.handleChangeSingleAssign}
                  />
                  <div className={classes.divider} />
                </NoSsr>
              </div>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="slt_type"
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
                helperText="Selecione..."
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
                type="number"
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
                type="number"
              />
            </Grid>
            <Grid xs={10} sm={6} item>
              <TextField
                id="slt_estado"
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
                type="number"
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="slt_electronicTollCollection"
                select
                label="Telepeaje"
                className={classes.textField}
                value={this.props.electronicTollCollection}
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
                  required={true}
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
                  required={true}
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
                  required={true}
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
                  required={true}
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
                  required={true}
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
                  required={true}
                  label="Tarjeta Verde"
                  value={this.props.greenCard}
                  onChange={date => this.props.onFieldChange("greenCard", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              
              <Grid xs={12} sm={6} item>
              <div className={classes.divider} />
            <TextField
              id="observation"
              // label="Observaciones"
              style={{ margin: 8 }}
              value={this.props.observation}
              onChange={e =>
                this.props.onFieldChange("observation", e.target.value)
              }
              // placeholder="Detalle..."
              placeholder="Observaciones..."
              fullWidth
              margin="normal"
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
            size="small"
            variant="contained"
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
            // component={Link}
            // to={`/vehiculos/nuevo`}
            onClick={() => this.props.addVehicleOnSave(this.props.userID,this.props.userName)}
          >
            Guardar
          </Button>
          {/* <Button size="small">Guardar</Button> */}
        </CardActions>
      </Card>
    );
  }
}
const mapStateToProps = state => ({
  stores: getStoreActive(state.stores), //selector
  gangs: getListGangsForStore(state, state.addVehicle.selectedValueStore), //selector
  storeSelected: state.addVehicle.selectedValueStore,
  numberPlate:state.addVehicle.numberPlate,
  internalCode:state.addVehicle.internalCode,
  chassisNumber: state.addVehicle.chassisNumber,
  brand: state.addVehicle.brand,
  model: state.addVehicle.model,
  kmCurrent: state.addVehicle.kmCurrent,
  kmService: state.addVehicle.kmService,
  service: state.addVehicle.service,
  vtv: state.addVehicle.vtv,
  insurance: state.addVehicle.insurance,
  state: state.addVehicle.state,
  type: state.addVehicle.type,
  hoursWorked: state.addVehicle.hoursWorked,
  route: state.addVehicle.route,
  fireExtinguisher: state.addVehicle.fireExtinguisher,
  warranty: state.addVehicle.warranty,
  electronicTollCollection: state.addVehicle.electronicTollCollection,
  greenCard: state.addVehicle.greenCard,
  observation: state.addVehicle.observation,
  selectedValueAssign: state.addVehicle.selectedValueAssign,
  selectedValueStore: state.addVehicle.selectedValueStore,
  loading: state.addVehicle.loading,
  error: state.addVehicle.error,
  userID: state.user.id,
  userName: state.user.name
});

const mapDispatchToProps = dispatch => ({
  addVehicleOnSave: (userID,userName) => dispatch(addVehicleOnSave(userID,userName)),

  onFieldChange: (field, value) =>
    dispatch(addVehicleOnFieldChange(field, value)),

  handleChangeSingleAssign: value => dispatch(handleChangeSingleAssign(value)),

  handleChangeSingleStore: value => dispatch(handleChangeSingleStore(value)),

  requestListStores: value => dispatch(requestListStores(value)),

  requestListGangs: value => dispatch(requestListGangs(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddVehicle));
