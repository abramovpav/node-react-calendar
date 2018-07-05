import viewModes from "../constants";

const initialState = viewModes.month;

export default function mode(state = initialState, action){
    if (action.type === "CHANGE_MODE") {
        return action.payload;
    }
    return state;
}