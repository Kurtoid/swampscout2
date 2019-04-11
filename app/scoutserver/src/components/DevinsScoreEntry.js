import React from 'react'
import Card from '@material-ui/core/Card';
import DropDownByEndPoint from './DropDownByEndPoint';
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import ScoredObject from './models/ScoredObject'
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton'
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Checkbox from "./BetterCheckbox";
import NativeSelect from "@material-ui/core/NativeSelect"
import Input from '@material-ui/core/Input'
import key from 'weak-key'
import { createVerify } from 'crypto';
import Add from "@material-ui/icons/Add"
import { Typography, Select, OutlinedInput } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});
export default class ScoreEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scores: [],
            time: "Sandstorm",
            peice: "Cargo",
            acqloc: "Preloaded"
        }
        console.log(props)
        // this.parentHandleChange = props.onChange.bind(this)

        this.handleAddL1 = this.handleAddL1.bind(this)
        this.handleAddL2 = this.handleAddL2.bind(this)
        this.handleAddL3 = this.handleAddL3.bind(this)
        this.handleAddC = this.handleAddC.bind(this)
        this.handleAddD = this.handleAddD.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)

        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.handlePeiceChange = this.handlePeiceChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
    }

    handleDelete(index, event) {
        this.setState({
            scores: this.state.scores.filter((_, i) => i !== index)
        })
    }

    //this probably should be a switch/if statement
    handleAddL1(event) {
        console.log("Score Location = Rocket L1")
        this.setState({
            scoreloc: "Rocket L1"
        });
        this.handleSubmit(event)
    }
    handleAddL2(event) {
        console.log("Score Location = Rocket L2")
        this.setState({
            scoreloc: "Rocket L2"
        });
        this.handleSubmit(event)
    }
    handleAddL3(event) {
        console.log("Score Location = Rocket L3")
        this.setState({
            scoreloc: "Rocket L3"
        });
        this.handleSubmit(event)
   
    }
    handleAddC(event) {
        console.log("Score Location = Cargo Ship")
        this.setState({
            scoreloc: "Cargo Ship"
        });
        this.handleSubmit(event)
    }
    handleAddD(event) {
        console.log("Score Location = Dropped")
        this.setState({
            scoreloc: "Dropped"
        });
        this.handleSubmit(event)
    }

    handleSubmit(event) {
        if ((this.state.time && this.state.acqloc && this.state.scoreloc && this.state.peice)) {
            this.setState({ scores: [...this.state.scores, new ScoredObject(this.state.peice, this.state.time, this.state.acqloc, this.state.scoreloc)] }, () => {
                console.log(this.state.scores)
                this.props.onChange("scores", this.state.scores)
            })
        }
    }

    handleTimeChange(event) {
        if (this.state.time === "Sandstorm") {
            this.setState({ time: "Teleop" })
        } else if (this.state.time === "Teleop") {
            this.setState({ time: "Sandstorm" })
        } else {
            console.log("ERROR IN HANDLE TIME CHANGE")
        }
        console.log(this.state.time)
    }
    handlePeiceChange(event) {
        if (this.state.peice === "Cargo") {
            this.setState({ peice: "Hatch" })
        } else if (this.state.peice === "Hatch") {
            this.setState({ peice: "Cargo" })
        } else {
            console.log("ERROR IN HANDLE PEICE CHANGE")
        }
        console.log(this.state.peice)
    }
    handleLocationChange(event) {
        if (this.state.acqloc === "Ground" || this.state.acqloc === "Preloaded") {
            this.setState({ acqloc: "Station" })
        } else if (this.state.acqloc === "Station") {
            this.setState({ acqloc: "Ground" })
        } else {
            console.log("ERROR IN HANDLE LOCATION CHANGE")
        }
        console.log(this.state.acqloc)
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <Typography gutterBottom variant="subtitle1" component="h2">
                    {this.props.title}
                </Typography>
                <Grid container spacing={8}> <Grid item>
                    <Checkbox
                        id="time"
                        label={this.state.time}
                        color="secondary"
                        name="time"
                        onChange={this.handleTimeChange}
                    />
                    <Checkbox
                        id="peice"
                        label={this.state.peice}
                        color="secondary"
                        name="peice"
                        onChange={this.handlePeiceChange}
                    />
                    <Checkbox
                        id="acqloc"
                        label={this.state.acqloc}
                        color="secondary"
                        name="acqloc"
                        onChange={this.handleLocationChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        value="Rocket L1"
                        className={classes.submit}
                        onClick={this.handleAddL1}
                        fullWidth
                    >Rocket L1</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        value="Rocket L2"
                        className={classes.submit}
                        onClick={this.handleAddL2}
                        fullWidth
                    >Rocket L2</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        value="Rocket L3"
                        className={classes.submit}
                        onClick={this.handleAddL3}
                        fullWidth
                    >Rocket L3</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        value="Cargo Ship"
                        className={classes.submit}
                        onClick={this.handleAddC}
                        fullWidth
                    >Cargo Ship</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        value="Dropped"
                        className={classes.submit}
                        onClick={this.handleAddD}
                        fullWidth
                    >Dropped</Button>
                </Grid>
                </Grid>
                <List>
                    {this.state.scores.map((element, i) => {
                        return (
                            <ListItem key={i}>
                                <ListItemText
                                    primary={"During " + element.time
                                        + ", picked a " + element.type + " up from " + element.from
                                        + ", and scored at " + element.to}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        aria-label="Delete"
                                        onClick={this.handleDelete.bind(this, i)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Card>

        );
    }
}