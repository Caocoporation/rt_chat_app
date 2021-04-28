/* eslint-disable no-unused-vars */
import * as types from "../actions/actionTypes";

const initialState = {
    request: null,
    newRequest: null
}

export const requestReducer = (state=initialState, action) => {
    // console.log(action.payload);
    switch (action.type) {
        case types.INVITE_REQUEST:
            console.log("INVITE REQUEST is activated.");

            return { ...state, request: action.payload  };

        case types.FRIENDING_REQUEST:
            return { ...state, request: action.payload };

        case types.ADD_NEW_REQUEST:
            console.log("ADD NEW REQUEST is activated.");
            console.log(action.payload);
            return {...state, newRequest: action.payload };

        default: 
            return state;
    }
}


