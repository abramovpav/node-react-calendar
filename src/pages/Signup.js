import React, {Component} from 'react';
import { connect } from "react-redux";
import { push } from 'react-router-redux';

import './auth.css';
import { signup } from "../redux/actions/auth";



class Signup extends Component {
    constructor() {
        super();
        this.signup = this.signup.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            user: {
                username: '',
                password: '',
                firstName: '',
                lastName: '',
            },
            errorMessage: ''
        }
    }

    componentWillMount() {
        if (this.props.user.isAuthenticated()) {
            this.props.redirectToCalendar();
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    }

    signup(event) {
        event.preventDefault();
        event.stopPropagation();
        const {user} = this.state;
        this.setState({errorMessage: ''});
        this.props.signup(user).then((res) => {
            this.props.redirectToCalendar();
        }, (res) => {
            const { response } = res;
            if (response && response.data) {
                const { message } = response.data;
                this.setState({errorMessage: message});
            }
        })
    }

    render() {
        const { user, errorMessage } = this.state;
        return (
            <div className="page page-auth">
                <h3>Sign up</h3>/h3>
                <form className="form auth-form" onSubmit={this.signup}>
                    <div className="errors-block">
                        { errorMessage }
                    </div>
                    <div className="form-row">
                        <label>Username:</label>
                        <input name="username" onChange={this.handleInputChange} value={user.username}/>
                    </div>
                    <div className="form-row">
                        <label>First Name:</label>
                        <input name="firstName" onChange={this.handleInputChange} value={user.firstName}/>
                    </div>
                    <div className="form-row">
                        <label>Last Name:</label>
                        <input name="lastName" onChange={this.handleInputChange} value={user.lastName}/>
                    </div>
                    <div className="form-row">
                        <label>Password:</label>
                        <input type="password" name="password" onChange={this.handleInputChange} value={user.password}/>
                    </div>
                    <button type="submit" className="button">
                        Finish
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
        signup,
        redirectToCalendar: () => (dispatch) => {
            dispatch(push('/calendar'));
        }
    }
)(Signup);
