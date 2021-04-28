/* eslint-disable no-unused-vars */
import * as types from "./actionTypes";

export const friendingRequest = (data) => (dispatch) => {
    dispatch({
        type: types.FRIENDING_REQUEST,
        payload: data
    })
}

export const inviteRequest = (data) => (dispatch) => {
    dispatch({
        type: types.INVITE_REQUEST,
        payload: data
    });
}

export const newInviteRequest = (data) => (dispatch) => {
    console.log("NEW INVITE ACTION is activated.");
    dispatch({
        type: types.ADD_NEW_REQUEST,
        payload: data
    })
}

export const acceptInviteRequest = (data) => (dispatch) => {
    console.log("ACCEPT invite request");
    dispatch({
        type: types.ACCEPT_INVITE_REQUEST,
        payload: data
    })
}

export const denyInviteRequest = (data) => (dispatch) => {
    console.log("DENY invite request");
    dispatch({
        type: types.DENY_INVITE_REQUEST,
        payload: data
    })
}

export const refreshRequest = () => (dispatch) => {
    dispatch({
        type: types.REFRESH_REQUEST,
        payload: null
    })
}


