import React, {Component} from "react";
import moment from "moment";

class Moment extends Component {

    render() {
        let date = this.props.date;
        let formattedDate = moment(date).format(this.props.format);
        return (
            <span>{formattedDate}</span>
        );
    }
}
export default Moment;