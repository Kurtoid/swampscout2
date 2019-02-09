import React from 'react'
import ReactDOM from 'react-dom'

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
        // console.log(this.props.updateOnChange)
        this.handleInputChange = this.props.onChange;

        // this.parentChangeFunc = this.props.callOnChange.bind(this);

        this.updateSource()
    }
    getNameByID(id) {
        for (var i = 0, size = this.state.list.length; i < size; i++) {
            var item = this.state.list[i]
            if (item.value == id) {
                return item.label
            }
        }
        return undefined
    }
    updateSource() {
        fetch(this.props.endpoint, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Token " + this.props.token,

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

            }).catch(error => console.log(error));
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
                        onChange={this.handleInputChange}
                        value={this.state.team}
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
                            return <option
                                key={element.value}
                                value={element.value}
                            >
                                {(this.props.showpk ? element.value + ": " : "") + element.label}
                            </option>
                        })}
                    </Select>
                </FormControl>
            </div>
        );
    }
}