import React from 'react'
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import ScoredObject from './models/ScoredObject'
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton'
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    margin: {
        marginTop: theme.spacing.unit,
    },
});
class ScoreEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scores: [],
            current_time: "Sandstorm",
            current_type: "Hatch",
            current_source: "Prepopulated",
        }
        console.log(props)
        // this.parentHandleChange = props.onChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.handleSourceChange = this.handleSourceChange.bind(this)

    }
    handleTimeChange(event) {
        if (this.state.current_time == "Sandstorm") {
            this.setState({ current_time: "Teleop" })
        } else {
            this.setState({ current_time: "Sandstorm" })
        }
    }
    handleTypeChange(event) {
        if (this.state.current_type == "Hatch") {
            this.setState({ current_type: "Cargo" })
        } else {
            this.setState({ current_type: "Hatch" })
        }
    }
    handleSourceChange(event) {
        if (this.state.current_source == "Loading Station") {
            this.setState({ current_source: "Ground" })
        } else {
            this.setState({ current_source: "Loading Station" })
        }
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
        }, () => {
            if (this.state.scores.length == 0) {
                this.setState({
                    current_source: "Prepopulated",
                })
            }
        })
    }
    handleAdd(target, event) {
        this.setState({ scores: [new ScoredObject(this.state.current_type, this.state.current_time, this.state.current_source, target), ...this.state.scores] }, () => {
            console.log(this.state.scores)
            this.props.onChange("scores", this.state.scores)
            if (this.state.current_source == "Prepopulated") {
                this.handleSourceChange();
            }

        })

    }
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <Typography gutterBottom variant="subtitle1" component="h2">
                    {this.props.title}
                </Typography>
                <Grid container spacing={8}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleTimeChange}
                            fullWidth
                        >{this.state.current_time}</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleTypeChange}
                            fullWidth
                        >{this.state.current_type}</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSourceChange}
                            fullWidth
                        >{this.state.current_source}</Button>

                    </Grid>
                    <Grid item>
                        {/* <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                            fullWidth
                        ><Add /></Button> */}
                    </Grid>
                </Grid>
                <Grid container spacing={8}>
                    <Grid xs item>
                        <br />
                        <img src="static/scoutserver/rocket.png" width="42" />
                    </Grid>
                    <Grid xs={7} item>
                        <br />
                        <table>
                            <tr>
                                <th><Button className={classes.margin} color="primary" fullWidth variant="contained" onClick={this.handleAdd.bind(this, "Rocket Level 3")}>LV 3</Button><br /></th>
                                <th><Button className={classes.margin} color="primary" fullWidth variant="contained" onClick={this.handleAdd.bind(this, "Cargo Ship")}>Ship</Button></th>
                            </tr>
                            <tr>
                                <Button className={classes.margin} color="primary" fullWidth variant="contained" onClick={this.handleAdd.bind(this, "Rocket Level 2")}>LV 2</Button><br />
                            </tr>
                            <tr>
                                <th><Button className={classes.margin} color="primary" fullWidth variant="contained" onClick={this.handleAdd.bind(this, "Rocket Level 1")}>LV 1</Button></th>
                                <th><Button className={classes.margin} color="primary" fullWidth variant="contained" onClick={this.handleAdd.bind(this, "Dropped")}>Dropped</Button></th>
                            </tr>
                        </table>
                    </Grid>
                    <Grid xs item>
                        <br />
                        <img src="static/scoutserver/ship.png" width="42" />
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
            </Card >

        );
    }
}
export default withStyles(styles)(ScoreEntry);
