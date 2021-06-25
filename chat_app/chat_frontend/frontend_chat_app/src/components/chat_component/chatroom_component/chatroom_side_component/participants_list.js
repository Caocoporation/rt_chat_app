/* eslint-disable no-unused-vars */
import React from "react";
// import axiosInstance from "../../../../axios";
import axiosInstance from "axios/";
import { connect } from 'react-redux';

import {updateRoom} from "actions/roomAction";

import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { ISO_8601 } from "moment";

class ParticipantList extends React.Component {
    state = {
        listOfParticipants: []
    }

    getParticipants = () => { 
        const updateRoom = this.props.updateRoom(`/r_room/${this.props.room.room_code}`);
    }

    sendFriendingRequest = () => {

    }

    passKeyRequest = () => {

    }

    componentDidMount () {
        this.getParticipants();
    }
    
    render () {
        console.log(this.props.room.participants);

        return (
            <ListParticipantWrapper>
                {this.props.room.participants?.map((participant, index) => (
                    
                    <UserItemWrapper key={index}>
                        <UserItem key={index}>
                            <CrownIconWrapper>
                                { ( () => {
                                    if (participant.user.id === this.props.room.host.id) {                         
                                        return (
                                            <FontAwesomeIcon 
                                                icon="crown"
                                                style={ { fontSize: 20 } } />                                    
                                        )
                                    }

                                    else {
                                        return (
                                            <FontAwesomeIcon 
                                                icon={Icons.faChessPawn}
                                                style={ { fontSize: 20 } } />                                    
                                        )
                                    }
                                }) () }

                                {/* <div className="crown-icon" data-room-host={room.host}>
                                    <FontAwesomeIcon icon="crown" style={ { fontSize: 20 } } />
                                </div> */}
                            </CrownIconWrapper>

                            <UserName>{participant.user.username}</UserName>

                            <AddFriendButton
                                data-user-id={participant.user_id} 
                                onClick={this.sendFriendingRequest} >
                                    <FontAwesomeIcon 
                                        icon={Icons.faUserPlus}
                                        style={{ fontSize: 20 }}/>
                            </AddFriendButton>

                            {/* <button 
                                className="pass-key-btn" 
                                data-user-id={participant.user_id} 
                                onClick={this.passKeyRequest}>
                                Pass Room Key
                            </button> */}
                        </UserItem>
                    </UserItemWrapper>  
                ))}
            </ListParticipantWrapper>
        )
    }
}

const ListParticipantWrapper = styled.div`
    background-color: rgba(102, 101, 101, 0.5);
`;

const UserItemWrapper = styled.div`
    padding: 5px;
`;

const UserItem = styled.div`
    display: flex;
    justity-content: center;
    align-items: center;
    position: relative;
`;

const UserName = styled.p`
    color: white;
    font-size: 16px;
    font-weight: 600;
`;

const CrownIconWrapper = styled.div`
    background-color: black;
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 2px;
    margin: 5px;
    
    svg {
        color: yellow;
    }
`;

const AddFriendButton = styled.button`
    height: 35px;
    width: 35px;
    display: flex;
    justity-content: center;
    align-items: center;
    margin: 5px;
    padding: 5px;
    border-radius: 50%;
    border: none;
    position: absolute;
    right: 5px;
    background-color: rgba(102, 101, 101, 0.5);

    &:hover {
        color: white;
        background-color: rgba(102, 101, 101);
    }

    > * {
        point-events: none;
    }
`;

const mapStateToProps = function (state) {
    return {
        room: state.room.room,
        user: state.setUserStatus.user.user
    }
}

export default connect(mapStateToProps, {updateRoom})(ParticipantList);

