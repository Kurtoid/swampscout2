import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import SignIn from "./Signin";
import SimpleAppBar from "./TopAppBar"
import Drawer from '@material-ui/core/Drawer';
const App = () => (
    <div>
        <div>
            <SimpleAppBar />
        </div>
        <div>
            <Drawer />
        </div>
        <div>
            <SignIn />
        </div>
    </div>
    // <DataProvider endpoint="api/matches/"
    //     render={data => <Table data={data} />} />
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;