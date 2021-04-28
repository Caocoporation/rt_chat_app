import * as types from './actionTypes';

export const websocketConnect = (ws_url) => (dispatch) => {
    dispatch({
        type: types.CONNECT_WEBSOCKET,
        ws_url: ws_url
    }) 
};

export const websocketDisconnect = (ws_url) => (dispatch) => {
    dispatch({
        type: types.DISCONNECT_WEBSOCKET,
        ws_url: ws_url
    }) 
};