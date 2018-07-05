import React, {Component} from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'


class Login extends Component {
    render() {
        return (
            <div className="page page-login">
                <div style={{marginTop: 40}}>
                    <NavLink exact to="/calendar">Calendar</NavLink>
                </div>
            </div>
        );
    }
}

export default Login;
