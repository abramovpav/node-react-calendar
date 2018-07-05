import React, {Component} from 'react';
import { connect } from "react-redux";
import {Switch, Route, NavLink} from 'react-router-dom'

import logo from '../logo.svg';
import '../App.css';
import './Header.css';
import {push} from "react-router-redux";
import { logout } from "../redux/actions/auth";

class Header extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.goToSignup = this.goToSignup.bind(this);
    }

    goToLogin() {
        this.props.redirectTo('/login');
    }

    goToSignup() {
        this.props.redirectTo('/signup');
    }

    logout() {
        this.props.logout().then((res) => {
            this.props.redirectTo('/')
        })
    }

    render() {
        const { user } = this.props;
        return (
            <header className="Header">
                <NavLink exact to="/">
                    <img src={logo} className="App-logo" alt="logo"/>
                </NavLink>
                <h1 className="App-title">

                    Welcome to React, { user.isAuthenticated() ? user.fullName() : "Stranger"}
                </h1>
                <div className="auth-buttons">
                {
                    user.isAuthenticated() ?
                        <button className="button logout" onClick={this.logout}>Logout</button>
                        : [
                            <button key="login" className="button login" onClick={this.goToLogin}>Login</button>,
                            <button key="signup" className="button signup" onClick={this.goToSignup}>Signup</button>
                        ]
                }
                </div>
            </header>
        );
    }
}

export default connect(
    state => ({
        user: state.auth.user
    }),
    {
        logout,
        redirectTo: (path) => (dispatch) => {
            dispatch(push(path));
        }
    }
)(Header);
