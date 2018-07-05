import React, {Component} from 'react';
import { connect } from "react-redux";
import { push } from 'react-router-redux';

import './auth.css';
import { login } from "../redux/actions/auth";



class Login extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    componentWillMount() {
        if (this.props.user.isAuthenticated()) {
            this.props.redirectToTest();
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    login(event) {
        event.preventDefault();
        event.stopPropagation();
        const {username, password} = this.state;
        this.setState({errorMessage: ''});
        this.props.login({username, password}).then((res) => {
            this.props.redirectToTest();
        }, (res) => {
            const { response } = res;
            if (response && response.data) {
                const { message } = response.data;
                this.setState({errorMessage: message});
            }
        })
    }

    render() {
        const { username, password, errorMessage } = this.state;
        return (
            <div className="page page-auth">
                <h3>Log in</h3>
                <form className="form auth-form" onSubmit={this.login}>
                    <div className="errors-block">
                        { errorMessage }
                    </div>
                    <div className="form-row">
                        <label>Username:</label>
                        <input name="username" onChange={this.handleInputChange} value={username}/>
                    </div>
                    <div className="form-row">
                        <label>Password:</label>
                        <input type="password" name="password" onChange={this.handleInputChange} value={password}/>
                    </div>
                    <button type="submit" className="button">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        isLoadedUser: state.auth.loaded,
        user: state.auth.user
    }),
    {
        login,
        redirectToTest: () => (dispatch) => {
            dispatch(push('/calendar'));
        }
    }
)(Login);
