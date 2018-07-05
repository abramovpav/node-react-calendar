import React, {Component} from "react";
import "./styles.css";
import viewModes from "../constants";
import { connect } from "react-redux";

class ViewModeButton extends Component {

    changeMode() {
        this.props.onNewMode(this.props.buttonMode);
    }

    render() {
        return (
                <button className={this.props.mode === viewModes[this.props.buttonMode] ? 'active': ''}
                        onClick={this.changeMode.bind(this)}>
                    {viewModes[this.props.buttonMode]}
                </button>
        );
    }
}

export default connect(
    state => ({
        mode: state.calendar.mode
    }),
    dispatch => ({
        onNewMode: (newMode) => {
            const mode = viewModes[newMode];
            dispatch({type: "CHANGE_MODE", payload: mode})
        }
    })
)(ViewModeButton);
