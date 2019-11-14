import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import DrawerButtons from './DrawerButtons';

const styles = theme => ({
  drawerPaper: {
    width: 240,
    height: '100%',
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  toolbar: theme.mixins.toolbar
});

const sideDrawer = props => {
  const { classes } = props;
  return (
    <Fragment>
      <Hidden>
        <Drawer
          variant="temporary"
          open={props.mobileOpen}
          onClose={props.onToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <DrawerButtons onClose={props.onToggle} />
        </Drawer>
      </Hidden>
    </Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(sideDrawer);
