import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getAssignments } from "../store/Reducers/assignmentVeh";
// import { getVehicleAssign } from "../store/Reducers/vehicles";
import { getVehicle } from "../store/Reducers/vehicles";
import { getFilters } from "../store/Reducers/assignmentVeh";
import { getStoreGang } from "../store/Reducers/stores";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { requestListVehicles } from "../store/Actions/vehicles";
import { requestListAssignments } from "../store/Actions/assignments";
import { requestListGangs } from "../store/Actions/gangs";
import { requestListStores } from "../store/Actions/stores";

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
// function ListAssignmentVehicles(props) {
//   const classes = useStyles();

class ListAssignmentVehicles extends Component {
  async componentDidMount() {
    const assignmentsPromise = this.props.requestListAssignments();
    const vehiclesPromise = this.props.requestListVehicles();
    const gangsPromise = this.props.requestListGangs();
    const storesPromise =  this.props.requestListStores()
     await Promise.all([
      assignmentsPromise,
      vehiclesPromise,
      gangsPromise,
      storesPromise
    ]);
  }

  render() {
    const { classes } = this.props;
    // console.log("this.props.search",this.props.search);

    return (
      <>
        <div>
          <Typography variant="h6" id="tableTitle">
            {this.props.vehicle
              ? "ASIGNACIONES - [ " +
                this.props.vehicle.numberPlate +
                " ] " +
                this.props.vehicle.brand +
                " " +
                this.props.vehicle.model
              : "No Existe el vehiculo"}
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
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>Responsable</TableCell>
                  <TableCell>Deposito</TableCell>
                  <TableCell>Dia Inicio</TableCell>
                  <TableCell>Dia Fin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.search.map(user => (
                  <TableRow key={user.usersAssignments._id}>
                    {/* <TableCell>{user.assign ? user.assign._id : "-"}</TableCell> */}
                    <TableCell>{user.assign ? user.assign.name : "-"}</TableCell>
                    <TableCell>{this.props.store ? this.props.store.name + " - " + this.props.store.type.name : "-"}</TableCell>
                    <TableCell>{new Date(user.usersAssignments.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {user.usersAssignments.updatedAt
                        ? new Date(user.usersAssignments.endDate).toLocaleDateString()
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

const mapStateToProps = (state, ownProps) => ({
  vehicle: getVehicle(state, ownProps.match.params.id), //selector
  datesFilter: getFilters(ownProps.location.search),
  store: getStoreGang(state, ownProps.match.params.id),
  // vehicleAssignment: getVehicleAssign(state, ownProps.match.params.id), //selector busca vehiculo asignado

  search: getAssignments(
    state,
    ownProps.match.params.id,
    ownProps.location.search
  ) //selector busca asignaciones
});

const mapDispatchToProps = dispatch => ({

  requestListVehicles: value => dispatch(requestListVehicles(value)),

  requestListAssignments: () => dispatch(requestListAssignments()),

  requestListGangs: value => dispatch(requestListGangs(value)),

  requestListStores: value => dispatch(requestListStores(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListAssignmentVehicles));
