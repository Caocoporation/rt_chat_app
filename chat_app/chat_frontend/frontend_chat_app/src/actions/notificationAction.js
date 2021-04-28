import axiosInstance from "../axios";
import * as types from "../actions/actionTypes";

export const fetchNotifications = (notification_URL) => dispatch => {
    console.log("fetchNotification is running.");
    axiosInstance.get(
        notification_URL
    )
        .then((res) => {
            console.log("NOTIFICATION: ", res.data.data);
            if ( res.data.data !== "None" ) {
                dispatch({
                    type: types.FETCH_NOTIFICATION,
                    payload: res.data.data
                })
            }

            else {
                dispatch({
                    type: types.FETCH_NOTIFICATION,
                    payload: []
                })
            }
        });
};

export const addNotifications = (data) => dispatch => {
    dispatch({
        type: types.ADD_NOTIFICATION,
        payload: data
    });
};

export const removeNotifications = (notification) => dispatch => {
    dispatch({
        type: types.REMOVE_NOTIFICATION,
        payload: {
            command: "remove_notification",
            notification: notification
        }
    });
};