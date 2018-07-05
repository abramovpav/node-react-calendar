import React, {Component} from "react";
import "./styles.css";
import Moment from 'react-moment';
import { Link } from "react-router-dom";

const hourHeight = 60;

class Event extends Component {

    extractUrlPart(event) {
        const date = event.startTime;
        return [date.getFullYear(), date.getMonth(), date.getDate(), event.id].join('/');
    }

    render() {
        let event = this.props.event;
        let startHour = event.startTime.getHours();
        let startMinutes = event.startTime.getMinutes();
        let endHour = event.endTime.getHours();
        let endMinutes = event.endTime.getMinutes();
        let style = {
            top: hourHeight + 1 + startHour * hourHeight + startMinutes + startHour, /* header + headerBorder + hoursHeight + minutesHeight + borders of previous cells */
            left: "calc(" + this.props.currentIndex + "*(100%/" + this.props.eventsCount + "))",
            height: hourHeight * (endHour - startHour) + endMinutes - startMinutes - 2 - 2, /*2px for border, 2px for offset*/
            width: "calc(100%/" + this.props.eventsCount + " - 2px)", /* 2px for its own border */
            border: "1px solid #9FC6E7",
            backgroundColor: "#E4EFF8"
        };
        return (
            <div className="day-event" style={style}>
                <div className="event-time-text">
                    <Moment format="HH:mm">{event.startTime}</Moment>
                    {' - '}
                    <Moment format="HH:mm">{event.endTime}</Moment>
                </div>
                <Link to={"/calendar/edit-event/" + this.extractUrlPart(event)}>
                    <div className="event-description">{event.description || "No title"}</div>
                </Link>

            </div>
        );
    }
}
export default Event;