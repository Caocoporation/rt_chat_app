import React from 'react'
import { connect } from 'react-redux';
import { SearchUsersBar, ParticipantList, Settings } from "./chatroom_side_component";
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {hideChatBoxAction} from "actions/statusAction";
import {updateSidebarBodyCurrentSection, updateSidebarBodyCurrentIcon} from "actions/windowAction";
import styled from 'styled-components';


class ChatSideBar extends React.Component {
    state = {
        dropdownStatus: false,
        // defaultSection: this.props.window.displaySection,
        currentSection: this.props.window.displaySection
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

    flipSectionHandler = (e) => {
        var preTab = document.querySelector(`.${this.state.currentSection}`);
        var curTab = document.querySelector(`.${e.target.getAttribute("class")}`);
        var previousEle = document.querySelector(`.${this.state.currentSection}-c`);
        var currentEle = document.querySelector(`.${e.target.getAttribute("class")}-c`);

        if (this.props.window.windowMode === "desktop" && this.props.window.currentSection === "chatbox-section") {
            currentEle.style.display = "initial";
            curTab.style.backgroundColor = "green";
        }

        else {
            console.log(preTab);
            console.log(curTab);

            previousEle.style.display = "none";
            currentEle.style.display = "initial";
            preTab.style.backgroundColor =  "white"; 
            curTab.style.backgroundColor = "green";
        }

        this.setState({
            currentSection: e.target.getAttribute("class")
        })

        this.props.updateSidebarBodyCurrentSection(e.target.getAttribute("class"));
        this.props.updateSidebarBodyCurrentIcon(e.target.getAttribute("class"));
    }

    render() {
        return ( 
            <SidePanelWrapper>
                <SideBarNav>
                    <ul className="sidebar-ul">
                        <li 
                            className="participant-section"
                            id="sidebar-list-item"
                            onClick={this.flipSectionHandler} >

                            <img 
                                className="participant-icon"
                                src="/chatbox_icon/participant_icon.png" 
                                alt="" />
                        </li>
                        
                        <li 
                            className="find-user-section"
                            id="sidebar-list-item"
                            onClick={this.flipSectionHandler} >

                            <img 
                                className="search_person"
                                src="/chatbox_icon/search_person.svg" 
                                alt="" />
                        </li>

                        <li 
                            className="room-info-section"
                            id="sidebar-list-item"
                            onClick={this.flipSectionHandler} >

                            <img 
                                className="room_infor"
                                src="/chatbox_icon/room_infor.png" 
                                alt="" />
                        </li>

                        {(() => {
                            if (this.props.window.windowSize <= 600) {
                                return (
                                    <li 
                                        className="chatbox-section"
                                        id="sidebar-list-item"
                                        onClick={this.flipSectionHandler} >

                                        <img 
                                            className="chatbox_img"
                                            src="/chatbox_icon/chat_icon.png" 
                                            alt="" />
                                    </li>
                                )
                            }           
                        })()}

                    </ul>
                </SideBarNav>

                <SideBarBody>
                    <ParticipantSection 
                        className="participant-section-c" 
                        id="section">
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

                        })()}

                    </ParticipantSection>
                    
                    <FindUsers className="find-user-section-c" id="section" hidden>
                        <SearchUsersBar roomCode = { this.props.roomCode } />
                    </FindUsers>

                    <RoomInfor className="room-info-section-c" id="section" hidden></RoomInfor>
                    {/* <div className="chatbox-section-c" id="section" hidden></div> */}
                    <Settings /> 
                </SideBarBody>
            </SidePanelWrapper>
        )
    }
}

const SideBarBody = styled.div`
    position: relative;
`;

const ParticipantSection = styled.div`
    width: 100%;
    top: 0px;
    position: absolute;

    @media only screen and (max-width: 600px) {
        display: none;
    }
`;

const FindUsers = styled.div`
    height: 100px;
    width: 100%;
    background-color: greenyellow;
    position: absolute;
    top: 0px;

    @media only screen and (max-width: 600px) {
        z-index: 1;
        position: initial;
    }
`;

const RoomInfor = styled.div`
    height: 100px;
    width: 100%;
    background-color: sandybrown;
    position: absolute;
    top: 0px;
  
    @media only screen and (max-width: 600px) {
        z-index: 1;
    }
`;

const SideBarNav = styled.div`
    height: 45px;
    display: flex;
    background-color: rgba(102,101,101);

    ul.sidebar-ul {
        display: flex;
        align-items: center;
        padding: 0px;
        margin: 0px;
        background-color: rgba(102,101,101);
        list-style: none;
    }

    li#sidebar-list-item {
        margin-right: 5px;
        height: 43px;
        width: 43px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;

        > * {
            pointer-events: none;
        }

        &:hover {
            background-color: yellowgreen!important;
            border-bottom: 5px solid black;
        }

        
    }

    img {
        height: 35px;
        width: 35px;
        background-color: transparent;
    }
`;

const SidePanelWrapper = styled.div`
    background-color: rgba(0, 0, 0);
    width: 250px;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;

    @media only screen and (max-width: 600px) {
        width: 100%;
    }
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
        room: state.room,
        status: state.status,
        window: state.window
    }
}

export default connect(
    mapStateToProps, 
    {
        hideChatBoxAction,
        updateSidebarBodyCurrentSection,
        updateSidebarBodyCurrentIcon
    }
)(ChatSideBar);