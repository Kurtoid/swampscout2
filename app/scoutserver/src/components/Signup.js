import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DropDownByEndPoint from './DropDownByEndPoint'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});
class SignUp extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            passwordInvalidError: "",
            passwordCheck: "",
            passwordError: false,
            team: "",
            waiting: false,
        };

        this.handleValidatePassword = this.handleValidatePassword.bind(this);        
        this.handleCheckPassword = this.handleCheckPassword.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidatePassword() {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
        var invalid = true;
        if (!(invalid)) {
            this.setState({
                passwordInvalidError: false
            });
        } else {
            this.setState({ passwordInvalidError: true })
            // alert("problem")
        }
    }

    handleCheckPassword(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
        if (!(this.state.password === this.state.passwordCheck)) {
            this.setState({
                passwordError: false
            });
        } else {
            this.setState({ passwordError: true })
            // alert("problem")
        }
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
        // alert('Your are: ' + this.state.email);
        this.setState({ waiting: true });
        console.log("sending request");
        const { cookies } = this.props;
        fetch('/api/createuser/', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                username: this.state.email,
                password: this.state.password,
                team: this.state.team
            }),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(myJson => {
                cookies.set('token', myJson['token'], { path: '/' });
                if(myJson['token']!=null){
                    console.log(JSON.stringify(myJson));
                    this.props.history.push("/");
                }else{
                    this.setState({waiting: false});
                }
            }).catch(error => console.log(error));
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    {this.state.waiting ? <CircularProgress /> : <Avatar className={classes.avatar}><LockOutlinedIcon /> </Avatar>}
                    <Typography
                        component="h1"
                        variant="h5"
                    > Sign up </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                    <FormControl
                            margin="normal"
                            required
                            fullWidth>
                            <InputLabel
                                htmlFor="name"
                            >Name</InputLabel>
                            <Input
                                id="name" 
                                name="name"
                                autoComplete="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                autoFocus
                            />
                        </FormControl> <FormControl
                            margin="normal"
                            required
                            fullWidth>
                            <InputLabel
                                htmlFor="email"
                            >Email Address</InputLabel>
                            <Input
                                id="email" 
                                name="email"
                                autoComplete="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                        >
                            <InputLabel
                                htmlFor="password"
                            >Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.handleValidatePassword}
                                error={this.state.passwordCheckError}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required
                            fullWidth
                        >
                            <InputLabel
                                htmlFor="passwordCheck"
                            >Password Check</InputLabel>
                            <Input
                                name="passwordCheck"
                                type="password"
                                id="passwordCheck"
                                value={this.state.passwordCheck}
                                onChange={this.handleCheckPassword}
                                error={this.state.passwordError}
                            />
                        </FormControl>
                        <DropDownByEndPoint ref={(child) => { this.teamselect = child; }}
                            value={this.state.team}
                            endpoint={"/api/teams/"}
                            onChange={this.handleInputChange}
                            showpk={false}
                            labellabel="display_name"
                            valuelabel="number"
                            classes={classes}
                            label="Team"
                            id="team"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        > Sign up </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}


export default withStyles(styles)(withCookies(SignUp));