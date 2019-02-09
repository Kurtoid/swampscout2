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

import key from 'weak-key'
import { createVerify } from 'crypto';
import { Typography } from '@material-ui/core';

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
    constructor() {
        super()
        this.state = {
            scores: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
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
    handleDelete(index, event) {
        this.setState({
            scores: this.state.scores.filter((_, i) => i !== index)
        })
    }
    handleSubmit(event) {
        if ((this.state.time | this.state.acqloc | this.state.scoreloc)) {
            this.setState({ scores: [...this.state.scores, new ScoredObject(this.state.time, this.state.acqloc, this.state.scoreloc)] }, () => {
                console.log(this.state.scores)
            })
        }

    }
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <Typography gutterBottom variant="subtitle1" component="h2"> 
                    {this.props.title}
                </Typography>
                <List>
                    {this.state.scores.map((element, i) => {
                        return (
                            <ListItem key={i}>
                                <ListItemText
                                    primary={"During " + this.timeselect.getNameByID(element.time)
                                        + ", picked up from " + this.acqselect.getNameByID(element.from)
                                        + ", and scored at " + this.scoreselect.getNameByID(element.to)}
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
                <Grid container spacing={8}>
                    <Grid item>
                        <DropDownByEndPoint ref={(child) => { this.timeselect = child; }}
                            id='time'
                            onChange={this.handleInputChange}
                            label="Time"
                            classes={classes}
                            endpoint="api/game-time/"
                            valuelabel="pk"
                            labellabel="time"
                            token={this.props.cookies.get('token')}
                        />
                    </Grid>
                    <Grid item>

                        <DropDownByEndPoint ref={(child) => { this.acqselect = child; }}
                            id='acqloc'
                            onChange={this.handleInputChange}
                            label="Acquired Location"
                            classes={classes}
                            endpoint="api/from-locations/"
                            valuelabel="pk"
                            labellabel="location"
                            token={this.props.cookies.get('token')}
                        />
                    </Grid>
                    <Grid item>
                        <DropDownByEndPoint ref={(child) => { this.scoreselect = child; }}
                            id='scoreloc'
                            onChange={this.handleInputChange}
                            label="Scored Location"
                            classes={classes}
                            endpoint="api/score-locations/"
                            valuelabel="pk"
                            labellabel="location"
                            token={this.props.cookies.get('token')}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}                            
                            fullWidth
                        >Add</Button>
                    </Grid>
                </Grid>
            </Card>

        );
    }
}