import React, {Component} from "react";
import CalendarDayView from "../CalendarDayView/CalendarDayView";
import { connect } from "react-redux";
import moment from "moment";

class CalendarWeekView extends Component {

    constructor(props) {
        super(props);
        this.buildDate = this.buildDate.bind(this);
    }

    buildDate(weekDay) {
        return moment(this.props.currentDate).day(weekDay).toDate()
    }

    render() {
        return (
            <div className="week-container">
                {
                    [...Array(7).keys()].map(
                        (weekDay) => {

                            return <CalendarDayView key={weekDay} forceDate={this.buildDate(weekDay)} />
                        }
                    )
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        currentDate: state.calendar.currentDate
    })
)(CalendarWeekView);
