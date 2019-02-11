import React from 'react';
import Button from '@material-ui/core/Button';
import { instanceOf } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
class AccountButton extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);

    }
    handleSignOut() {
        // this.props.history.push('signout/');
        this.props.cookies.remove('token');
    }
    handleSignIn() {
        this.props.history.push('signin');
    }

    render() {
        if (this.props.cookies.get('token') == null && this.props.cookies.get('token') != "")
            return (
                <Button onClick={this.handleSignIn}>Sign In</Button>
            ); else
            return (
                <Button onClick={this.handleSignOut}>Sign out</Button>
            );
    }
}
export function isSignedIn() {
    return getUniversalCookies().get('token') == null;
}
export default withRouter(withCookies(AccountButton));