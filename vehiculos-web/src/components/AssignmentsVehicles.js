import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { handleChangeSingle } from "../store/Actions/assignmentVeh";
import { searchUserOnFieldChange } from "../store/Actions/assignmentVeh";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ReactSelectAssignmentVeh from "./ReactSelectAssignmentVeh";
import { Link } from "react-router-dom";
import { requestListGangs } from "../store/Actions/gangs";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";


const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 145
  }
});
// function AssignmentsVehicle(props) {
//   const classes = useStyles();
class AssignmentsVehicle extends Component {
  async componentDidMount() {
    // const assignmentsPromise = this.props.requestListAssignments();
    // const vehiclesPromise = this.props.requestListVehicles();
    // const gangsPromise = this.props.requestListGangs();
    //  await Promise.all([
    //   assignmentsPromise,
    //   vehiclesPromise,
    //   gangsPromise
    this.props.requestListGangs();
  }

  render() {
    const { classes } = this.props;
    // selectedValue: state.assignmentVeh.selectedValue,
    // console.log("selectedValue", this.props.selectedValue);

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form className={classes.root} autoComplete="off">
          {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '8vh' }} /> */}
          <Typography component="div" style={{ height: "5vh" }} />
          <FormControl className={classes.formControl}>
            <KeyboardDatePicker
              margin="normal"
              id="startDate"
              label="Fecha Inicio"
              value={this.props.startDate}
              onChange={date => this.props.onFieldChange("startDate", date)}
              // onChange={date => alert(date)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <KeyboardDatePicker
              margin="normal"
              id="endDate"
              label="Fecha Fin"
              value={this.props.endDate}
              onChange={date => this.props.onFieldChange("endDate", date)}
              // onChange={date => alert(date)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <ReactSelectAssignmentVeh />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              className={classes.button}
              disabled={!this.props.selectedValue}
              component={Link}
              to={`/Ver/Asignaciones/Vehiculo/${
                this.props.selectedValue ? this.props.selectedValue.value : null
              }?startDate=${new Date(
                this.props.startDate
              ).toLocaleDateString()}&endDate=${new Date(
                this.props.endDate
              ).toLocaleDateString()}`}
            >
              Buscar
            </Button>
          </FormControl>
        </form>
      </MuiPickersUtilsProvider>
    );
  }
}
const mapStateToProps = state => ({
  selectedValue: state.assignmentVeh.selectedValue,
  startDate: state.assignmentVeh.startDate,
  endDate: state.assignmentVeh.endDate
});

const mapDispatchToProps = dispatch => ({
  handleChangeSingle: value => dispatch(handleChangeSingle(value)),

  onFieldChange: (field, value) =>
    dispatch(searchUserOnFieldChange(field, value)),

    requestListGangs: value => dispatch(requestListGangs(value)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AssignmentsVehicle));
