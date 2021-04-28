import * as types from "../actions/actionTypes";
// import notification from "../components/header_component/notification";


const initialState = {
    rooms: [],
    room: null
}

export const roomReducer = (state=initialState, action) => {
    // console.log(action.payload);

    console.log(action);

    switch (action.type) {
        case types.UPDATE_ROOM:
            return { ...state, room: action.payload.room };

        case types.GET_ROOM:
            return { ...state, room: action.payload.room };

        case types.FETCH_ROOMS:
            console.log("FETCH ROOMS");
            return { ...state,  rooms: [...action.payload]};

        default: 
            return state;
    }
}