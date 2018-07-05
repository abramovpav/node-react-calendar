import React, {Component} from "react";
import "./styles.css";
import Event from "../Event/Event";
import DayHeader from "./DayHeader";
import { connect } from "react-redux";
import getValue from "../../utils/utils";
import isToday from "../helpers";

class CalendarDayView extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    compareEventsByTime(event1, event2) {
        const time1 = event1.startTime.getTime();
        const time2 = event2.startTime.getTime();
        if (time1 < time2) return -1;
        if (time1 > time2) return 1;
        return 0;
    }

    getData(currentDate) {

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDate();
        return getValue(getValue(getValue(this.props.events, year, {}), month, {}), day, [])
    }

    getPeriods(currentDate) {
        const events = this.getData(currentDate);
        let periods = [];
        const sortedEvents = events.sort(this.compareEventsByTime);
        if (sortedEvents.length > 0) {
            periods.push({
                startTime: sortedEvents[0].startTime,
                endTime: sortedEvents[0].endTime,
                events: []
            })
        }
        for (let item of sortedEvents) {
            const lastPeriod = periods[periods.length - 1];
            if (item.startTime < lastPeriod.endTime) {
                lastPeriod.events.push(item);
                if (lastPeriod.endTime < item.endTime) {
                    lastPeriod.endTime = item.endTime
                }
            } else {
                periods.push({
                    startTime: item.startTime,
                    endTime: item.endTime,
                    events: [item]
                });
            }
        }

        return periods
    }

    render() {
        let currentDate = this.props.currentDate;
        if (this.props.forceDate) {
            currentDate = this.props.forceDate;
        }
        const periods = this.getPeriods(currentDate);
        return (
            <div className={isToday(currentDate) ? "event-info-container today" : "event-info-container"}>
                <DayHeader date={currentDate} className="event-info day-header" />
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                <div className="event-info"/>
                {
                    periods.map(
                        (period) => {

                            return period.events.map((item, index) => <Event key={item.id} event={item}
                                                                      currentIndex={index}
                                                                      eventsCount={period.events.length}/>);
                        }
                    )
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
    dispatch => ({})
)(CalendarDayView);
