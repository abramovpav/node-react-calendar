import React, {Component} from "react";
import Moment from "../../Moment/Moment";
import isToday from "../helpers";

class DayHeader extends Component {
    render() {
        let today = isToday(this.props.date);
        let classes = this.props.className;
        if (today) {
            classes += " today"
        }
        return (
            <div className={classes}>
                <Moment date={this.props.date} format="ddd, M/D"/>
            </div>
        );
    }
}


export default DayHeader;