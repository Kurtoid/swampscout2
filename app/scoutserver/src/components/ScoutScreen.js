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

import ScoreEntry from './ScoreEntry'
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
    },
    listitem:{
        flexgrow: 1,
    },
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
            matchNumberError: false,
            matchNumber: 0,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMatchNumber = this.handleMatchNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log("State: " + name + " = " + value)
        this.setState({
            [name]: value
        });
    }
    handleMatchNumber(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
        if (!(value < 0)) {
            this.setState({
                matchNumberError: false
            });

            this.teamselect.updateSource()
        } else {
            this.setState({ matchNumberError: true })
            // alert("problem")
        }

    }

    handleSubmit(event) {
        console.log("sending request");
        fetch('/api/scouted-match/', {
            method: 'POST',
            body: JSON.stringify({
                //TODO: Set backend to recieve number
                start_status: "/api/match-start-status/" + this.state.matchStartStatus + "/",
                preload: this.state.preload,
                end_status: "/api/match-end-status/" + this.state.matchEndStatus + "/",
                cards: this.state.cards,
                number: this.state.matchNumber,
                team: "/api/teams/" + this.state.team + "/",
                scouted_by: "/api/users/1/", // TODO: THIS TO NOT BE FIRST USER
            }),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(function (response) {
                return response.json();
            }).then(myJson => {
                console.log(myJson);
                event.preventDefault()
            });
        event.preventDefault();

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
                <form id="frn1" className={classes.container} onSubmit={this.handleSubmit} autoComplete="off">
                    <Card className={classes.card}>
                        <TextField
                            id="matchNumber"
                            name="matchNumber"
                            label="Match Number"
                            className={classes.textField}
                            margin="normal"
                            type="number"
                            variant="outlined"
                            required={true}
                            autoFocus={true}
                            default={0}
                            onChange={this.handleMatchNumber}
                            value={this.state.matchNumber}
                            error={this.state.matchNumberError}
                        />
                        <div className={classes.divider} />
                        <DropDownByEndPoint ref={(child) => { this.teamselect = child; }}
                            endpoint={"/api/get-teams-by-match/2016nytr/" + this.state.matchNumber}
                            onChange={this.handleInputChange}
                            showpk={true}
                            labellabel="display_name"
                            valuelabel="number"
                            token={this.props.cookies.get('token')}
                            classes={classes} label="Team" id="team"
                        />
                    </Card>
                    <div className={classes.divider} />
                    <Card className={classes.card}>
                        <RadioByEndPoint endpoint="/api/match-start-status/" onChange={this.handleInputChange} labellabel="status" valuelabel="pk" showpk={false} label="Match Start Location" id="matchstartstatus" token={this.props.cookies.get('token')} classes={classes} />
                        <div className={classes.divider} />
                        <RadioByEndPoint endpoint="/api/preload/" onChange={this.handleInputChange} labellabel="status" valuelabel="pk" showpk={false} label="Preloaded" id="preload" token={this.props.cookies.get('token')} classes={classes} />
                    </Card>
                    <div className={classes.divider} />
                    <Card className={classes.card}>
                        Game Peice Scores Go Here
                    </Card>
                    <div className={classes.divider} />
                    <Card className={classes.card}>
                        <RadioByEndPoint
                            endpoint="/api/match-end-status/"
                            onChange={this.handleInputChange}
                            labellabel="status"
                            valuelabel="pk"
                            showpk={false}
                            label="End Game"
                            id="matchEndStatus"
                            token={this.props.cookies.get('token')}
                            classes={classes}
                        />
                        <div className={classes.divider} />
                        <RadioByEndPoint
                            endpoint="/api/cards/"
                            onChange={this.handleInputChange}
                            labellabel="status"
                            valuelabel="pk"
                            showpk={false}
                            label="Cards"
                            id="cards"
                            token={this.props.cookies.get('token')}
                            classes={classes}
                        />
                    </Card>
                    <div className={classes.divider} />
                    <ScoreEntry classes={classes} cookies={this.props.cookies} />
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