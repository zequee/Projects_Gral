import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { handleChangeSingleAssign } from "../store/Actions/assignmentUsers";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ReactSelectAssignmentUsers from "./ReactSelectAssignmentUsers";
import { searchVehicleOnFieldChange } from "../store/Actions/assignmentUsers";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
// import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
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
  },
  grid: {
    width: "60%"
  }
}));
function AssignmentsUsers(props) {
  const classes = useStyles();
  // console.log(props.startDate);
  // console.log(props.endDate);

  return (
    <Grid justify="center" container>
    <Grid xs={12} sm={6} item>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form className={classes.root} autoComplete="off">
        <Typography component="div" style={{ height: "5vh" }} />
        <FormControl className={classes.formControl}>
          <KeyboardDatePicker
            margin="normal"
            id="startDate"
            label="Fecha Inicio"
            value={props.startDate}
            onChange={date => props.onFieldChange("startDate", date)}
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
            value={props.endDate}
            onChange={date => props.onFieldChange("endDate", date)}
            // onChange={date => alert(date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <ReactSelectAssignmentUsers />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            className={classes.button}
            disabled={!props.selectedValueAssign}
            component={Link}
            to={`/Ver/Asignaciones/Usuario/${
              props.selectedValueAssign ? props.selectedValueAssign.value : null
            }?startDate=${new Date(
              props.startDate
            ).toLocaleDateString()}&endDate=${new Date(
              props.endDate
            ).toLocaleDateString()}`}
          >
            Buscar
          </Button>
        </FormControl>
      </form>
    </MuiPickersUtilsProvider>
    </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  selectedValueAssign: state.assignmentUsers.selectedValueAssign,
  startDate: state.assignmentUsers.startDate,
  endDate: state.assignmentUsers.endDate
});

const mapDispatchToProps = dispatch => ({
  handleChangeSingleAssign: value => dispatch(handleChangeSingleAssign(value)),

  onFieldChange: (field, value) =>
    dispatch(searchVehicleOnFieldChange(field, value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentsUsers);
