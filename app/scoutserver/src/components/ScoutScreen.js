import React from 'react';
import ReactDOM from 'react-dom';

import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles, FormControl } from '@material-ui/core';
import DropDownByEndPoint from './DropDownByEndPoint'
import RadioByEndPoint from './RadioByEndpoint'

import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button"
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
    },
    divider: {
        margin: theme.spacing.unit * 2,
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
            match_number_error: false,
            match_number: 0,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMatchNumber = this.handleMatchNumber.bind(this);

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
    handleMatchNumber(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(value)
        this.setState({
            [name]: value,
        });
        if (!(value < 0)) {
            this.setState({
                match_number_error: false
            });
        } else {
            this.setState({ match_number_error: true })
            // alert("problem")
        }

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
                    <Card className={classes.card}>
                        <TextField
                            id="match-number"
                            name="match-number"
                            label="Match Number"
                            className={classes.textField}
                            margin="normal"
                            type="number"
                            variant="outlined"
                            required={true}
                            autoFocus={true}
                            default={0}
                            onChange={this.handleMatchNumber}
                            error={this.state.match_number_error}
                        />
                        <div className={classes.divider} />
                        <DropDownByEndPoint endpoint={"/api/teams/"+this.state.match_number} onChange={this.handleInputChange} showpk={true} labellabel="name" valuelabel="number" show="name" token={this.props.cookies.get('token')} classes={classes} label="Team" id="team" />
                    </Card>
                    <div className={classes.divider} />
                    <Card className={classes.card}>
                        <RadioByEndPoint endpoint="/api/match-start-status/" onChange={this.handleInputChange} labellabel="status" valuelabel="pk" showpk={false} label="Match Start Location" id="matchstartstatus" show="status" token={this.props.cookies.get('token')} classes={classes} />
                        <div className={classes.divider} />
                        <RadioByEndPoint endpoint="/api/preload/" onChange={this.handleInputChange} labellabel="status" valuelabel="pk" showpk={false} label="Preloaded" id="preload" show="status" token={this.props.cookies.get('token')} classes={classes} />
                    </Card>
                    <div className={classes.divider} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Submit</Button>

                </form>
            </div >
        );
    }
}
export default withStyles(styles)(withCookies(ScoutScreen));