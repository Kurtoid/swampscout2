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
            team: 0,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {

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
                        htmlFor="team-select"
                    >
                        Team
            </InputLabel>
                    <Select
                        native
                        value={this.state.team}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                name="something"
                                labelWidth={this.state.labelWidth}
                                id="team-select"
                            />
                        }
                    >
                        <option key={0} value={0}>None</option>

                        {this.state.list.map((element) => {
                            return <option key={element.value} value={element.value}>{(this.props.showpk?element.value+ ": " :"")+ element.label}</option>
                        })}
                    </Select>
                </FormControl>
                {this.state.list.map((label, i) => {
                   <div>{label}</div>
                })}

            </div>

        );
    }
}