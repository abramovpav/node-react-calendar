import viewModes from "../constants";
import moment from "moment";

const initialState = new Date();

function getDate(state, mode, direction) {
    let newDate = new Date(state);
    if (mode === viewModes.day) {
        newDate.setDate(newDate.getDate() + 1 * direction);
    } else if (mode === viewModes.week) {
        newDate = moment(newDate).day(7 * direction).toDate()
    } else {
        newDate = moment(newDate).date(direction > 0 ? 32 : 0).date(1).toDate()
    }
    return newDate;
}

export default function currentDate(state = initialState, action){
    if (action.type === "NEW_DATE") {
        return action.payload;
    } else if (action.type === "NEXT_DATE") {
        return getDate(state, action.payload, 1);
    } else if (action.type === "PREV_DATE") {
        return getDate(state, action.payload, -1);
    }
    return state;
}