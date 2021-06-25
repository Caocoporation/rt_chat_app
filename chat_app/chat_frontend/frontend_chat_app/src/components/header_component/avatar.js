/* eslint-disable no-unused-vars */
import React from 'react';
import { LoginContext, WebsocketContext } from '../../provider';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Avatar extends React.Component {
    state = {}

    render() {
        return(            
            <AvatarWrapper id="avatar-wrapper">
                <img
                    className="user-avatar"
                    src={this.props.user.profile_image}  
                    alt="no avt" />

            </AvatarWrapper>
        )
    }
}

const AvatarWrapper = styled.div`
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 45px;
        width: 45px;
        border-radius: 50%;
    }

    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

// export { Avatar };

const mapStateToProps = function (state) {
    return {
        // websocket: state.setWebsocket.websocket,
        isLogin: (state.setUserStatus.isLogin).toString(),
        user: state.setUserStatus.user.detailed_user,
        window: state.window
    }
}

export default connect(mapStateToProps, { })(Avatar);