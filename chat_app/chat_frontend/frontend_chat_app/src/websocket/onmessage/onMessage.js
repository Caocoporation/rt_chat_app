/* eslint-disable no-unused-vars */
import * as messageActions from "../../actions/messageAction";
import * as requestActions from "../../actions/requestAction";
import * as notificationActions from "../../actions/notificationAction";
import * as roomActions from "../../actions/roomAction";
// import * as roomActions from "../../actions/roomAction";

export const onMessageCommand = (data, store) => {
    console.log(data);

    switch(data.type) {
        case "JOINING_NOTICE":
            console.log("True");
            store.dispatch(messageActions.joiningMessage(data.type, data.message));
            break;

        case "NEW_MESSAGE":
            console.log("We are using NEW_MESSAGE");
            store.dispatch(messageActions.pushNewMessage(data));

            const focusOnBottom = () => {
                try {
                    const messageDisplayContainer = document.querySelector("#message-display-container");
                    messageDisplayContainer.scrollTop = messageDisplayContainer.scrollHeight;
                }
                
                catch (err) {
                    console.log(err);
                }
            }

            focusOnBottom();

            break;

        case "INVITE_REQUEST":
            console.log("We are using INVITE_REQUEST")
            console.log(data.notification);

            store.dispatch(requestActions.newInviteRequest(data));
            store.dispatch(notificationActions.addNotifications(data.notification));
            
            break;

        case "FAILED_INVITE_REQUEST":
            console.log("We are using FAILED_INVITE_REQUEST")
            store.dispatch(requestActions.newInviteRequest(data));

            break;

        case "INVITE_REQUEST_ACCEPTION":
            console.log("We are using INVITE REQUEST ACCEPTION");
            store.dispatch(roomActions.getRoom(data.room));
            store.dispatch(roomActions.fetchRooms("/r_room"));
            store.dispatch(notificationActions.removeNotifications(data.notification))

            break;

        case "FRIENDING_REQUEST":
            break;

        default:
            break;
    }
}


