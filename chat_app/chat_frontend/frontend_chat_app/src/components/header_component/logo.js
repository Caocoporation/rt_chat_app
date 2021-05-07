/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Logo extends React.Component {
    state = {}
    render() {
        return(
            <LogoWrapper>
                <LogoImg
                    src="/website_logo/lagger.png" 
                    alt="no img" />
            </LogoWrapper>
        )
    }
}

const LogoWrapper = styled.div`
    height: 80px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoImg = styled.img`
    height: 50px;
    width: 50px;
`;

const mapStateToProps = function (state) {
    return {
        // websocket: state.setWebsocket.websocket,
        isLogin: (state.setUserStatus.isLogin).toString()
    }
}

export default connect(mapStateToProps, { })(Logo);