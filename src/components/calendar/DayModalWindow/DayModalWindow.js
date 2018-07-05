import React, {Component} from "react";
import { connect } from "react-redux";

import ReactModal from "react-modal";
import CalendarTableView from "../CalendarTableView/CalendarTableView";

class DayModalWindow extends Component {

    render() {
        return (
            <ReactModal isOpen={this.props.showModal}
                        contentLabel="Minimal Modal Example">
                <div style={{textAlign: "right"}}>
                    <button onClick={this.props.onHideModal}>Close X</button>
                </div>
                <CalendarTableView forceDate={this.props.modalDayDate}/>
            </ReactModal>
        );
    }
}

export default connect(
    state => ({
        showModal: state.calendar.modal.show,
        modalDayDate: state.calendar.modal.date,
    }),
    dispatch => ({
        onHideModal: () => {
            dispatch({type: "HIDE_DAY_MODAL"})
        }
    })
)(DayModalWindow);