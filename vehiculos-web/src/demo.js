import React, { Component } from "react";

class Demo extends Component {
  componentDidMount() {
    alert("hola");
  }

  render() {
    <h1>Hola {this.props.name}</h1>;
  }
}

// -----------------

const Demo = props => {
  return <h1>Hola {props.name}</h1>;
};
