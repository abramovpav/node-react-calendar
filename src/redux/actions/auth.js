import axios from "axios/index";

import { apiUrl } from '../../constants';

export function loadUser () {
    return (dispatch) => {
        return axios.get(`${apiUrl}user`)
            .then((res) => {
                dispatch({type:'LOAD_USER', payload: res.data});
                return res;
            }).catch((err) => {
                dispatch({type:'LOAD_USER_FAILED', payload: null});
                return err;
            })
    }
}

export function signup (data) {
    return (dispatch) => {
        return axios.post(`${apiUrl}signup`, data)
            .then((res) => {
                dispatch({type:'LOGIN_SUCCESS', payload: res.data});
                return res;
            }, (err) => {
                dispatch({type:'SIGNUP_FAILED', payload: null});
                return Promise.reject(err);
            });
    }
}

export function login (data) {
    return (dispatch) => {
        return axios.post(`${apiUrl}login`, data)
            .then((res) => {
                dispatch({type:'LOGIN_SUCCESS', payload: res.data});
                return res;
            }, (err) => {
                dispatch({type:'LOGIN_FAILED', payload: null});
                return Promise.reject(err);
            });
    }
}

export function logout (data) {
    return (dispatch) => {
        return axios.post(`${apiUrl}logout`, data)
            .then((res) => {
                dispatch({type:'LOGOUT'})
            }).catch((err) => {
                return Promise.reject(err);
            });
    }
}