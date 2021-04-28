import React from 'react'
import { connect } from 'react-redux';
import { SearchUsersBar, ParticipantList, Settings } from "./chatroom_side_component";
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components';


class ChatSideBar extends React.Component {
    state = {
        dropdownStatus: false
    }

    dropDownHandler = () => {
        console.log("on click");
        if ( this.state.dropdownStatus === false ) {
            this.setState({
                dropdownStatus: true
            })
        } 

        else {
            this.setState({
                dropdownStatus: false
            })
        }
    }

    render() {
        return ( 
            <SidePanelWrapper>
                {/* <div className="user-infor">
                    <div className="avatar">
                        <img className="user-avatar" src="" alt=""></img>
                    </div>
                </div> */}
                <SearchUsersBar roomCode = { this.props.roomCode } />
                <ListOfParticipants>
                    <Lable>Participants List</Lable>
                    <DropDownIcon 
                        onClick={this.dropDownHandler}>
                        <FontAwesomeIcon
                            icon={Icons.faCaretDown}
                            style={{ fontSize: 20 }}>      
                        </FontAwesomeIcon>
                    </DropDownIcon>
                </ListOfParticipants>
                {(() => {
                    if (this.state.dropdownStatus === true) {
                        return (
                            <ParticipantList />
                        )
                    }
                }) ()}

                <Settings /> 
            </SidePanelWrapper>
        )
    }
}

const SidePanelWrapper = styled.div`
    background-color: rgba(0, 0, 0);
    width: 250px;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;
`;

const ListOfParticipants = styled.div`
    height: 30px;
    background-color: rgba(102, 101, 101);   
    display: flex;
    align-items: center;
    padding: 5px;
    position: relative;
`;

const DropDownIcon = styled.div`
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    position: absolute;
    right: 5px;

    
    svg {
        color: white;
    }
`;

const Lable = styled.label`
    color: white;
    font-weight: 600;
`;

const mapStateToProps = function (state) {
    return {
        room: state.room
    }
}

export default connect(mapStateToProps)(ChatSideBar);