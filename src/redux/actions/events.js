import axios from "axios/index";
import { apiUrl } from '../../constants';

export function loadEvents () {
    return (dispatch) => {
        dispatch({type:'LOADED_EVENTS_START'});
        return axios.get(`${apiUrl}events`)
        .then((res) => {
            let events = res.data;
            dispatch({type:'LOADED_EVENTS_FINISH', payload: events})
        }).catch((err) => {
            console.log(err)
        })
    }
}

export function saveEvent (data) {
    return (dispatch) => {
        console.log('data', data);
        return axios.post(`${apiUrl}events`, data)
        .then((res) => {
            let event = res.data;
            if (data.id) {
                dispatch({type:'UPDATE_EVENT', payload: event})
            } else {
                dispatch({type:'ADD_EVENT', payload: event})
            }
            return res;
        }).catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })
    }
}
