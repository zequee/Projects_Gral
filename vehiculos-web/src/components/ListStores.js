import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import { requestListStores } from "../store/Actions/stores";
import { requestStoresAssignments } from "../store/Actions/stores";
import { getStoreActive } from "../store/Reducers/stores";
// import { getVehiclesStore } from "../store/Reducers/vehicles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";

  const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140
  },
  control: {
    padding: theme.spacing(2)
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
  }
});

  class ListStores extends Component{

  componentDidMount() {

    this.props.requestStoresAssignments({
      stores: this.props.store
    });

    // this.props.requestListStores({
    //   stores: this.props.store
    // });
  }

  render() {

  const {spacing} = this.props;
  const { classes } = this.props;
  // console.log("roles",this.props.roles);

  // return (
    if (this.props.error) return <ApiError className={classes.progress} error="Error al Obtener los depositos"/>;

    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
    <Grid container spacing={spacing}>
      {this.props.stores.map(store => (
        
        <Grid xs={12} sm={3} key={store._id} item>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                variant="h6"
                className={classes.pos}
                color="textSecondary"
                gutterBottom
                align="center"
              >
                {store.name}
              </Typography>
              <Typography
                variant="h6"
                className={classes.pos}
                color="textSecondary"
                gutterBottom
                align="center"
              >
                {store.type.name}
              </Typography>
            </CardContent>
            <CardActions>
            {/* <Button size="small" onClick={() => props.OnListVehicles()} >Guardar</Button> */}
            {/* /* <IconButton align=" center" component={Link} to={`/vehiculos/${vehicle.id}/asignar`}> */} 
              {/* <Button size="small" component={Link} to="/Vehiculos"> */}
              <Button size="small" component={Link} to={`/Vehiculos/store/${store.id}`}>
              {/* <Button size="small" component={Link} to={`/Vehiculos/'5d42f464a06b2e001dcd66ec'`}> */}
                Listado
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
}
const mapStateToProps = state => ({
  stores: state.stores.stores,
  // stores: getStoreActive(state.stores), //selector
  // vehicles: getVehiclesStore(state.vehicles, ownProps.match.params.id), //selector
  loading: state.stores.loading,
  error: state.stores.error,
  roles: state.user.roles,
});

const mapDispatchToProps = dispatch => ({

  // requestListStores: value => dispatch(requestListStores(value))

  requestStoresAssignments: value => dispatch(requestStoresAssignments(value))
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ListStores));


