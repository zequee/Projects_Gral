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
import { requestListAssignments } from "../store/Actions/assignments";
import { requestListVehicles } from "../store/Actions/vehicles";
import { requestListGangs } from "../store/Actions/gangs";
import { getGangAssignment } from "../store/Reducers/assignmentUsers";
import { getVehiclesAssignments } from "../store/Reducers/assignmentUsers";
import { getFilters } from "../store/Reducers/assignmentUsers";

// import { getAssignment } from "../store/Reducers/assignmentUsers";



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

class ListAssignmentUsers extends Component {
  async componentDidMount() {
    const assignmentsPromise = this.props.requestListAssignments();
    const vehiclesPromise = this.props.requestListVehicles();
    const gangsPromise = this.props.requestListGangs();
     await Promise.all([
      assignmentsPromise,
      vehiclesPromise,
      gangsPromise
    ]);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <div>
          <Typography variant="h6" id="tableTitle">
            ASIGNACIONES - {this.props.assignment
              ? this.props.assignment.name
              : "No Existe el Usuario"}
          </Typography>
          <Typography variant="h6" id="tableTitle">
            {this.props.search.length ? "" : "No tiene asignaciones"}
          </Typography>
          <Typography variant="subtitle1" id="tableTitle">
            Desde: {this.props.datesFilter.start} - Hasta:{" "}
            {this.props.datesFilter.end}
          </Typography>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {/* { <TableCell>ID</TableCell> */}
                  <TableCell>Responsable</TableCell>
                   {/* <TableCell>Nombre</TableCell> */}
                   {/* <TableCell>Dni</TableCell>  */}
                  <TableCell>Marca</TableCell>
                  <TableCell>Modelo</TableCell>
                  <TableCell>Dominio</TableCell>
                  <TableCell>Dia Inicio</TableCell>
                  <TableCell>Dia Fin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.search.map(vehicle => (
                  <TableRow key={vehicle.vehiclesUsers._id}>
                    {/* <TableCell>{vehicle.vehU._id}</TableCell> */}
                    <TableCell>
                      {this.props.assignment
                        ? this.props.assignment.name
                        : "-"}
                    </TableCell>
                    {/* <TableCell>
                      {this.props.assignments
                        ? this.props.assignments.userAssign.dni
                        : "-"}{" "}
                    </TableCell> */}
                    <TableCell>{vehicle.vehU.brand}</TableCell>
                    <TableCell>{vehicle.vehU.model}</TableCell>
                    <TableCell>{vehicle.vehU.numberPlate}</TableCell>
                    <TableCell>{new Date(vehicle.vehiclesUsers.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {vehicle.vehiclesUsers.createdAt
                        ? new Date(vehicle.vehiclesUsers.endDate).toLocaleDateString()
                        : "-"}
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
                to={`/Asignaciones`}
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

const mapStateToProps = (state, ownProps) => {
  return {
    assignment: getGangAssignment(state, ownProps.match.params.id), //selector
    // assignments: getAssignment(state, ownProps.match.params.id), //selector

    search: getVehiclesAssignments(
      state,
      ownProps.match.params.id,
      ownProps.location.search
    ), //selector
    datesFilter: getFilters(ownProps.location.search)
  };
};

const mapDispatchToProps = dispatch => ({

  requestListAssignments: () => dispatch(requestListAssignments()),

  requestListVehicles: value => dispatch(requestListVehicles(value)),

  requestListGangs: value => dispatch(requestListGangs(value)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListAssignmentUsers));
