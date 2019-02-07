import React from 'react'
import Card from '@material-ui/core/Card';
import DropDownByEndPoint from './DropDownByEndPoint';
import Grid from "@material-ui/core/Grid"
export default class ScoreEntry extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <Grid container spacing={8}>
                    <Grid item>
                        <DropDownByEndPoint label="Time" classes={classes} endpoint="api/game-time/" valuelabel="pk" labellabel="time" token={this.props.cookies.get('token')} />
                    </Grid>
                    <Grid item>

                        <DropDownByEndPoint label="Acquired Location" classes={classes} endpoint="api/hatch-from-locations/" valuelabel="pk" labellabel="location" token={this.props.cookies.get('token')} />
                    </Grid>
                    <Grid item>

                        <DropDownByEndPoint label="Scored Location" classes={classes} endpoint="api/score-locations/" valuelabel="pk" labellabel="location" token={this.props.cookies.get('token')} />
                    </Grid>
                </Grid>
            </Card>

        );
    }
}