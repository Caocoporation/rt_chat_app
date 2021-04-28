/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from "react-redux";

import {Notification, Avatar, Logo, SearchBar, Other} from './header_component';
import { LoginButton, LogoutButton } from "./login_component";
import styled from "styled-components";

class Header extends React.Component {
    state = {
        avatarUrl: "_",
        // requestType: this.props.requestMsg.type,
        // requestMessage: this.props.requestMsg.message,
        loginMsg: "Login"
    }

    render() {
        // console.log(HeaderFunction());
        // console.log(this.props.websocket);
        console.log(this.props.requestMsg);

        return(
            <HeaderWrapper>
                <Logo />
                <Avatar />
                <SearchBar />
                <Notification 
                    requestType={this.state.requestType}
                    requestMessage={this.state.requestMessage} />

                <Other />
            </HeaderWrapper>
        )
        
    }
}

const HeaderWrapper = styled.div`
    background-color: rgb(54, 54, 54);
    display: flex;
    height: 200px;
    justify-content: left;

    @media only screen and (max-width: 600px) {
        background-color: blue;
        transition: background-color 2s;
    }
`;

const mapStateToProps = function (state) {
    return {
        isLogin: (state.setUserStatus.isLogin).toString(),
        requestMsg: state.request.newRequest,
        window: state.window
    }
}

export default connect(mapStateToProps, {  })(Header);