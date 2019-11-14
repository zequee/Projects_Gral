import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AssignmentsUsers from "./AssignmentsUsers";
import AssignmentsVehicles from "./AssignmentsVehicles";
// import { requestListAssignments } from "../store/Actions/assignments";
import { requestListGangs } from "../store/Actions/gangs";
import { requestListVehicles } from "../store/Actions/vehicles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Assignments extends Component {
  
  state = {
    value: 0
  };

  async componentDidMount() {
    this.props.requestListGangs();

    this.props.requestListVehicles();
  }

  handleChange=(event, newValue) => {
    this.setState({ value: newValue })
  }

  render() {
    const { classes } = this.props;
    // const classes = useStyles();
    // const [value, setValue] = React.useState(0);

    if (this.props.error)
      return (
        <ApiError
          className={classes.progress}
          error="Error al Obtener las Asignaciones"
        />
      );
    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      // return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          href="/drafts"
        >
          <Tab label="Responsable" />
          <Tab label="Vehiculo" />
        </Tabs>

        {this.state.value === 0 && <AssignmentsUsers />}
        {this.state.value === 1 && <AssignmentsVehicles />}
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments.assignments,
  loading: state.assignments.loading,
  error: state.assignments.error
});
const mapDispatchToProps = dispatch => ({
  // requestListAssignments: () => dispatch(requestListAssignments()),

  requestListGangs: () => dispatch(requestListGangs()),

  requestListVehicles: value => dispatch(requestListVehicles(value))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Assignments))
);
