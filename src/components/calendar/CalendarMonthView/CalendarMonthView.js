import React, {Component} from "react";
import moment from "moment";
import MonthDayView from "../MonthDayView/MonthDayView";
import "./styles.css";
import { connect } from "react-redux";

class CalendarMonthView extends Component {
    render() {
        const startDate = moment(this.props.currentDate).date(1).toDate();
        const endDate = moment(this.props.currentDate).date(32).date(0).toDate();
        const startWeekDay = startDate.getDay();
        const rowsCount = Math.ceil((endDate.getDate() + startWeekDay) / 7);
        return (
            <table className="calendar-month-table">
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [...Array(rowsCount).keys()].map(
                            (rowIndex) => {
                                return <tr key={rowIndex}>
                                    {
                                        [...Array(7).keys()].map(
                                            (colIndex) => {
                                                const day = rowIndex * 7 + colIndex + 1 - startWeekDay;
                                                return (
                                                    <td key={colIndex} className="day-cell">
                                                        <MonthDayView day={day}
                                                                      weekDay={colIndex}
                                                                      week={rowIndex}/>
                                                    </td>
                                                );
                                            }
                                        )
                                    }
                                </tr>;
                            }
                        )
                    }
                </tbody>
            </table>
        );
    }
}

export default connect(
    state => ({
        currentDate: state.calendar.currentDate,
    }),
    dispatch => ({})
)(CalendarMonthView);
