/* eslint-disable no-unused-vars */
import { combineReducers } from "redux";
import websocketReducer from "./websocketProducer";
import { setUserStatus } from "./userProducer";
import { setMessages } from "./messageProducer";
import { requestReducer} from "./requesReducer";
import { notificationReducer } from "./notificationProducer";
import { roomReducer } from "./roomReducer";
import { statusReducer } from "./statusReducer";
import windowReducer from "./windowReducer";

const rootReducer = combineReducers ({
    websocket: websocketReducer,
    setUserStatus: setUserStatus,
    setMessages: setMessages,
    request: requestReducer,
    notifications: notificationReducer,
    room: roomReducer,
    status: statusReducer,
    window: windowReducer
})

export default rootReducer;
