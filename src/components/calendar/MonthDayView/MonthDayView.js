import React, {Component} from "react";
import Moment from "../../Moment/Moment";
import "./styles.css";
import isToday from "../helpers";
import getValue from "../../utils/utils";
import { connect } from "react-redux";
import moment from "moment";

class MonthDayView extends Component {
    constructor(props) {
        super(props);
        this.geDate = this.geDate.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.getEvents = this.getEvents.bind(this);
    }

    geDate () {
        const newDate = new Date(this.props.currentDate);
        newDate.setDate(this.props.day);
        return newDate;
    }


    handleDayClick(e) {
        let currentDate = this.geDate();
        console.log('click', this.props.day, currentDate.getDate());
    }

    getEvents(currentDate) {

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDate();
        return getValue(getValue(getValue(this.props.events, year, {}), month, {}), day, [])
    }

    render() {
        const currentDate =  this.geDate();
        const monthLength = moment(this.props.currentDate).date(32).date(0).toDate().getDate();
        const isFreeCell  = this.props.day <= 0 || this.props.day > monthLength;
        let className = "month-day-view";
        if (isFreeCell) {
            className  += " free-cell"
        } else if (isToday(currentDate)) {
            className += " today"
        }
        let events = this.getEvents(currentDate);
        let hiddenEventsCount = Math.max(events.length - 5, 0);
        return (
            <div className={className} onClick={this.handleDayClick}>
                <div className="day-number"><Moment date={currentDate} format="D"/></div>
                {
                    events.slice(0, 5).map(
                        (event) => {
                            return <div key={event.id} className="day-event-info">
                                <b><Moment date={event.startTime} format="HH:mm"/></b>
                                {' '}
                                {event.description || "No title"}
                            </div>;
                        }
                    )
                }
                <br />
                {
                    (hiddenEventsCount ? <a href='#' onClick={() => this.props.onShowModal(this.geDate())}>show all (+{hiddenEventsCount})</a>: "")
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        currentDate: state.calendar.currentDate,
        events: state.calendar.events.events
    }),
    dispatch => ({
        onShowModal: (date) => {
            dispatch({type: "SHOW_DAY_MODAL", payload: date})
        }
    })
)(MonthDayView);