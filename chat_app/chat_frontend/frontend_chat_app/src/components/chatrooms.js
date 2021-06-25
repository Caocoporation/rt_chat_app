/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
// import ChatSide from './side_panels/ChatSidePanel';
import axiosInstance from "../axios";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import jwt_decode from 'jwt-decode';
// import { WebsocketContext, LoginContext } from "../provider"
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {websocketConnect} from 'actions/websocketAction';
import { connect } from 'react-redux';

import {fetchRooms, getRoom} from "actions/roomAction";
import { CreateChatRoom } from "../components/chat_component";

import styled from "styled-components";

// import {ArrowForwardRounded} from "@material-ui/icons"

class ChatRooms extends React.Component {
   
    state = {
        rooms: [],
        notification_room: "notification",
        lobby: "h2GyJJL9eIXYfv4"
    }

    getUserId () {
        var accessToken = localStorage.getItem("access_token");
        
        if (accessToken !== null) {
            var payload = jwt_decode(accessToken);
            return payload.user_id;
        }
    }
    handleCloseButton = (e) => {
        if (this.state.closeStatus === true) {
            this.setState({closeStatus: false })
        }

        else {
            this.setState({ closeStatus: true })
        }
    }

    connectToWebsocket = () => {
        var client = `ws://127.0.0.1:8000/ws/chat/${this.state.lobby}/${this.props.user.user_id}/`;
        this.props.websocketConnect(client);
    }

    collectRoomCode(e) {
        const fetch_chat_rooms = this.props.fetchRooms("/r_room");
    }

    componentDidMount() {
        this.connectToWebsocket();
        this.collectRoomCode();
    }

    connectToChatRoom = async (e) => {
        var room_code = e.target.getAttribute("data-room-code");
        var rooms = this.props.rooms;
        var room = rooms.find((room) => room.room_code === room_code)

        await this.props.getRoom(room);
        window.location.href = `/chat/chatroom/${room_code}/`;
    }

    render() {
        return (
            <ExternalWrapper>
                <ListRoomWrapper>
                    <ListRooms>
                        {this.props.rooms.map((room, index) => ( 
                            <Room key={index}>
                                {(() => {
                                    if (room.host.id === this.props.user.user_id) {                      
                                        return (
                                            <CrownIconWrapper>
                                                <FontAwesomeIcon 
                                                    icon="crown"
                                                    style={ { fontSize: 20  } } />
                                            </CrownIconWrapper>
                                        )
                                    }
                                })()}

                                <RoomName>{room.room_name}</RoomName>
                                <EnterRoomButton 
                                    onClick={this.connectToChatRoom}
                                    data-room-code={room.room_code} >
                                    <FontAwesomeIcon 
                                        icon={Icons.faSignInAlt}
                                        style={ { fontSize: 20 } } />
                                </EnterRoomButton>
                            </Room>
                        ))}
                    </ListRooms>
                </ListRoomWrapper>
               
            </ExternalWrapper>
        )
    }   
}

const ExternalWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
`

const ListRoomWrapper = styled.div`
    background-color: grey;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 750px;
    z-index: 1;
`;

const ListRooms = styled.ul`
    list-style-type:none;
    display: flex;
    flex-direction: column;
`;

const Room = styled.li`
    display: flex;
    margin: 10px;
    background-color: rgba(24, 26, 25);
    color: white;
    height: 50px;
    width: 350px;
    align-items: center;
    padding: 10px;
    position: relative;
`;

const CrownIconWrapper = styled.div`
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;

    svg {
        background-color: transparent;
        color: yellow;
    }
`;

const RoomName = styled.span`
    margin: 10px;
    font-weight: 600;
    font-size: 17px;
`;

const EnterRoomButton = styled.button`
    background-color: rgba(133, 133, 133, 0.2);
    height: 35px;
    width: 35px;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    position: absolute;
    right: 10px;

    > * {
        pointer-events: none;
    }

    &:hover {
        background-color: rgba(133, 133, 133, 0.6);
    }

    svg {
        background-color: transparent;
    }
`;

const mapStateToProps = (state) => {
    return {
        websocket: state.websocket.ws_url,
        user: state.setUserStatus.user.user,
        room: state.room,
        rooms: state.room.rooms,
        createRoomStatus: state.status.createRoomCloseStatus
    }
}

export default connect(
    mapStateToProps, 
    { websocketConnect, fetchRooms, getRoom }
)(ChatRooms);