import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from "./BetterCheckbox";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/Lock";

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
class SignIn extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            waiting: false,
            rember: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleBoxChange() {
        this.setState({ remember: (this.state.remember ? false : true) })
    }
    handleSubmit(event) {
        // alert('Your are: ' + this.state.email);
        this.setState({ waiting: true });
        console.log("sending request");
        const { cookies } = this.props;
        fetch('/api-token-auth/', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password
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
                if (myJson['token'] != null) {
                    console.log(JSON.stringify(myJson));
                    this.props.history.push("/");
                } else {
                    this.setState({ waiting: false });
                    this.setState({ notificationOpen: true, resultMessage: "Wrong username or password" })

                }
            }).catch(error => console.log(error));
        event.preventDefault();
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ notificationOpen: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper id="main" className={classes.paper}>

                    {this.state.waiting ? <CircularProgress /> : <Avatar className={classes.avatar}><LockOutlinedIcon /> </Avatar>}
                    <Typography component="h1" variant="h5">
                        Sign in
                </Typography>
                    <form
                        className={classes.form}
                        onSubmit={this.handleSubmit}
                    >
                        <FormControl
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
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <Checkbox
                            color="primary"
                            name="remember"
                            label="Remember me"
                            onChange={this.handleBoxChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        > Sign in </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled
                            color="primary"
                        > Sign up </Button>
                    </form>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.notificationOpen}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.resultMessage}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />

            </main>
        );
    }
}


export default withStyles(styles)(withCookies(SignIn));