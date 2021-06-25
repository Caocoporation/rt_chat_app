import * as types from "./actionTypes";
import axiosInstance from "../axios";

export const fetchRooms = (room_url) => (dispatch) => {
    console.log("fetch all rooms");

    axiosInstance.get(room_url)
        .then((res) => {
            console.log(res.data.data);

            if ( res.data.data !== "None" ) {
                console.log("True");

                dispatch({
                    type: types.FETCH_ROOMS,
                    payload: [...res.data.data]
                }) 
            }

            else {
                dispatch({
                    type: types.FETCH_ROOMS,
                    payload: []
                }) 
            }
            
        });
}

export const getRoom = (room) => (dispatch)  => {
    dispatch({
        type: types.UPDATE_ROOM,
        payload: {
            room: room
        }
    }) 
}

export const updateRoom = (detailed_room_url) => (dispatch)  => {
    axiosInstance.get(detailed_room_url)
        .then((res) => {
            console.log(res.data.data);

            if (res.data.data !== "None") {
                dispatch({
                    type: types.UPDATE_ROOM,
                    payload: {
                        room: res.data.data
                    }
                })
            }

            else {
                dispatch({
                    type: types.UPDATE_ROOM,
                    payload: null
                })
            }
        })
}