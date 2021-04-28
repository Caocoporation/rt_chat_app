import * as types from "../actions/actionTypes";

const initialState = {
    windowSize: 0
}

const windowReducer = (state=initialState, action) => {
    // console.log(action.payload);
    switch (action.type) {
        case types.UPDATE_WINDOW_SIZE:
            console.log("window size is changed");
            return { 
                ...state, 
                windowSize: action.payload.windowSize  
            };

        default: 
            return state;
    }
}

export default windowReducer;