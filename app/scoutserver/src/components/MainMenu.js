import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import ScoutScreen from './ScoutScreen';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    bar: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});
class MainMenu extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={8} alignItems="center" justify="center" >
                <Grid item >
                    <ScoutScreen className={classes.bar} />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(MainMenu);