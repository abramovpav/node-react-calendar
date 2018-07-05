import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'


class Login extends Component {
    render() {
        return (
            <div className="page page-login">
                <div>
                   <h1>Test page</h1>
                    <h4>Only authorized users.</h4>
                </div>
            </div>
        );
    }
}

export default Login;
