import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import key from 'weak-key';

export default class DropDownByEndPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            labelWidth: 0,
        };

        this.handleInputChange = this.props.onChange;

        fetch(props.endpoint, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Token " + props.token,

            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    list: myJson.map(result => ({
                        value: result[this.props.valuelabel],
                        label: result[this.props.labellabel],
                    }))
                });
                console.log(this.state.list);

            }).catch(error => console.log(error));

        console.log();
    }
    
    

    render() {
        const { classes } = this.props;

        return (
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">{""+this.props.label}</FormLabel>
                    <RadioGroup
                        name={this.props.name}
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleInputChange}
                    >
                        {this.state.list.map((element) => {
                            return <FormControlLabel key={""+element.value} value={""+element.value} control={<Radio />} label={(this.props.showpk ? element.value + ": " : "") + element.label}  />
                        })}


                    </RadioGroup>
                </FormControl>

            </div>

        );
    }
}