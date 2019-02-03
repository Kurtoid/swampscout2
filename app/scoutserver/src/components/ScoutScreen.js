import React from 'react';
import ReactDOM from 'react-dom';

import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles, FormControl } from '@material-ui/core';
import DropDownByEndPoint from './DropDownByEndPoint'
const styles = theme => ({
    TextField: {
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
    constructor(props) {
        super(props);
        this.state = {
            something: false,
            labelWidth: 0,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {

    }
    render() {
        const { classes } = this.props;
        if (this.props.cookies.get('token') == null)
            return (
                <Card className={classes.card}>
                    Please log in<br />I'll make this prettier later
                    </Card>
            );
        else return (
            <div>
                <form className={classes.container} autoComplete="off">
                    {/* <TextField
                        id="match-number"
                        label="Match Number"
                        className={classes.textField}
                        margin="normal"
                        type="number"
                        variant="outlined"
                        required={true}
                        autoFocus={true}
                    />
                    <div className={classes.divider} /> */}
                    <DropDownByEndPoint endpoint="/api/teams/" show="name" token={this.props.cookies.get('token')} classes={classes}/>
                </form>
            </div >
        );
    }
}
export default withStyles(styles)(withCookies(ScoutScreen));