// import { connect } from 'react-redux';
import * as types from "./actionTypes";
// import { FETCH_MESSAGE, NEW_MESSAGE } from './actionTypes';
import axiosInstance from "../axios";
// import ChatInput from '../components/chat_component/chatroom_component/chat_input';

export const clearMessages = () => dispatch => {
    dispatch({
        type: types.CLEAR_MESSAGES,
        payload: null
    })
}

export const newMessage = (message, userId, roomCode, username) => (dispatch) => {
    dispatch({
        type: types.NEW_MESSAGE,
        payload: {
            roomCode: roomCode,
            message: message,
            userId: userId,
            username: username
        }
    });
};

export const joiningMessage = (type, message) => dispatch => {
    console.log("here is joining message");
    dispatch({
        type: types.JOINING_MESSAGE,
        payload: {
            type: type,
            message: message
        }
    })
}

export const fetchMessages = (messages_URL) => dispatch => {
    console.log("fetchMessage is running.");
    axiosInstance.get(
        messages_URL
    )
        .then((res) => {
            if ( res.data.data !== "None" ) {
                dispatch({
                    type: types.FETCH_MESSAGE,
                    payload: {
                        messages: res.data.data
                    }
                })
            }

            else {
                dispatch({
                    type: types.FETCH_MESSAGE,
                    payload: {
                        messages: []
                    }
                })
            }
        });
}

export const pushNewMessage = (message) => {
    console.log("I'm pushing message.");
    return  {
        type: types.ADD_MESSAGE,
        payload: {
            message: message
        }
    }
}

