/* eslint-disable no-unused-vars */
import React from "react";
import {connect} from "react-redux";
import {inviteRequest} from "actions/requestAction";
// import axiosInstance from "../../../../../axios";
import styled from "styled-components";
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchPopup extends React.Component {
    state = {
        listOfUsers: this.props.listOfUsers,
        currentParticipants: []
    }

    handleKey = (e) => {
        this.setState({ key: e.target.value });
    }

    sendInviteRequest = (e) => {
        const data = {
            command: "inviting_user",
            room_code: this.props.room.room_code,
            room_name: this.props.room.room_name,
            user_id: this.props.user.user_id,
            receiver_id: e.target.getAttribute("data-user-id"),
        }

        console.log(data);

        this.props.inviteRequest(data);
    }

    getParticipantFromRoom = (e) => {
        var currentParticipants = [];

        for (let participant of this.props.room.participants) {
            currentParticipants.push(participant.user);
        }

        this.setState({ currentParticipants: [...currentParticipants] });
    }

    componentDidMount() {
        this.getParticipantFromRoom();
    }
    
    render () {
        return (
            <ListUserWrapper id="list-user-wrapper">
                {this.state.listOfUsers?.map((user, index) => (
                    <UserItemWrapper key={index}>
                        <UserNameLabel>
                            {user.username}
                        </UserNameLabel>

                        {(() => {
                            var isInTheRoom = this.state.currentParticipants.some(par => {
                                return JSON.stringify(par) === JSON.stringify(user)
                            }) 

                            if (!isInTheRoom) {
                                return (
                                    <InviteButton
                                        className="invite-btn" 
                                        data-user-id={user.id} 
                                        onClick={this.sendInviteRequest}>
                                        Invite

                                    </InviteButton>          
                                )
                            }

                        })()}      
                    </UserItemWrapper>  
                ))}
            
            </ListUserWrapper>
        )
    }
}

const ListUserWrapper = styled.div`
    background-color: transparent;
    padding-top: 10px;
    padding-bottom: 10px;
    // padding: 5px;
    flex-direction: column;
    width: 90%;
    max-height: 150px;
    overflow-x: hidden;
    overflow-y: auto; 
    
    &::-webkit-scrollbar {
        width: 1px;
        margin-left: 3px;
    }

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
    }
`;

const UserItemWrapper = styled.div`
    color: white;
    height: 35px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    padding-left: 5px;
    position: relative;
    background-color: rgba(171, 171, 171, 0.5);
    width: 95%;
    border-radius: 5px;
    font-weight: 600;

    &:hover {
        background-color: rgba(171, 171, 171);
    }
`;

const UserNameLabel = styled.label`
    
`;

const InviteButton = styled.button`
    position: absolute;
    right: 5px;
    background-color: rgba(102, 101, 101, 0.6);
    border: none;
    outline: none;
    color: white;
    font-weight: 600;

    &:hover {
        background-color: rgba(102, 101, 101);
    }
`;

// const CloseButton = styled.div`
//     height: 35px;
    
// `;

const mapStateToProps = state => {
    return {
        user: state.setUserStatus.user.user,
        websocket: state.websocket,
        room: state.room.room
    }
}

export default connect(mapStateToProps, {inviteRequest})(SearchPopup);

// export { SearchPopup }