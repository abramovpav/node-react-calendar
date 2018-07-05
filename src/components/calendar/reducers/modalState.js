const initialState = {
    show: false,
    date: null
};


export default function modalState(state = initialState, action){
    if (action.type === "SHOW_DAY_MODAL") {
        return {
            show: true, date: action.payload
        };
    } else if (action.type === "HIDE_DAY_MODAL") {
        return {
            show: false, date: null
        };
    }
    return state;
}