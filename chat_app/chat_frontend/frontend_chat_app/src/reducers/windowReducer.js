import * as types from "../actions/actionTypes";

const initialState = {
    windowSize: 0,
    windowMode: "",
    displaySection: "",
    currentSection: "chatbox-section",
    currentIcon: "chatbox-icon",
    currentModeSections: [],
    currentModeIcons: []
}

const windowReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.UPDATE_WINDOW_SIZE:
        
            return { 
                ...state, 
                windowSize: action.payload.windowSize  
            };

        case types.UPDATE_SECTION_NAME:
            return { 
                ...state, 
                currentSection: action.payload.currentSection
            };

        case types.UPDATE_ICON_NAME:
            return {
                ...state,
                currentIcon: action.payload.currentIcon
            }

        case types.CHANGE_MODE:
   
            return {
                ...state,
                windowMode: action.payload.windowMode,
                displaySection: state.windowSize <= 600 ? "chatbox-section" : "participant-section",
                currentModeSections: state.windowSize <= 600 ? [
                    "participant-section",
                    "find-user-section",
                    "room-info-section",
                    "chatbox-section"
                ] : [
                    "participant-section",
                    "find-user-section",
                    "room-info-section"
                ],
                currentModeIcons: state.windowSize <= 600 ? [
                    "participant-section",
                    "find-user-section",
                    "room-info-section",
                    "chatbox-section"
                ] : [
                    "participant-section",
                    "find-user-section",
                    "room-info-section"
                ]
            }

        default: 
            return state;
    }
}

export default windowReducer;