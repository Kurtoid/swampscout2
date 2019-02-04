import React from 'react'
import ReactDOM from 'react-dom'

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles, FormControl } from '@material-ui/core';
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
    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        htmlFor={this.props.id}
                    >
                        {this.props.label}
            </InputLabel>
                    <Select
                        native
                        value={this.state.team}
                        onChange={this.handleInputChange}
                        input={
                            <OutlinedInput
                                name={this.props.id}
                                labelWidth={this.state.labelWidth}
                                id={this.props.id}
                            />
                        }
                    >
                        <option key={0} value={0}>None</option>

                        {this.state.list.map((element) => {
                            return <option key={element.value} value={element.value}>{(this.props.showpk?element.value+ ": " :"")+ element.label}</option>
                        })}
                    </Select>
                </FormControl>

            </div>

        );
    }
}