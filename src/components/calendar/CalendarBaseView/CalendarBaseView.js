import React, {Component} from "react";
import "./styles.css";
import CalendarTableView from "../CalendarTableView/CalendarTableView";
import CalendarMonthView from "../CalendarMonthView/CalendarMonthView";
import DayModalWindow from "../DayModalWindow/DayModalWindow";
import viewModes from "../constants";
import { connect } from "react-redux";

class CalendarBaseView extends Component {

    render() {
        return (
            <div className="calendar-view">
                {this.props.mode === viewModes.month ? <CalendarMonthView /> : <CalendarTableView />}
                <DayModalWindow />
            </div>
        );
    }
}

export default connect(
    state => ({
        mode: state.calendar.mode
    }),
    dispatch  => ({})
)(CalendarBaseView);
