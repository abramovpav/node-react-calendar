import React, {Component} from "react";
import viewModes from "../constants";
import { connect } from "react-redux";

import Moment from "../../Moment/Moment";

class CurrentDateView extends Component {

    render() {
        const viewMode = this.props.mode;
        let format = "MMM, Do YYYY";
        if (viewMode === viewModes.week) {
            format = "MMM YYYY wo [week]"
        } else if (viewMode === viewModes.month) {
            format = "MMMM YYYY"
        }
        return (
            <Moment date={this.props.currentDate} format={format}/>
        );
    }
}

export default connect(
    state => ({
        mode: state.calendar.mode,
        currentDate: state.calendar.currentDate
    }),
    dispatch => ({})
)(CurrentDateView);
