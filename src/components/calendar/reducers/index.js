import { combineReducers } from "redux";
import events from "./events";
import currentDate from "./date";
import mode from "./mode";
import modalState from "./modalState";

export default combineReducers({
    events,
    currentDate,
    mode,
    modal: modalState
});