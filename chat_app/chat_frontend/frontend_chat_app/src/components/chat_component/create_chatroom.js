/* eslint-disable no-unused-vars */
import React from 'react';
import axiosInstance from '../../axios';
// import axiosInstance from 'axiosPackage/';
import jwt_decode from 'jwt-decode';
import {fetchRooms} from 'actions/roomAction'; 
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { closeCreateRoomStatusAction } from "actions/statusAction";

// set up websocket

class CreateChatRoom extends React.Component {
    state = {
        user_id: this.getUserId(),
        room_name: ""
    }

    client = null;

    getUserId () {
        var accessToken = localStorage.getItem("access_token");
        
        if (accessToken !== null) {
            var payload = jwt_decode(accessToken);
            return payload.user_id;
        }
    }

    handleCloseButton = (e) => {
       this.props.closeCreateRoomStatusAction();
    }

    handleRoomNameValue = (e) => {
        this.setState({
            room_name: e.target.value
        })
    }

    handleCreateRoomForm = (e) => {
        e.preventDefault();
        axiosInstance.post(
            "http://127.0.0.1:8000/c_room/", 
            {room_name: this.state.room_name}
        )

        .then((res) => {
            console.log(res.data);
            // const fetch_room = this.props.fetchRooms("/r_room");
            //window.location.href = "/chat/chatrooms";
        })
    }
  
    render() {
        return ( 
            <CreateRoomBackground>
                <CreateRoomWrapper>
                    <LabelWrapper>
                        <WrapperLabel>
                            Create Room
                        </WrapperLabel>
                        <CloseButton 
                            onClick={this.handleCloseButton}>
                            <FontAwesomeIcon 
                                icon={Icons.faTimes}
                                style={{fontSize: 20}}/>
                        </CloseButton>
                    </LabelWrapper>
                    
                    <CreateRoomForm method="POST">
                            <CreateRoomFieldSet>
                                
                                <CreateRoomGroupForm>
                                    <CreateRoomName 
                                        type="text" 
                                        placeholder="Name your room" 
                                        onChange={this.handleRoomNameValue} />
                                </CreateRoomGroupForm>

                            </CreateRoomFieldSet>
                            
                            <SubmitWrapper>
                                <SubmitButton 
                                    type="submit"  
                                    value="Create Room" 
                                    onClick={this.handleCreateRoomForm} />
                            </SubmitWrapper>
                        </CreateRoomForm>
                </CreateRoomWrapper>
            </CreateRoomBackground>
        )
    }
}

const CreateRoomWrapper = styled.div`
    position: absolute;
    background-color: white;
    height: 250px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const CreateRoomForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 150px;   
    width: 100%;
`;

const LabelWrapper = styled.div`
    background-color: rgba(71, 71, 71);
    height: 30px;
    width: 100%;
    position: relative;
    border: 1px solid black;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0px;
    border-radius: 10px 10px 0 0;
`;

const CreateRoomBackground = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    z-index: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`

const WrapperLabel = styled.label`
    margin-left: 10px;
    color: white;
    font-weight: 600;
`;

const CreateRoomFieldSet = styled.fieldset`
    border: none;
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CreateRoomGroupForm = styled.div`
    width: 90%;
`;
const CreateRoomName = styled.input`
    height: 30px;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 5px;
    background-color: rgba(245, 245, 245, 0.6);
    transition: all 0.3s ease;
    font-size: 16px;
    width: 100%;

    &:focus {
        outline: none;
        box-shadow: 0px 0 1px 2px rgba(61, 61, 61, 0.4);
        background-color: rgba(245, 245, 245);
    }
`;

const SubmitWrapper = styled.div``;

const SubmitButton = styled.input`
    margin-top: 10px;
    border: none;
    outline: none;
    color: white;
    height: 35px;
    border-radius: 10px;
    font-weight: 600;
    background-color: rgba(43, 43, 43, 0.8);

    &:hover {
        background-color: rgba(43, 43, 43);
    }
`;

const CloseButton = styled.button`
    position: absolute;
    right: 5px;
    border: none;
    outline: none;
    border-radius: 50%;
    background-color: rgba(207, 207, 207, 0.8);
    display: flex;
    padding: 1px;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;

    > * {
        pointer-events: none;
    }

    &:hover {
        background-color: rgba(207, 207, 207);
    }
`;



const mapStateToProps = (state) => {
    return {
        isLogin: (state.setUserStatus.isLogin).toString(),
        user: state.setUserStatus.user.user,
        createRoomStatus: state.status.createRoomCloseStatus
    }
}

export default connect(mapStateToProps, {fetchRooms, closeCreateRoomStatusAction}) (CreateChatRoom);
