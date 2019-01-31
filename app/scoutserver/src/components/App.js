import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import SignIn from "./Signin";
import SimpleAppBar from "./TopAppBar"
import Drawer from '@material-ui/core/Drawer'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
const App = () => (
    <div>
        <div>
            <SimpleAppBar />
        </div>
        <div>
            <Drawer />
        </div>
        <Switch>
            <Route path="/signin" component={SignIn} />
            <Route exact path='/' />
        </Switch>
    </div>
    // <DataProvider endpoint="api/matches/"
    //     render={data => <Table data={data} />} />
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, wrapper) : null;