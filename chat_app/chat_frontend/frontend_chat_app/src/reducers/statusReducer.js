/* eslint-disable no-unused-vars */
import { CREATE_ROOM_STATUS, HIDE_CHATBOX_STATUS } from "../actions/actionTypes";

const initialState = {
    createRoomCloseStatus: false,
    hideChatBoxStatus: false,
    participantSection: "hidden"
}

const statusReducer = (state=initialState, action) => {
    switch (action.type) {
        case CREATE_ROOM_STATUS:
            if (action.payload.createRoomCloseStatus === state.createRoomCloseStatus) {
                state.createRoomCloseStatus = true;
            }

            else {
                state.createRoomCloseStatus = false;
            }

            return {
                ...state,
            };

        case HIDE_CHATBOX_STATUS:       
            state.hideChatBoxStatus = action.payload.hideChatBoxStatus;
       
            return {
                ...state,
            };

        default: 
            return state;
    }
}

export { statusReducer };

