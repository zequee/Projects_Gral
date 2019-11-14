import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { handleChangeSingle } from "../store/Actions/assignmentVeh";
import clsx from "clsx";
import Select from "react-select";
import { emphasize } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import PropTypes from "prop-types";
import { requestListStores } from "../store/Actions/stores";
import { getStoreActive } from "../store/Reducers/stores";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    bottom: 6,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired
};

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool
};

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired
};

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool,
  removeProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

// function ReactSelectAssignmentVeh(props) {
//   const classes = useStyles();
//   const theme = useTheme();

//   const selectStyles = {
//     input: base => ({
//       ...base,
//       color: theme.palette.text.primary,
//       "& input": {
//         font: "inherit"
//       }
//     })
//   };

class ReactSelectAssignmentVeh extends Component {
  async componentDidMount() {
    // this.props.requestListStores();
    // this.props.requestListGangs();
  }
  render() {
    const { classes } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        // color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <div className={classes.root}>
        {/* <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              inputId="react-select-single"
              TextFieldProps={{
                label: "Deposito",
                InputLabelProps: {
                  htmlFor: "react-select-single",
                  shrink: true
                },
                placeholder: "Seleccione un Deposito"
              }}
              options={this.props.stores.map(store => ({
                value: store._id,
                label: store.name + " - " + store.type.name
              }))}
              components={components}
              value={this.props.selectedValueStore}
              onChange={this.props.handleChangeSingleStore}
            />
            <div className={classes.divider} />
          </NoSsr> */}
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            inputId="react-select-single"
            TextFieldProps={{
              label: "Vechiulo",
              InputLabelProps: {
                htmlFor: "react-select-single",
                shrink: true
              },
              placeholder: "Seleccione un Vehiculo"
            }}
            options={this.props.vehicles.vehicles.map(vehicle => ({
              value: vehicle._id,
              label:
                "[" +
                vehicle.numberPlate +
                "]" +
                vehicle.brand +
                " " +
                vehicle.model
            }))}
            components={components}
            value={this.props.selectedValue}
            onChange={this.props.handleChangeSingle}
          />
          <div className={classes.divider} />
        </NoSsr>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vehicles: state.vehicles,
  selectedValue: state.assignmentVeh.selectedValue,
  stores: getStoreActive(state.stores)
});

const mapDispatchToProps = dispatch => ({
  handleChangeSingle: value => dispatch(handleChangeSingle(value)),

  requestListStores: value => dispatch(requestListStores(value)),

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReactSelectAssignmentVeh));
