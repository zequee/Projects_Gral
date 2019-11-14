import React from 'react';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

const userName = ({ name }) => (
  <Typography variant="subtitle1" color="inherit">
    {name}
  </Typography>
);

const mapStateToProps = state => ({
  // name: "USUARIO"
  name:state.user.name 
});

export default connect(mapStateToProps)(userName);
