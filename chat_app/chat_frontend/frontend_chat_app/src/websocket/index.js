/* eslint-disable no-unused-vars */
import * as types from "actions/actionTypes";
import * as websocketActions from "actions/websocketAction";
import * as messageActions from "actions/messageAction";
import * as requestActions from "actions/requestAction";
import * as notificationActions from "actions/notificationAction";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {onMessageCommand} from "./onmessage/onMessage";


// export default setupWebsocket;
var socket = null;

const websocketMiddleware = (store) => (next) => (action) => {
    console.log(store);
    
    switch (action.type) {
        case types.CONNECT_WEBSOCKET:
            console.log("it is connect");

            if ( socket !== null ) {
                socket.close();
            }

            const onOpen = (store) => (e) => {
                console.log("websocket is openned");
            }

            const onClose = (store) => (e) => {
                store.dispatch(websocketActions.websocketDisconnect(null));
            }

            const onMessage = (store) => (e) => {
                const data = JSON.parse(e.data);
                console.log(data);

                const onMessageActivation = onMessageCommand(data, store);     
            }

            socket = new W3CWebSocket(action.ws_url);

            // websocket handlers
            socket.onopen = onOpen(store);
            socket.onclose = onClose(store);
            socket.onmessage = onMessage(store);

            break;

        case types.DISCONNECT_WEBSOCKET:
            console.log("It's disconnected !!!");
            if ( socket !== null ) {
                socket.close();
            }

            socket = null;

            break;

        case types.INVITE_REQUEST:
            const payload = action.payload;
            console.log(payload);
            if (socket.bufferedAmount === 0) {
                socket.send(JSON.stringify(payload));
            }

            else {
                alert("Check Websocket Connection");
            }
           
            break;

    
        case types.ACCEPT_INVITE_REQUEST:
            console.log("Invite request has been accepted");

            if (socket.bufferedAmount === 0) {
                socket.send(JSON.stringify(action.payload));
            }

            break;

        case types.DENY_INVITE_REQUEST:
            if (socket.bufferedAmount === 0) {
                socket.send(JSON.stringify(action.payload));    
            }

            break;

        case types.NEW_MESSAGE:
            console.log(socket.bufferedAmount);

            if (socket.bufferedAmount === 0) {
                console.log(action);
                socket.send(JSON.stringify({
                    command: "sending_message",
                    room_code: action.payload.roomCode,
                    message: action.payload.message,
                    user_id: action.payload.userId,
                    username: action.payload.username
                }));    
            }

            break;

        default:
            return next(action);
    }
}

export default websocketMiddleware;