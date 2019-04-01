import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit,
  },
  grow: {
    flexGrow: 1,
  }
});


function SimpleFooter(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <center>
              Originally created by Kurt Wilson <br />
              Maintained by Kurt Wilson, Katelynn Morrison, and Devin Dykstra<br/>
              Copyright 2019
            </center>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleFooter);