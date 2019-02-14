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

import Checkbox from "./CheckboxAutoMove";

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
    listitem: {
        flexgrow: 1,
    },
});

let eventID = "2016nytr"; // TODO: Make this dynamic

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
            automoveyn: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMatchNumber = this.handleMatchNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.didComponentMount = this.didComponentMount.bind(this)
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
            }, () => {
                this.teamselect.updateSource()
            });

        } else {
            this.setState({ matchNumberError: true })
            // alert("problem")
        }

    }

    handleSubmit(event) {
        console.log(this.state)
        fetch('/pegs/', {
            method: 'POST',
            body: JSON.stringify({
                //TODO: Set backend to recieve number
                start_status: this.state.matchStartStatus,
                preload: this.state.preload,
                end_status: this.state.matchEndStatus,
                cards: this.state.cards,
                number: this.state.matchNumber,
                team: this.state.team,
                scouted_by: this.props.cookies.get('token'),
                scores: this.state.scores,
                tournament: this.props.cookies.get('tournament'),
            }),
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': this.props.cookies.get('csrftoken')

                // "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(function (response) {
                return response.json();
            }).then(myJson => {
            });
        event.preventDefault();

    }
    handleScoreChange(name, value) {
        console.log(name + " " + value)
        this.setState({[name]: value})
    }

    handleBoxChange() {       
        this.setState({automoveyn: (state.automoveyn ? false : true)})   
    }
    didComponentMount() {
        this.props.cookies.set('tournament', eventID);
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
                <form
                    className={classes.container}
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                >
                    <Card className={classes.card}>
                        <TextField // team number
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
                        <DropDownByEndPoint ref={(child) => { this.teamselect = child; }} // match number
                            endpoint={"/api/get-teams-by-match/" + eventID  +"/" + this.state.matchNumber}
                            onChange={this.handleInputChange}
                            showpk={false} 
                            labellabel="display_name"
                            valuelabel="number"
                            token={this.props.cookies.get('token')}
                            classes={classes}
                            label="Team"
                            id="team"
                        />
                    </Card>
                    <div className={classes.divider} />
                    <Card className={classes.card}>
                        <RadioByEndPoint // robot starting location
                            endpoint="/api/match-start-status/"
                            onChange={this.handleInputChange}
                            labellabel="status"
                            valuelabel="pk"
                            showpk={false}
                            label="Match Start Location"
                            id="matchStartStatus"
                            token={this.props.cookies.get('token')}
                            classes={classes}
                        />
                        <div className={classes.divider} />
                        <RadioByEndPoint // preloaded
                            endpoint="/api/preload/"
                            onChange={this.handleInputChange}
                            labellabel="status"
                            valuelabel="pk"
                            howpk={false}
                            label="Preloaded"
                            id="preload"
                            token={this.props.cookies.get('token')}
                            classes={classes}
                        />
                        I hate check boxes!!!
                        <div className={classes.divider} />
                        <Checkbox
                            value="automoveyn"
                            color="secondary"
                            onChange={this.handleBoxChange}
                        />
                    </Card>
                    <div className={classes.divider} />
                    <ScoreEntry // game pieces
                        title="Game Pieces"
                        classes={classes}
                        cookies={this.props.cookies}
                        onChange={this.handleScoreChange.bind(this)}
                    />
                    <div className={classes.divider} />
                    <Card className={classes.card}>
                        <RadioByEndPoint // robot end location
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
                        <RadioByEndPoint // team cards
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        // disabled // no submit for you!!!
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleSubmit}
                    >Submit</Button>
                </form>
            </div >
        );
    }
}
export default withStyles(styles)(withCookies(ScoutScreen));