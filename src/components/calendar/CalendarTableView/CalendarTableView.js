import React, {Component} from "react";
import "./styles.css";
import CalendarDayView from "../CalendarDayView/CalendarDayView";
import CalendarWeekView from "../CalendarWeekView/CalendarWeekView";
import viewModes from "../constants";
import { connect } from "react-redux";

class CalendarTableView extends Component {

    render() {
        let element = <CalendarDayView forceDate={this.props.forceDate}/>;
        if (this.props.mode === viewModes.week) {
            element = <CalendarWeekView />;
        }
        return (
            <div className="calendar-table-view">
                <div className="day-table-container">
                    <div className="event-time-container">
                        <div className="dayTime"/>
                        <div className="dayTime">00:00</div>
                        <div className="dayTime">01:00</div>
                        <div className="dayTime">02:00</div>
                        <div className="dayTime">03:00</div>
                        <div className="dayTime">04:00</div>
                        <div className="dayTime">05:00</div>
                        <div className="dayTime">06:00</div>
                        <div className="dayTime">07:00</div>
                        <div className="dayTime">08:00</div>
                        <div className="dayTime">09:00</div>
                        <div className="dayTime">10:00</div>
                        <div className="dayTime">11:00</div>
                        <div className="dayTime">12:00</div>
                        <div className="dayTime">13:00</div>
                        <div className="dayTime">14:00</div>
                        <div className="dayTime">15:00</div>
                        <div className="dayTime">16:00</div>
                        <div className="dayTime">17:00</div>
                        <div className="dayTime">18:00</div>
                        <div className="dayTime">19:00</div>
                        <div className="dayTime">20:00</div>
                        <div className="dayTime">21:00</div>
                        <div className="dayTime">22:00</div>
                        <div className="dayTime">23:00</div>
                    </div>
                    <div className="calendar-table-container">
                        {element}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        mode: state.calendar.mode
    })
)(CalendarTableView);
