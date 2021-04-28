import * as types from "../actions/actionTypes";
// import notification from "../components/header_component/notification";


const initialState = {
    counter: 0,
    notifications: []
}

export const notificationReducer = (state=initialState, action) => {
    // console.log(action.payload);
    switch (action.type) {
        case types.FETCH_NOTIFICATION:
            console.log("INVITE REQUEST is activated.");

            var reversed_notifications = [...action.payload];
            reversed_notifications.reverse();

            var counter = reversed_notifications.length;

            return { ...state, counter: counter, notifications: [...reversed_notifications] };

        case types.ADD_NOTIFICATION:
            console.log("ADD_NOTIFICATION is activated.");
            var notifications = state.notifications;
            notifications.unshift(action.payload);
            return { ...state, counter: state.counter + 1, notifications: [...state.notifications] }

        case types.REMOVE_NOTIFICATION:
            var current_notifications = [...state.notifications];

            var notification = current_notifications.find((notificaiton) => notificaiton.id === action.payload.notification.id);

            var notification_index = current_notifications.indexOf(notification);

            if ( notification_index !== -1 ) {
                current_notifications.splice(notification_index, 1);
            }

            return {...state, counter: state.counter - 1, notifications: [...current_notifications]};

        default: 
            return state;
    }
}