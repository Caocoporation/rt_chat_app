/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from 'react';
import { LoginContext } from '../../provider/login_provider';
import {connect} from "react-redux";
import {fetchNotifications, removeNotifications} from "../../actions/notificationAction";
import {updateRoom} from "../../actions/roomAction";
import {acceptInviteRequest, denyInviteRequest} from "../../actions/requestAction";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

// CSS


class Notification extends React.Component {
    state = {
        notification_state: false
    }

    getNotifications = () => {
        console.log(this.props.user);
        if (this.props.user !== null) {
            this.props.fetchNotifications(`http://127.0.0.1:8000/r_chat_notification/${this.props.user.user_id}/`);
        }
    }

    displayNotifications = (e) => {
        var notification_wrapper = document.querySelector(".notification-wrapper");
        
        if (this.state.notification_state === false) {
            this.setState({notification_state: true });
        } 

        else {
            this.setState({notification_state: false });
        }
        
    }

    handleInviteRequest = (e) => {
        console.log("A invite request has been handled.");
        console.log(e.target.getAttribute("data-notification-id"));

        var notification_id = e.target.getAttribute("data-notification-id");
        var notifications = this.props.notifications.notifications
        var notification = notifications.find(obj => obj.id === parseInt(notification_id));

        console.log(notification);

        console.log(this.props.user);

        console.log(this.props.notifications);

        if (this.props.user !== null) {
            var data = {
                command: "accepting_invite_request",
                user: this.props.user,
                notification: notification
            }

            this.props.acceptInviteRequest(data);
        }
    }

    denyInviteRequest = (e) => {
        var notification_id = e.target.getAttribute("data-notification-id");
        var notifications = this.props.notifications.notifications
        var notification = notifications.find(obj => obj.id === parseInt(notification_id));

        if (this.props.user !== null) {

            var data = {
                command: "deny_invite_request",
                user: this.props.user,
                notification: notification
            }

            this.props.denyInviteRequest(data);
        }
    }

    componentDidMount() {
        this.getNotifications();
    }
    
    render() {
        console.log(this.props.notifications);

        return(
            <NotificationCard>
                <NotificationIconWrapper>
                    <FontAwesomeIcon 
                        icon="bell"
                        style={ {fontSize: 23 } } 
                        onClick={this.displayNotifications} />               
                    {(() => {
                        if (this.props.notifications.counter > 0) {
                            return (
                                <NotificationCounterWrapper>                            
                                    <NotificationCounter>
                                        {this.props.notifications.counter}
                                    </NotificationCounter>
                                </NotificationCounterWrapper> 
                            )   
                        }
                    })()}                    
                </NotificationIconWrapper>
                
                {(() => {
                    if (this.state.notification_state === true) {
                        return(
                            <NotificationWrapper>
                                {this.props.notifications.notifications.map((notification, index) => {
                                        const senderAvatar = `http://127.0.0.1:8000${notification.sender.user.profile_image}`;

                                        return (
                                            <NotificationItem 
                                                id={notification.id} 
                                                key={index}>

                                                <UpperNotification>
                                                    <SenderAvatarWrapper>
                                                        <SenderAvatar 
                                                            src={senderAvatar} 
                                                            alt="No IMG" />

                                                    </SenderAvatarWrapper>
                                                </UpperNotification>

                                                <LowerNotification>
                                                    <SenderName>
                                                        {notification.sender.user.username}
                                                    </SenderName>
                                                    <NotificationContent>
                                                        {notification.message}
                                                    </NotificationContent>
                                                    <FunctionalButtonWrapper>
                                                        <AcceptButton
                                                            className="accept-button" 
                                                            type="button" 
                                                            value="Accept" 
                                                            data-notification-id={notification.id}
                                                            onClick={this.handleInviteRequest}/>

                                                        <DenyButton
                                                            className="deny-button" 
                                                            type="button" 
                                                            value="Deny" 
                                                            data-notification-id={notification.id}
                                                            onClick={this.denyInviteRequest}/>

                                                    </FunctionalButtonWrapper>
                                                </LowerNotification>

                                                <InviteAt>
                                                    {moment(notification.invited_at).startOf("minute").fromNow()}
                                                </InviteAt>
                                            </NotificationItem>     
                                        )           
                                })}
                            </NotificationWrapper>
                        )
                    }
                })()}
                
            </NotificationCard>
        )
    }
}

const NotificationCard = styled.div`
    width: 80px;
    height: 80px;
    background-color: transperent;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const NotificationIconWrapper = styled.div`
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(207,207,207);
    border-radius: 50%;
    position: relative;

    &:hover {
        background-color: rgb(153, 153, 153);
    }
`;

const NotificationCounterWrapper = styled.div`
    position: absolute;
    top: 35px;
    right: 0px;
    width: 15px;
    height: 15px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1px;
    border-radius: 50%;
`;

const NotificationCounter = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14px;
    padding: 1px;
`;

const NotificationWrapper = styled.div`
    width: 300px;
    background-color: rgba(89, 89, 89);
    color: white;
    position: absolute;
    top: 85px;
    left: 0px;
    z-index: 1;
`;

const NotificationItem = styled.div`
    display: flex;
`;

const InviteAt = styled.small`
    position: absolute;
    right: 5px;
    font-size: 13px;
    font-weight: 600;
`;

const LowerNotification = styled.div`
    padding: 5px 5px 5px 10px;
`;

const FunctionalButtonWrapper = styled.div` 
    display: flex;
`;

const NotificationContent = styled.p`
    font-size: 15px;
    font-weight: 400;
`;

const SenderName = styled.label`

`;

const UpperNotification = styled.div``;

const SenderAvatarWrapper = styled.div`
    height: 50px;
    width: 50px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SenderAvatar = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AcceptButton = styled.input`
    height: 25px;
    width: 50px;
    display: flex;
    margin-right: 20px;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    background-color: rgba(82, 82, 82);
    border-color: rgba(82, 82, 82);
    color: white;
    font-weight: 600;

    &:hover {
        background-color: rgba(59, 59, 59);
    }
`;

const DenyButton = styled.input`
    height: 25px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    color: white;
    font-weight: 600;
    background-color: rgba(82, 82, 82);
    border-color: rgba(82, 82, 82);

    &:hover {
        background-color: rgba(59, 59, 59);
    }
`;

const mapStateToProps = state => {
    return {
        notifications: state.notifications,
        user: state.setUserStatus.user.user
    }
}

export default connect(
    mapStateToProps, 
    {
        fetchNotifications,
        acceptInviteRequest,
        denyInviteRequest,
        updateRoom,
        removeNotifications
    }
) (Notification) ;