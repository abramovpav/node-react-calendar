import React, {Component} from "react";


const viewModes = {
    day: "Day",
    week: "Week",
    month: "Month"
};


class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: viewModes['day']
        }
    }

    render() {
        return (
            <li>{this.props.name}</li>
        );
    }
}

export default Task;
