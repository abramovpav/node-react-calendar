import React, {Component} from "react";
import CalendarEventEditor from "./CalendarEventEditor/CalendarEventEditor";
import CalendarView from "./CalendarView/CalendarView";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadEvents } from "../../redux/actions/events";

class Calendar extends Component {

    componentWillMount() {
        console.log('loadEvents');
        this.props.loadEvents();
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={this.props.match.url} component={CalendarView}/>
                    <Route path={this.props.match.url + '/edit-event/:year(\\d{4})/:month(\\d{1,2})/:day(\\d{1,2})/:eventId([a-zA-Z0-9_-]+)'}
                                component={CalendarEventEditor}/>
                    <Route exact path={this.props.match.url + '/new-event'} component={CalendarEventEditor}/>
                    <Redirect to="/404" />
                </Switch>
            </div>
        );
    }
}

export default connect(
    state => ({
        mode: state.calendar.mode
    }),
    {
        loadEvents
    }
)(Calendar);
