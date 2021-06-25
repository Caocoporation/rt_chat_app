/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from "react-redux";
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {Notification, Avatar, Logo, SearchBar, Other} from './header_component';
import { LoginButton, LogoutButton } from "./login_component";
import { closeCreateRoomStatusAction } from "../actions/statusAction";
import {CreateChatRoom} from "../components/chat_component";
import styled from "styled-components";

class Header extends React.Component {
    state = {
        avatarUrl: "_",
        loginMsg: "Login"
    }

    moveToCreateRoom = () => {
        this.props.closeCreateRoomStatusAction();
    }

    render() {
    
        return(
            <HeaderWrapper>
                <Logo />
                <SearchBar />
                
                <NavBar
                    className="nav-bar">
                          
                    <CreateRoomButtonWrapper 
                        onClick={this.moveToCreateRoom} >

                        <FontAwesomeIcon 
                            icon={Icons.faFolderPlus}
                            style={ { fontSize: 25, width: 35 } } />

                    </CreateRoomButtonWrapper>
                            
                    <Avatar />

                    <Notification 
                        requestType={this.state.requestType}
                        requestMessage={this.state.requestMessage} />

                    <Other />

                </NavBar>

                { (() => {
                    if (this.props.status.createRoomCloseStatus === true) {
                        return (
                            <CreateChatRoom closeStatus={this.state.closeStatus} />
                        )     
                    }   
                }) () }

            </HeaderWrapper>
        )
        
    }
}

// const BurgurNav = styled.div`
//     height: 50px;
//     width: 50px;
//     background-color: transparent;
//     position: absolute;
//     right: 10px;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     img {
//         height: 45px;
//         width: 45px;
//         border: none;
//         outline: none;
//         border-radius: 5px;
//         background-color: white;

//         &:hover {
//             background-color: grey;
//         }
//     }

//     /* @media only screen and (max-width: 600px) {
//         position: relative;
//     } */
// `;

const NavBar = styled.div`
    display: flex;
    width: 50%;
    position: absolute;
    right: 10px;
    justify-content: flex-end;
`;

// /* @media only screen and (max-width: 600px) {
//         /* display: none; */
//         position: absolute;
//         background-color: green;
//         padding: 2px;
//         border-radius: 5px;
//         top: 56px;
//         z-index: 1;
//         width: auto;
//         flex-direction: column;
//     } */

const CreateRoomButtonWrapper = styled.div`
    background-color: rgb(207,207,207);    
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    margin: 2.5px;
    border-radius: 5px;
    color: white;

    svg {
        background-color: black;
    }
`;

const HeaderWrapper = styled.div`
    background-color: rgb(54, 54, 54);
    display: flex;
    height: 55px;
    /* padding: 0 20px; */
    align-items: center;

    @media only screen and (max-width: 600px) {
        background-color: blue;
        transition: background-color 2s;
    }
`;

const mapStateToProps = function (state) {
    return {
        isLogin: (state.setUserStatus.isLogin).toString(),
        requestMsg: state.request.newRequest,
        window: state.window,
        status: state.status
    }
}

export default connect(mapStateToProps, {closeCreateRoomStatusAction})(Header);