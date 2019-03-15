import React from "react";
import ReactDOM from "react-dom";
import SignIn from "./Signin";
import SignUp from "./Signup";
import SimpleAppBar from "./TopAppBar"
import SimpleFooter from "./BottomAppBar"
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import MainMenu from "./MainMenu";
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// MUST IMPORT COLORS!!!
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: purple, // Radio buttons selected
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
}); 
const App = () => (
    <React.Fragment>
        <MuiThemeProvider theme={theme}>
            <SimpleAppBar />
            <main>
                <Switch>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route exact path='/' component={MainMenu} />
                </Switch>
            </main>
            <SimpleFooter />
        </MuiThemeProvider>
    </React.Fragment >
    // <DataProvider endpoint="api/matches/"
    //     render={data => <Table data={data} />} />
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, wrapper) : null;