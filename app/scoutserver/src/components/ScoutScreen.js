import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,

    },
    input: {
        display: 'none',
    },
    card: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        ...theme.mixins.gutters(),
    }
});

class ScoutScreen extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    render() {
        const { classes } = this.props;
        if (this.props.cookies.get('token') == null)
            return (
                <Card className={classes.card}>
                    Please log in<br />'Ill make this prettier later
                    </Card>
            );
        else return (
            <div>
                Scout!
            </div>
        );
    }
}
export default withStyles(styles)(withCookies(ScoutScreen));