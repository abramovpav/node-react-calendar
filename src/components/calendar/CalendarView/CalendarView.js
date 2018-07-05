import React, {Component} from "react";
import ButtonsPanel from "../ButtonsPanel/ButtonsPanel";
import CalendarBaseView from "../CalendarBaseView/CalendarBaseView";

class CalendarView extends Component {

    render() {
        return (
            <div className="calendar-container">
                <ButtonsPanel />
                <CalendarBaseView />
            </div>
        );
    }
}

export default CalendarView;
