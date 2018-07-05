import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from "react-redux";

import './App.css';
import Loader from './components/Loader';
import Header from './components/Header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Test from './pages/Test';
import Page404 from './pages/Page404';
import Index from './pages/Index';
import CalendarPage from './pages/CalendarPage';
import requireAuthentication from './utils/requireAuth';
import { loadUser } from "./redux/actions/auth";


class App extends Component {
    constructor(props) {
        super();
        props.loadUser();
    }

    render() {
        const pathname = window.location.pathname;
        const {isLoadedUser} = this.props;
        return (
            <div className="App">
                <Header />
                <Loader isLoading={!isLoadedUser}>
                    <Switch>
                        <Route exact path="/" component={Index}/>
                        <Route path="/calendar" component={requireAuthentication(CalendarPage)}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/test" component={requireAuthentication(Test)}/>
                        <Route path="/404" component={Page404}/>
                        <Redirect to="/404"/>
                    </Switch>
                </Loader>

            </div>
        );
    }
}

export default connect(
    state => ({
        isLoadedUser: state.auth.loaded,
        mode: state.calendar.mode
    }),
    {
        loadUser
    }
)(App);
