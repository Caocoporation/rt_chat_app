/* eslint-disable no-unused-vars */
import { CREATE_ROOM_STATUS } from "../actions/actionTypes";

const initialState = {
    createRoomCloseStatus: false
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

        default: 
            return state;
    }
}

export { statusReducer };

