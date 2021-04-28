/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React from "react";
import moment from "moment";
// import axiosInstance from "../../../axios";
import { connect } from "react-redux";
// import { connectWebsocket } from "../../../actions/websocketConnection";
import {fetchMessages, clearMessages} from "../../../actions/messageAction";
// import { CombinedContext } from "../../../provider/combined_provider";
import styled from "styled-components";

class ChatBox extends React.Component {
    state = {
        messages: [],
        messageCounter: 0,
        notifications: []
    }

    // static contextType = CombinedContext;

    setStateMessages = () => {
        
    }

    getOldMessages = () => {
        this.props.fetchMessages(`http://127.0.0.1:8000/r_chat_msg/${this.props.roomCode}`);
        // console.log(fetchMessages);
    }

    // addMessagesToList = () => {
    //     this.setState({messages: this.props.messages})
    // }

    addNewMessageToList = () => {
        // this.state.messages.push(this.props.message);
        // this.forceUpdate();
        console.log(this.props.messages);
        console.log(this.props.message);
        console.log(this.props.newMessages);

    }

    scrollMessageBoxToBottom () {
        var chatBox = document.querySelector(".message-display-container");
        // chatBox.scrollTop = chatBox.scrollHeight;
        
        setTimeout(() => {
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
    };

    renderMessage = (msg) => {
        var image_url = `http://127.0.0.1:8000${msg.author.user.profile_image}`;

        return (
            <MessageWrapper>
                <ChatTemplate>
                    <UpperTemplate>
                        <AvatarWrapper>
                            <ChatAvatar  src={image_url} alt="" />
                        </AvatarWrapper>
                
                        <UserName>
                            {msg.author.user.username}
                        </UserName>

                        <ChatTimePoint>
                            { moment(msg.sent_date).format('LLLL') }
                        </ChatTimePoint>   
                    </UpperTemplate>

                    <LowerTemplate>
                        <ChatMessage key={msg.id}>
                            {msg.message}
                        </ChatMessage>
                    </LowerTemplate>
                </ChatTemplate>
            </MessageWrapper>
    
        )
    }

    renderMessages = (messages) => {
        if (messages !== null) {
            return (
                messages.map(( msg ) => {
                    if (Object.prototype.hasOwnProperty.call(msg, "type") && msg.type === "joining_notice") {
                        return (
                            <GreetingMessageWrapper>
                                <GreetingMessage>
                                    {msg.message}
                                </GreetingMessage>
                            </GreetingMessageWrapper>
                        )
                    }
            
                    else {
                        return this.renderMessage(msg);
                    }
                })
            )
        }

        else {
            return (
                <WelcomeMessageWrapper>
                    <WelcomeMessage>
                        let's join the chat, don't be shy
                    </WelcomeMessage>
                </WelcomeMessageWrapper>
            )
        }
    }

    focusOnBottom = () => {
        const messageDisplayContainer = document.querySelector("#message-display-container");
        messageDisplayContainer.scrollTop = messageDisplayContainer.scrollHeight;
    }

    componentDidMount() {
        this.getOldMessages();
        this.focusOnBottom();
    }
    
   
    render () {
        return (
            <MessageDisplayContainer
                id="message-display-container">
                { this.renderMessages(this.props.messages) }
            </MessageDisplayContainer>
        )
    }
}

const MessageDisplayContainer = styled.div`
    background-color: rgba(145, 145, 145);
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto; 
    
    &::-webkit-scrollbar {
        width: 1px;
        margin-left: 3px;
    }

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
    }
`;

const WelcomeMessageWrapper = styled.div``;
const WelcomeMessage = styled.h3``;

const GreetingMessageWrapper = styled.div``;
const GreetingMessage = styled.small``;

const MessageWrapper = styled.div`
    margin: 5px;
    background-color: rgba(43, 43, 43);
    padding: 5px;
    border-radius: 5px;
`;

const ChatTemplate = styled.div``;

const UpperTemplate = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    height: 50px;
`;

const LowerTemplate = styled.div`
    background-color: transparent;
`;

const AvatarWrapper = styled.div`
    height: 35px;
    width: 35px;
    border: none
    outline: none
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin: 5px;
`;

const ChatAvatar = styled.img`
    height: 33px;
    width: 33px;
    border: none;
    border-radius: 50%;
`;

const UserName = styled.label`
    color: black;
    font-weight: 600;
    margin-left: 10px;
    color: white;
`;

const ChatTimePoint = styled.small`
    position: absolute;
    top: 0;
    right: 5px;
    color: white;
`;

const ChatMessage = styled.p`
    overflow-wrap: break-word;
    padding-left: 10px;
    font-size: 15px;
    background-color: transparent;
    color: white;
`;

const mapStateToProps = function (state) {
    return {
        isLogin: (state.setUserStatus.isLogin).toString(),
        messages: state.setMessages.messages,
        message: state.setMessages.message
    }
}

export default connect(mapStateToProps, {fetchMessages, clearMessages})(ChatBox);

