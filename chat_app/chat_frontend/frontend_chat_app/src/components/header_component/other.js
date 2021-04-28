/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from "./avatar";
import {LogoutButton, LoginButton} from "../login_component";
import styled from "styled-components"

class Other extends React.Component {
    state = {
        openOtherPopup: false
    }

    searchBarHandler = (e) => {

    }

    activateOtherPopup = () => {
        if (this.state.openOtherPopup === true) {
            this.setState({
                openOtherPopup: false
            })
        }

        else {
            this.setState({
                openOtherPopup: true
            })
        }
    }

    switchButton = (isLogin) => {
        if ( isLogin.toString() === "true" ) {
            console.log("It is login now");
            return <LogoutButton />
            
        }

        else if (isLogin.toString() === "false") {
            console.log("It is logout now");
            return <LoginButton />
        }
    }
    render() {
        return(
            <OtherWrapper>
                <CarpetIconWrapper
                    onClick={this.activateOtherPopup}>

                    <FontAwesomeIcon 
                        icon={Icons.faCaretDown}
                        style={ { fontSize: 23 } } /> 
                </CarpetIconWrapper>

                { (() => {
                    if (this.state.openOtherPopup === true) {
                        return(
                            <OtherGroupPopup>
                                <UserWrapper>
                                    <Avatar />
                                    <UserName>
                                        {this.props.user.username}
                                    </UserName>
                                </UserWrapper>
                                <SwitchButton id="switch-button">
                                    {this.switchButton(this.props.isLogin)}
                                </SwitchButton>
                            </OtherGroupPopup>
                        )
                    }
                })() }

            </OtherWrapper>
        )
    }
}

const OtherWrapper = styled.div`
    height: 80px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    position: relative;
`;

const CarpetIconWrapper = styled.div`
    background-color: rgb(207, 207, 207);
    border-radius: 50%;
    padding: 5px;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: rgb(153, 153, 153);
    }
`;
const OtherGroupPopup = styled.div`
    background-color: rgba(158, 158, 158);
    box-shadow: -3px -1px 10px -3px rgba(235, 235, 235, 0.68);
    position: absolute;
    top: 90px;
    right: 0px;
    width: 250px;
    border-radius: 5px;
    z-index: 1;
    // display: none;
`;
const UserWrapper = styled.div`
    display: flex;
    background-color: rgba(158, 158, 158);
    height: 60px;
    justify-content: left;
    align-items: center;
    margin: 6px;
    border-radius: 5px;

    &:hover {
        background-color: rgba(7, 7, 7, 0.521);
    }

    div#avatar-wrapper {
        height: 50px;
        width: 50px;
        margin-right: 10px;
        margin-left: 5px;
        
        img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
        }
    }
`;

const SwitchButton = styled.div`
    display: flex;
    align-items: center;
    background-color: rgba(56, 55, 53, 0.521);
    height: 60px;
    margin: 6px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white

    &:hover {
        background-color: rgba(7, 7, 7, 0.521);
    }
`;

const UserName = styled.label`
    font-size: 16px;
    font-weight: 600;
    color: white;
`;

const mapStateToProps = function (state) {
    return {
        // websocket: state.setWebsocket.websocket,
        isLogin: (state.setUserStatus.isLogin).toString(),
        user: state.setUserStatus.user.detailed_user
    }
}

export default connect(mapStateToProps, { })(Other);