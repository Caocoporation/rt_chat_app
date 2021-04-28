/* eslint-disable no-unused-vars */
import React from 'react';
import { LoginContext, WebsocketContext } from '../../provider';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Avatar extends React.Component {
    state = {}

    static contextType = WebsocketContext;

    render() {
        // var { isLogin, loginStatus, logoutStatus, say_hello, websocket } = this.context;
        // var userStatus = isLogin ? loginStatus : logoutStatus;

        // console.log(userStatus.avatarUrl);
        // console.log(say_hello);

        console.log(this.context);

        // say_hello = "welcome";

        // console.log(say_hello);
        // console.log(websocket);

        return(
            <>
                {(() => {
                    if (this.props.window.windowSize > 768) {
                        return(
                            <AvatarWrapper id="avatar-wrapper">
                                <AvatarImg 
                                    src={this.props.user.profile_image}  
                                    alt="no avt" />

                            </AvatarWrapper>
                        )
                    }
                })()}
            </>
        )
    }
}

const AvatarWrapper = styled.div`
    height: 80px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AvatarImg = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
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