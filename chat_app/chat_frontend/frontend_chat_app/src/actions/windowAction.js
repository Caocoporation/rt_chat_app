import * as types from './actionTypes';

// export const currentWindowSize = (windowSize) => (dispatch) => {
//     dispatch({
//         type: types.GET_CURRENT_WINDOW_SIZE,
//         payload: {
//             currentWindowSize: windowSize
//         }
//     }) 
// };

export const updateWindowSize = (windowSize) => (dispatch) => {
    dispatch({
        type: types.UPDATE_WINDOW_SIZE,
        payload: {
            windowSize: windowSize
        }
    }) 
};

export const updateSidebarBodyCurrentSection = (sectionClassName) => (dispatch) => {
    dispatch({
        type: types.UPDATE_SECTION_NAME,
        payload: {
            currentSection: sectionClassName
        }
    }) 
}

export const updateSidebarBodyCurrentIcon = (sectionClassName) => (dispatch) => {
    dispatch({
        type: types.UPDATE_ICON_NAME,
        payload: {
            currentIcon: sectionClassName
        }
    }) 
}

export const changeMode = (windowSize) => (dispatch) => {
    dispatch({
        type: types.CHANGE_MODE,
        payload: {
            windowMode: windowSize <= 600 ? "mobile" : "desktop"
        }
    }) 
};

