import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newMessage } from "../../../actions/messageAction";
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

class ChatInput extends React.Component{
    state = {
        inputMessage: ""
    }

    // clearInputMessage = (e) => {
    //     this.setState({
    //         inputMessage: ""
    //     })
    // }

    handleInputMessage = (e) => {
        this.setState({
            inputMessage: e.target.value
        });
    }

    sendMessageToGroup = (e) => {
        this.props.newMessage(
            this.state.inputMessage, 
            this.props.userId,
            this.props.roomCode,
            localStorage.getItem("username")
        );
        
        this.setState({
            inputMessage: ""
        })
    }

    render() {
        return(
            <MessageInputBox>
                <InputBox>
                    <MessageInput
                        type="text" 
                        placeholder="Write something ..." 
                        onChange={this.handleInputMessage}
                        value={this.state.inputMessage}
                        onKeyPress={ (e) => {
                            if (e.key === 'Enter') {
                                this.sendMessageToGroup();
                            }
                        } } />

                    <SendingButton 
                        onClick={this.sendMessageToGroup}>
                        <FontAwesomeIcon 
                            icon={ Icons.faPaperPlane }
                            style={{ fontSize: 20 }}/>
                    </SendingButton>
                </InputBox>
            </MessageInputBox>
        )
    }
}

const SendingButton = styled.button`
    height: 30px;
    width: 30px;
    border: none;
    outline: none;
    background-color: rgba(92, 92, 92, 0.7);
    position: absolute;
    right: 5px;
    border-radius: 50%;
    padding: 2px
    display: flex;
    justify-content: center;
    align-items: center;

    > * {
        pointer-events: none;
    }

    &:hover {
        background-color: rgba(92, 92, 92);
    }
`;

const MessageInputBox = styled.div`
    background-color: rgba(145, 145, 145);
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const MessageInput = styled.input`
    height: 25px;
    width: 89%;
    border-radius: 50px  0 0 50px;
    border: none;
    outline: none;
    padding: 8px;
`;

const InputBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: brown;
    width: 90%;
    border-radius: 50px;
    padding: 1px;
    background-color: white;
    position: relative;
`;

ChatInput.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        isLogin: (state.setUserStatus.isLogin).toString(),
        message: state.setMessages.messages.message,
        messages: state.setMessages.messages.messages,
    }
}


export default connect(mapStateToProps, {newMessage})(ChatInput);
