import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { removeVehicle } from "../store/Actions/vehicles";
// import { updateVehicleList } from "../store/Actions/vehicles";
// import { OnRemoveVehicle } from "../store/Actions/vehicles";
import { handleClickOpen } from "../store/Actions/assignUser";
import { handleClose } from "../store/Actions/assignUser";
import { handleClickViewOpen } from "../store/Actions/viewVehicle";
import { requestListVehicles } from "../store/Actions/vehicles";
// import { requestListVehiclesAssignment } from "../store/Actions/vehicles";
import { requestListGangs } from "../store/Actions/gangs";
import { requestListStores } from "../store/Actions/stores";
import { handleClickOpenDeleteVehicle } from "../store/Actions/vehicles";
import { handleClickOpenNotificactionVehicle } from "../store/Actions/notificationsVehicle";
import { handleCloseNotificationsVehicle } from "../store/Actions/notificationsVehicle";
import { handleViewClose } from "../store/Actions/viewVehicle";
import { handleCloseDelete } from "../store/Actions/vehicles";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ShowIcon from "@material-ui/icons/RemoveRedEye";
import DeleteIcon from "@material-ui/icons/Delete";
import Autorenew from "@material-ui/icons/Autorenew";
import EditIcon from "@material-ui/icons/Edit";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import AssignDialogUser from "./AssignDialogUsers";
import DeleteDialogUser from "./DeleteDialogUser";
// import { getVehicles } from "../store/Reducers/vehicles";
import { getVehiclesStore } from "../store/Reducers/vehicles";
import { getGangsVehicles } from "../store/Reducers/gangs";
import { getStore } from "../store/Reducers/stores";
import ViewDialogVehicles from "./ViewDialogVehicles";
import DialogNotificactionsVehicle from "./DialogNotificactionsVehicle";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class ListVehicle extends Component {
  componentDidMount() {


//no hacer con find, hacerlo con include
    // {user.roles.find(role => role === 'loteo') ? (
    //   <Tooltip title="Desarmar" disableFocusListener>
    //     <IconButton
    //       aria-label="Desarmar"
    //       onClick={props.openDisassembleModal}
    //     >
    //       <DeleteIcon />
    //     </IconButton>
    //   </Tooltip>
    // ) : null}

    // if(this.props.roles.find(role => role === 'Administrador')){
      // console.log("Administrador");
      // this.props.requestListVehicles();
    // }

    // if(this.props.roles.find(role => role === 'Visualizador')){
      // console.log("Visualizador");
      // this.props.requestListVehiclesAssignment(this.props.userID);
    // }


    this.props.requestListVehicles();

    this.props.requestListGangs();

    this.props.requestListStores();
    
  }
  render() {
    const { classes } = this.props;
    // console.log("roles",this.props.roles);
    // console.log("userID",this.props.userID);
    // const vehicles = null;

    // if(this.props.vehicles){
    const vehicles = this.props.vehicles.map(vehicle => {
      const gang = this.props.gangs.find(gang =>
        gang ? gang._id === vehicle.assign : false
      );
      // console.log("gang",gang);
      return {
        ...vehicle,
        assign: gang ? { id: gang._id, name: gang.name } : null
      };
    });
    // }

    // console.log("vehicles lisVehicles",vehicles);
    // console.log("this.props.store",this.props.store.name + " - " + this.props.store.type.name);
    return (
      <>
      <Typography variant="h6" id="tableTitle">
      Deposito:  {this.props.store
          ? this.props.store.name + " - " + this.props.store.type.name
          : "-"}
      </Typography>
      <Paper className={classes.root}>
        <ViewDialogVehicles
          openView={this.props.openView}
          handleViewClose={this.props.handleViewClose}
        />
        <AssignDialogUser
          open={this.props.open}
          onClose={this.props.handleClose}
        />
        <DeleteDialogUser
          openDelete={this.props.openDelete}
          handleCloseDelete={this.props.handleCloseDelete}
        />
          <DialogNotificactionsVehicle
          openNotifications={this.props.openNotifications}
          handleCloseNotificationsVehicle={this.props.handleCloseNotificationsVehicle}
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Dominio</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Asignado</TableCell>
              <TableCell align="center" padding="none">
                Notificar
              </TableCell>
              <TableCell align="center" padding="none">
                Asignar
              </TableCell>
              <TableCell align="center" padding="none">
                Editar
              </TableCell>
              <TableCell align="center" padding="none">
                Ver
              </TableCell>
              <TableCell align="center" padding="none">
                Eliminar
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {vehicles.map(vehicle => (
              <TableRow key={vehicle._id}>
                {/* <TableCell>{vehicle.id}</TableCell> */}
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.numberPlate}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{vehicle.state}</TableCell>
                <TableCell>
                  {vehicle.assign ? vehicle.assign.name : "-"}
                </TableCell>
                <TableCell padding="none">
                  <IconButton
                    align=" center"
                    onClick={() => this.props.handleClickOpenNotificactionVehicle(vehicle)}
                  >
                    <NotificationsActiveIcon />
                  </IconButton>
                </TableCell>
                <TableCell padding="none">
                  {/* </TableCell><IconButton align=" center" component={Link} to={`/vehiculos/${vehicle.id}/asignar`}> */}
                  {/* <IconButton align=" center" component={Link} to={`/vehiculos/${vehicle.id}/asignar`}> */}
                  <IconButton
                    align=" center"
                    onClick={() => this.props.handleClickOpen(vehicle)}
                  >
                    <Autorenew />
                  </IconButton>
                </TableCell>
                <TableCell padding="none">
                  {/* </TableCell><IconButton align=" center" component={Link} to={`/vehiculos/${vehicle.id}/asignar`}> */}
                  {/* <IconButton align=" center" component={Link} to={`/vehiculos/${vehicle.id}/asignar`}> */}
                  <IconButton
                    align=" center"
                    // onClick={() => props.handleClickEditVehicle(vehicle)}
                    component={Link}
                    to={`/vehiculos/editar/${vehicle._id}`}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell padding="none">
                  <IconButton
                    align=" center"
                    //component={Link}
                    // to={`/${income.id}`}
                    //className={props.classes.button}asi
                    //aria-label="Show"
                    onClick={() => this.props.handleClickViewOpen(vehicle)}
                  >
                    <ShowIcon />
                  </IconButton>
                </TableCell>
                <TableCell padding="none">
                  <IconButton
                    //disabled={vehicle.state !== "Malo"}
                    align=" center"
                    // onClick={() => props.removeVehicle(vehicle.id)}
                    // onClick={() => this.props.OnRemoveVehicle(vehicle._id)}
                    onClick={() =>
                      this.props.handleClickOpenDeleteVehicle(vehicle._id)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // vehicles: getVehicles(state), //selector
  //  vehicles: state.vehicles,
  store: getStore(state, ownProps.match.params.id),
  vehicles: getVehiclesStore(state, ownProps.match.params.id), //selector
  gangs: getGangsVehicles(state, ownProps.match.params.id), //selector
  open: state.assignUser.open,
  openView: state.viewVehicle.openView,
  openDelete: state.vehicles.openDelete,
  id: state.assignUser.id,
  openNotifications: state.notificationsVehicle.openNotifications,
  roles: state.user.roles,
  userID: state.user.id,
  userName: state.user.name
});
const mapDispatchToProps = dispatch => ({
  // removeVehicle: id => dispatch(removeVehicle(id)),

  // updateVehicleList: () => dispatch(updateVehicleList()),

  // OnRemoveVehicle: id => dispatch(OnRemoveVehicle(id)),

  handleClickOpen: vehicle => dispatch(handleClickOpen(vehicle)),

  handleClose: () => dispatch(handleClose()),

  handleClickViewOpen: vehicle => dispatch(handleClickViewOpen(vehicle)),

  handleClickOpenDeleteVehicle: id =>
    dispatch(handleClickOpenDeleteVehicle(id)),

  handleViewClose: () => dispatch(handleViewClose()),

  handleCloseDelete: () => dispatch(handleCloseDelete()),

  handleClickOpenNotificactionVehicle: vehicle => dispatch(handleClickOpenNotificactionVehicle(vehicle)),

  handleCloseNotificationsVehicle: () => dispatch(handleCloseNotificationsVehicle()),

  requestListVehicles: value => dispatch(requestListVehicles(value)),

  // requestListVehiclesAssignment: value => dispatch(requestListVehiclesAssignment(value)),

  requestListGangs: value => dispatch(requestListGangs(value)),

  requestListStores: value => dispatch(requestListStores(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListVehicle));
