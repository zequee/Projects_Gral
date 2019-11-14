import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { requestGetNotification } from "../store/Actions/editNotification";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";
import { handleClickOpenDeleteImage } from "../store/Actions/editNotification";
import DeleteDialogImages from "./DeleteDialogImages";
import { handleCloseDelete } from "../store/Actions/editNotification";
import { ImageNotificationOnFieldChange } from "../store/Actions/notificationsVehicle";
import { addImageNotificationVehicleOnSave } from "../store/Actions/editNotification";

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 300,
    // paddingTop: "120%", // 16:9,
    // width: 200,
    objectFit: "scale-down",
  }
});

class EditImagesNotificationVehicle extends Component {
  async componentDidMount() {
    // const VehicleIdUrl = this.props.match.params.id;
    // await this.props.requestGetNotification(VehicleIdUrl);
  }
  render() {
    const { classes } = this.props;
    const { spacing } = this.props;

    // console.log("images", this.props.images);
    // console.log("this.props.notification._id",this.props.notification._id);

    if (this.props.error)
      return (
        <ApiError
          className={classes.progress}
          error="Error al buscar las imagenes"
        />
      );
    return this.props.loading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <>
        <DeleteDialogImages
          openDelete={this.props.openDelete}
          handleCloseDelete={this.props.handleCloseDelete}
          notification={this.props.notification}
        />
        <br></br>

        <Typography variant="h6" id="tableTitle">
          {this.props.notification.images &&
          this.props.notification.images.length
            ? "- Fotos -"
            : "- Notificacion sin Fotos -"}
        </Typography>
        <Grid container spacing={spacing}>
          {this.props.notification.images
            ? this.props.notification.images.map(noti => (
                <Grid xs={12} sm={4} item>
                  <br></br>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        component="img"
                        // image={`${process.env.REACT_APP_BACKEND_URI}/${noti.slice(7, 14) + "/" + noti.slice(15, 99)}`}
                        image={`${process.env.REACT_APP_BACKEND_URI}/${noti}`}
                        title={`${noti.replace("/ImagesNotifications/", "")}`}
                      />
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        align=" center"
                        // title={imageUrl}
                        // key={imageUrl}
                        onClick={() =>
                          this.props.handleClickOpenDeleteImage(
                            `${process.env.REACT_APP_BACKEND_URI}/${noti}`
                          )
                        }
                      >
                        Eliminar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : "No Posee Fotos"}
        </Grid>
        <br></br>
        <input
          accept="image/*"
          className={classes.input}
          id="inpImage"
          type="file"
          multiple
          onChange={inpImage =>
            this.props.ImageNotificationOnFieldChange("inpImage", inpImage)
          }
        />
        <Fab color="primary" aria-label="add" className={classes.fab}>
          <AddIcon
            align="right"
            label="Agregar Foto"
            aria-label="Agregar Foto"
            onClick={() =>
              this.props.addImageNotificationVehicleOnSave(
                this.props.notification._id,
                this.props.images
              )
            }
          />
        </Fab>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // notification: state.editNotification,
    loading: state.editNotification.loading,
    error: state.editNotification.error,
    openDelete: state.editNotification.openDelete,
    images: state.notificationsVehicle.images
  };
};

const mapDispatchToProps = dispatch => ({
  requestGetNotification: id => dispatch(requestGetNotification(id)),

  handleClickOpenDeleteImage: imageUrl =>
    dispatch(handleClickOpenDeleteImage(imageUrl)),

  handleCloseDelete: () => dispatch(handleCloseDelete()),

  ImageNotificationOnFieldChange: (field, value) =>
    dispatch(ImageNotificationOnFieldChange(field, value)),

  addImageNotificationVehicleOnSave: (notificationID, images) =>
    dispatch(addImageNotificationVehicleOnSave(notificationID, images))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditImagesNotificationVehicle));
