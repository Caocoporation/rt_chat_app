import * as types from './actionTypes';

export const updateWindowSize = (windowSize) => (dispatch) => {
    dispatch({
        type: types.UPDATE_WINDOW_SIZE,
        payload: {
            windowSize: windowSize
        }
    }) 
};

