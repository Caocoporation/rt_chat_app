/* eslint-disable no-unused-vars */
import * as types from "../actions/actionTypes";

const initialState = {}

const websocketReducer = (state=initialState, action) => {
    // console.log(action.payload);
    switch (action.type) {
        case types.CONNECT_WEBSOCKET:
            console.log("true, it's websocket connection");
            return { ...state, ws_url: action.ws_url  };

        case types.DISCONNECT_WEBSOCKET:
            return { ...state, ws_url: action.ws_url };

        default: 
            return state;
    }
}

export default websocketReducer;

