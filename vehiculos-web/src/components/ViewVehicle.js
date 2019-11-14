import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import BuildIcon from "@material-ui/icons/Build";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LockIcon from "@material-ui/icons/Lock";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// import PersonIcon from "@material-ui/icons/Person";
import Tooltip from "@material-ui/core/Tooltip";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import TimelineIcon from "@material-ui/icons/Timeline";
import LocalcardwashIcon from "@material-ui/icons/LocalCarWash";
import OfflinePinIcon from "@material-ui/icons/OfflinePin";
import TimerIcon from "@material-ui/icons/Timer";
import SettingsremoteIcon from "@material-ui/icons/SettingsRemote";
import CreditcardIcon from "@material-ui/icons/CreditCard";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import ViewDayIcon from "@material-ui/icons/ViewDay";
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus';
import { getStore } from "../store/Reducers/stores";
import { connect } from "react-redux";
import { requestListStores } from "../store/Actions/stores";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";
import { withRouter } from "react-router-dom";
// import Textarea from 'react-textarea-autosize';
// import parse from "date-fns/parse";

// const useStyles = makeStyles(theme => ({
const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
  fab: {
    margin: theme.spacing(2)
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
});

class ViewVehicle extends Component {
  componentDidMount() {
    // console.log("mount");
    this.props.requestListStores();
  }
  render() {
    const { classes } = this.props;

    if (this.props.error)
      return (
        <ApiError
          className={classes.progress}
          error="Error al Obtener el deposito"
        />
      );
    return this.props.loading || !this.props.store ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <div className={classes.root}>
        <div className={classes.demo}>
          <List>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Deposito" aria-label="Deposito">
                        <HomeIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      this.props.store.name + " - " + this.props.store.type.name
                    }
                  />
                </ListItem>


                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Nro Chasis" aria-label="chassisNumber">
                        <ViewDayIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      this.props.vehicle.vehi.chassisNumber
                        ? this.props.vehicle.vehi.chassisNumber
                        : "-"
                    }
                  />
                </ListItem>


                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Dominio" aria-label="Dominio">
                        <DirectionsCarIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={this.props.vehicle.vehi.numberPlate} />
                </ListItem>


                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Nro. Interno" aria-label="Nro. Interno">
                        <FilterCenterFocusIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={this.props.vehicle.vehi.internalCode ? this.props.vehicle.vehi.internalCode : "-" } />
                </ListItem>


                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Km. Actual" aria-label="Km. Actual">
                        <AvTimerIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={this.props.vehicle.vehi.kmCurrent} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Km. Service" aria-label="Km. Service">
                        <BuildIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={this.props.vehicle.vehi.kmService} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Matafuegos" aria-label="fireExtinguisher">
                        <LocalcardwashIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      this.props.vehicle.vehi.fireExtinguisher
                        ? new Date(
                            this.props.vehicle.vehi.fireExtinguisher
                          ).toLocaleDateString()
                        : "-"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip
                        title="Telepeaje"
                        aria-label="electronicTollCollection"
                      >
                        <SettingsremoteIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      this.props.vehicle.vehi
                        ? this.props.vehicle.vehi.electronicTollCollection
                        : "-"
                    }
                  />
                </ListItem>
              </Grid>
              <Grid item xs={12} md={6}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="VTV" aria-label="VTV">
                        <AssignmentIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={new Date(
                      this.props.vehicle.vehi.vtv
                    ).toLocaleDateString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Seguro" aria-label="Seguro">
                        <LockIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={new Date(
                      this.props.vehicle.vehi.insurance
                    ).toLocaleDateString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Estado" aria-label="Estado">
                        <ThumbUpIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={this.props.vehicle.vehi.state} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Hs. Trabajadas" aria-label="hoursWorked">
                        <TimerIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      this.props.vehicle.vehi.hoursWorked
                        ? this.props.vehicle.vehi.hoursWorked
                        : "-"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Ruta" aria-label="route">
                        <TimelineIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      this.props.vehicle.vehi.route
                        ? new Date(
                            this.props.vehicle.vehi.route
                          ).toLocaleDateString()
                        : "-"
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Tooltip title="Tarjeta Verde" aria-label="greenCard">
                        <CreditcardIcon />
                      </Tooltip>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      this.props.vehicle.vehi.greenCard
                        ? new Date(
                            this.props.vehicle.vehi.greenCard
                          ).toLocaleDateString()
                        : "-"
                    }
                  />
                </ListItem>
              </Grid>
            </Grid>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Tooltip title="Garantia" aria-label="warranty">
                    <OfflinePinIcon />
                  </Tooltip>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  this.props.vehicle.vehi
                    ? new Date(
                        this.props.vehicle.vehi.warranty
                      ).toLocaleDateString()
                    : "-"
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Tooltip title="Observacioness" aria-label="observation">
                    <RemoveRedEyeIcon />
                  </Tooltip>
                </Avatar>
              </ListItemAvatar>
              {/* <Textarea   rows={3} aria-label="empty textarea" placeholder="Empty"> */}
              <ListItemText
                primary={
                  this.props.vehicle.vehi.observation
                    ? this.props.vehicle.vehi.observation
                    : "-"
                }
              />
              {/* </Textarea> */}
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.stores.loading,
  error: state.stores.error,
  store: getStore(state, ownProps.match.params.id) //selector,
});

const mapDispatchToProps = dispatch => ({
  requestListStores: () => dispatch(requestListStores())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ViewVehicle))
);
