import React, {Component} from 'react';
import Calendar from '../components/calendar/Calendar';


class CalendarPage extends Component {
    render() {
        return (
            <Calendar match={this.props.match}/>
        );
    }
}

export default CalendarPage;
