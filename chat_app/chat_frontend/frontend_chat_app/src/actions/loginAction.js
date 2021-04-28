/* eslint-disable no-unused-vars */
import { LOGIN, LOGOUT } from './actionTypes';
import axiosInstance from "../axios";

const loginAction = (user_data) => dispatch => {
    console.log(user_data);

    const fetchUserInfor = async (user_data) => {
        await axiosInstance.get("/user/user_details")
            .then((res) => {
                if (res.data.data !== "None") {
                    res.data.data.profile_image = `http://127.0.0.1:8000${res.data.data.profile_image}`;

                    // console.log(res.data.data.profile_image);

                    dispatch({
                        type: LOGIN,
                        payload: {
                            flag: true,
                            user: user_data, 
                            detailed_user: res.data.data
                        }
                    })
                }
        })
    }

    fetchUserInfor(user_data);
}

const logoutAction = () => dispatch => {
    dispatch({
        type: LOGOUT,
        payload: {
            flag: false,
            user: null,
            detailed_user: null
        }
    })
}


export { loginAction, logoutAction };