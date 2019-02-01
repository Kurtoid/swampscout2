import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import SignIn from "./Signin";
import SimpleAppBar from "./TopAppBar"
import Drawer from '@material-ui/core/Drawer'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import MainMenu from "./MainMenu";
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import green from '@material-ui/core/colors/green';
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
    typography: {
        useNextVariants: true,
    },
});

const App = () => (
    <React.Fragment>
        <MuiThemeProvider theme={theme}>
            <SimpleAppBar />
            <main>
                <Switch>
                    <Route path="/signin" component={SignIn} />
                    <Route exact path='/' component={MainMenu} />
                </Switch>
            </main>
        </MuiThemeProvider>
    </React.Fragment >
    // <DataProvider endpoint="api/matches/"
    //     render={data => <Table data={data} />} />
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, wrapper) : null;