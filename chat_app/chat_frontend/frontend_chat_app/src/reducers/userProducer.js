/* eslint-disable no-unused-vars */
import { LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
    isLogin: false,
    user: null,
    flag: false
}

const setUserStatus = (state=initialState, action) => {
    console.log(action.payload);

    if (action.payload !== "undefined") {
        console.log("Now it's good to go");
        switch (action.type) {
            case LOGIN:
                return {
                    ...state,
                    isLogin: true,
                    user: action.payload,
                    // flag: action.payload.flag
                };
    
            case LOGOUT:
                console.log("User is logging out.");
                return {
                    ...state,
                    isLogin: false,
                    user: action.payload,
                    // flag: false
                }
    
            default: 
                return state;
        }
    }
}

export { setUserStatus };

