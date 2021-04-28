/* eslint-disable no-unused-vars */
import * as types from "../actions/actionTypes";

const initialState = {
    messages: [],
    message: null
}

const setMessages = (state=initialState, action) => {
    // console.log(action.payload);
    switch (action.type) {
        case types.FETCH_MESSAGE:
            console.log("FETCH_MESSAGE results: ", action.payload);
            return {
                ...state,
                messages: [...action.payload.messages],
            };

        case types.NEW_MESSAGE:
            return {
                ...state,
                message: action.payload,
            }

        case types.JOINING_MESSAGE:
            return {
                ...state,
                message: action.payload
            }

        case types.CLEAR_MESSAGES:
            console.log("CLEAR_MESSAGE is running: ", action.payload);
            return {
                ...state,
                message: null,
                messages: [],
            }

        case types.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.message],
                message: action.payload.message,
            }

        default: 
            return state;
    }
}


export { setMessages };

