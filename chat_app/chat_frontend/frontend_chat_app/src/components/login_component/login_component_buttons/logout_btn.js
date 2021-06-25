/* eslint-disable no-unused-vars */
import React from 'react'
import axiosInstance from '../../../axios/index';
import jwt_decode from 'jwt-decode';
import { connect } from "react-redux";
import { logoutAction } from "../../../actions/loginAction";
import { clearMessages } from "../../../actions/messageAction";
import { Redirect } from "react-router-dom";

import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

// import cookie from 'cookie';'

class LogoutButton extends React.Component {
    state = {
        linkToLogin: "/user/login"
    }

    logoutHandler = () => {
        this.props.logoutAction();
        this.props.clearMessages();
        window.location.href = this.state.linkToLogin;
    }

    render() {
        return (
            <LogoutButtonWrapper     
                onClick={ this.logoutHandler }>
                    
                <LogoutIcon>
                    <FontAwesomeIcon 
                        icon={Icons.faSignOutAlt}
                        style={ { fontSize: 19 } } /> 
                </LogoutIcon>
            
                <LogoutLabel>
                    Log Out
                </LogoutLabel>
            </LogoutButtonWrapper>
        )
    }
}

const LogoutButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 10px;
    height: 60px;
    border-radius: 5px;
    background-color: rgba(158,158,158);

    svg {
        border-radius: 5px;
        background-color: rgba(85, 84, 84, 0.493);
        color: white;
    }

    &:hover {
        background-color: rgba(7, 7, 7, 0.521);
    }
`;

const LogoutIcon = styled.div`
    height: 35px;
    width: 35px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

const LogoutLabel = styled.label`
    margin-left: 10px;
    font-size: 15px;
    font-weight: 500;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
`;

const mapStateToProps = function (state) {
    return {
        isLogin: state.setUserStatus.isLogin,
        user: state.setUserStatus.user
    }
}

export default connect( mapStateToProps, { logoutAction, clearMessages } )(LogoutButton);