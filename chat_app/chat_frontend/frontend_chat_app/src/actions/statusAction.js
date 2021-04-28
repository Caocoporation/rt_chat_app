/* eslint-disable no-unused-vars */
import { CREATE_ROOM_STATUS } from './actionTypes';
import axiosInstance from "../axios";

const closeCreateRoomStatusAction = () => dispatch => {
    dispatch({
        type: CREATE_ROOM_STATUS,
        payload: {
            createRoomCloseStatus: false
        }
    })
}



export { closeCreateRoomStatusAction };