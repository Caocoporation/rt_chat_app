/* eslint-disable no-unused-vars */
import { CREATE_ROOM_STATUS, HIDE_CHATBOX_STATUS } from './actionTypes';
import axiosInstance from "../axios";

const closeCreateRoomStatusAction = () => dispatch => {
    dispatch({
        type: CREATE_ROOM_STATUS,
        payload: {
            createRoomCloseStatus: false
        }
    })
}

const hideChatBoxAction = (status) => dispatch => {
    dispatch({
        type: HIDE_CHATBOX_STATUS,
        payload: {
            hideChatBoxStatus: status
        }
    })
}

export { closeCreateRoomStatusAction, hideChatBoxAction };