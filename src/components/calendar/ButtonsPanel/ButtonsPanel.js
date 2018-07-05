import React, {Component} from "react";
import ViewModeButton from "./ViewModeButton";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CurrentDateView from "./CurrentDateView";

class ButtonsPanel extends Component {

    render() {
        return (
            <div>
                <Link to="/calendar/new-event" className="link-calendar">
                    <button className="button">New event</button>
                </Link>
                <br />
                <br />
                <ViewModeButton buttonMode="day"/>
                <ViewModeButton buttonMode="week"/>
                <ViewModeButton buttonMode="month"/>
                <button onClick={() => this.props.onPrevDate(this.props.mode)}>{'<'}</button>
                <button onClick={() => this.props.onNextDate(this.props.mode)}>{'>'}</button>
                {'   '}
                <CurrentDateView />
            </div>
        );
    }
}

export default connect(
    state => ({
        mode: state.calendar.mode
    }),
    dispatch => ({
        onNextDate: (currentMode) => {
            dispatch({type: "NEXT_DATE", payload: currentMode})
        },
        onPrevDate: (currentMode) => {
            dispatch({type: "PREV_DATE", payload: currentMode})
        }
    })
)(ButtonsPanel);
