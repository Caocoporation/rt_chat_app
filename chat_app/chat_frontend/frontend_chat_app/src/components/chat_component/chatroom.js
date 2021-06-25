/* eslint-disable no-unused-vars */
import React from 'react';
// import RenderMessages from './render_stuff/RenderMessages';
import { w3cwebsocket as W3CWebSocket} from "websocket";
import jwt_decode from 'jwt-decode';
import axiosInstance from '../../axios';

import moment from 'moment';
// import { Header } from './header_footer/index';
// import { NotificationContext } from "../providers";

import { ChatBox, ChatInput, ChatSideBar } from "./chatroom_component";
import { connect } from 'react-redux';
import {websocketConnect} from '../../actions/websocketAction';

import styled from "styled-components";

class ChatRoom extends React.Component {

    state = {
        messages: [],
        notifications: [],
        username: localStorage.getItem('username'),
        roomCode: this.props.match.params.roomCode,
        roomName: "",
        user_id: this.getUserId(),
        // chatSectionClassName: this.props.window.chatboxWindowClassName
    }

    websocketConnection = () => {
        var client = `ws://127.0.0.1:8000/ws/chat/${this.state.roomCode}/${this.state.user_id}/`;
        this.props.websocketConnect(client);
    }

    getUserId () {
        var accessToken = localStorage.getItem("access_token");
        
        if (accessToken !== null) {
            var payload = jwt_decode(accessToken);
            return payload.user_id;
        }
    }

    componentDidMount() {
        this.websocketConnection();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.listOfUsers !== this.state.listOfUsers) {
            this.setState({ listOfUsers: this.state.listOfUsers });
        }
    }

    render() {  
        return (     
            <ChatRoomWrapper>
                <InternalChatRoom>
                    <ChatSideBar 
                        roomCode = { this.state.roomCode } />
              
                    <ChatSection 
                        className="chatbox-section-c" >
                        <ChatBox 
                            roomCode = { this.state.roomCode }  />

                        <ChatInput 
                            userId = { this.props.user.user_id }
                            roomCode = { this.state.roomCode } 
                            username = { this.props.user.username }  />

                    </ChatSection>
                          
                </InternalChatRoom>
            </ChatRoomWrapper>
        )
    }   
}

const ChatRoomWrapper = styled.div`
    background-color: rgba(15, 15, 45);
`;

const InternalChatRoom = styled.div`
    background-color: rgba(15, 15, 15);
    display: flex;
    justify-content: center;
    padding: 0px;

    @media only screen and (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
`;

const ChatSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    background-color: violet;
    
    @media only screen and (max-width: 600px) {
        display: none;
        width: 100%;
    }
`;

const mapStateToProps = (state) => {
    return {
        isLogin: (state.setUserStatus.isLogin).toString(),
        user: state.setUserStatus.user.user,
        status: state.status,
        window: state.window
    }
}

export default connect(mapStateToProps, {websocketConnect}) (ChatRoom);
