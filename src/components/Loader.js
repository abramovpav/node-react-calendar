import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import { connect } from "react-redux";

// import './App.css';

class Loader extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired
    };

    render() {
        const pathname = window.location.pathname;
        const { children, isLoading } = this.props;
        if (isLoading) {
            return (
                <div>Loading...</div>
            );
        } else {
            return (
                <div>
                    {children}
                </div>
            );
        }

    }
}

export default Loader;
