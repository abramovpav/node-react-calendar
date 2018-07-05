import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from 'react-router-redux';
import getValue from "../../utils/utils";
import Datetime from "react-datetime";
import 'react-datetime/css/react-datetime.css';
import "./styles.css";
import { saveEvent } from '../../../redux/actions/events';

class CalendarEventEditor extends Component {
    constructor(props) {
        super(props);
        this.loadEvent = this.loadEvent.bind(this);
        this.state = {
            event: {
                description: '',
                startTime: null,
                endTime: null
            },
            errorMessage: ''
        };

    }

    componentDidMount() {
        if (!this.props.isLoading) {
            this.loadEvent();
        }
    }

    componentWillReceiveProps(newProps, oldProps) {
        if (this.props.isLoading === true && newProps.isLoading === false) {
            this.loadEvent(newProps);
        }
    }

    loadEvent(props) {
        props = props || this.props;
        const { match, events } = props;
        const year = parseInt(match.params.year, 10);
        const month = parseInt(match.params.month, 10);
        const day = parseInt(match.params.day, 10);
        const eventId = match.params.eventId;
        const dayEvents = getValue(getValue(getValue(events, year, {}), month, {}), day, []);
        this.setState({
            event: {
                ...this.state.event,
                ...dayEvents.filter(event => event.id === eventId)[0]
            }
        });
    }

    changeDescription(e) {
        const { value } = e.target;
        this.setState(prevState => ({
            event: {
                ...prevState.event,
                description: value
            }
        }));
    }

    changeStartTime(e) {
        if (typeof e === "string") {
            return;
        }
        this.setState(prevState => ({
            event: {
                ...prevState.event,
                startTime: e.toDate()
            }
        }));
    }

    changeEndTime(e) {
        if (typeof e === "string") {
            return;
        }
        this.setState(prevState => ({
            event: {
                ...prevState.event,
                endTime: e.toDate()
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            errorMessage: ''
        });
        this.props.saveEvent({
            ...this.state.event,
            title: this.state.event.description
        }).then((res) => {
            this.props.redirectToCalendar();
        }, (err) => {
            this.setState({
                errorMessage: err.response.data.message
            })
        });
    }

    render() {
        const { isLoading } = this.props;
        if (isLoading) {
            return (
                <div>Loading...</div>
            );
        }
        const { event, errorMessage } = this.state;
        return (
            <div>
                <h1>Event Editor</h1>
                <div className="event-edit-form-wrapper">
                    <form onSubmit={this.handleSubmit.bind(this)} className="event-edit-form">
                        <div className="errors-block">
                            { errorMessage }
                        </div>
                        <label htmlFor="startTime"><b>Start Time</b></label>
                        <Datetime value={event.startTime} onChange={this.changeStartTime.bind(this)}/>
                        <label htmlFor="endTime"><b>End Time</b></label>
                        <Datetime value={event.endTime} onChange={this.changeEndTime.bind(this)}/>
                        <label htmlFor="description"><b>Description</b></label>
                        <div>
                            <input type="text" id="description" name="description" placeholder="Description"
                                  onChange={this.changeDescription.bind(this)}
                                  value={event.description}/>
                        </div>
                        <br />
                        <button type="submit">Save</button>
                    </form>
                </div>

                <br />
                <Link to="/calendar" className="link-calendar">>>> Back to Calendar {'<<<'}</Link>
            </div>

        );
    }
}

export default connect(
    state => ({
        events: state.calendar.events.events,
        isLoading: state.calendar.events.loading
    }),
    {
        saveEvent,
        redirectToCalendar: () => (dispatch) => {
            dispatch(push('/calendar'));
        }
    }
)(CalendarEventEditor);
