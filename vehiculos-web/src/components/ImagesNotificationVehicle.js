import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { requestGetNotification } from "../store/Actions/editNotification";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiError from "./ApiError";

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 300,
    // paddingTop: '100%', // 16:9,
    // width: 400,
    objectFit: "scale-down"
  }
});

class ImagesNotificationVehicle extends Component {
  async componentDidMount() {
    const VehicleIdUrl = this.props.match.params.id;

    const notification = await this.props.requestGetNotification(VehicleIdUrl);
    // console.log("request notification",notification.images);
  }
  render() {
    const { classes } = this.props;
    const { spacing } = this.props;

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
        <CardContent>
          <Grid justify="left" container>
            <Typography gutterBottom variant="h6" component="h2">
              Notificacion: {this.props.notification.notification}
            </Typography>
          </Grid>
        </CardContent>
        <Grid container spacing={spacing}>
          {this.props.notification.images
            ? this.props.notification.images.map(noti => (
              console.log("noti",noti),
                <Grid xs={12} sm={4} item>
                   <br>
                  </br>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        // image={`${process.env.REACT_APP_BACKEND_URI}/${noti.slice(7, 14) + "/" + noti.slice(15, 99)}`}
                        image={`${process.env.REACT_APP_BACKEND_URI}/${noti}`}
                        title={`${noti.replace("/ImagesNotifications/", "")}`}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            : "No Posee Fotos"}
        </Grid>
        <br/>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => this.props.history.goBack()}
        >
          Atras
        </Button>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.editNotification,
    loading: state.editNotification.loading,
    error: state.editNotification.error
  };
};

const mapDispatchToProps = dispatch => ({
  requestGetNotification: id => dispatch(requestGetNotification(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ImagesNotificationVehicle));
