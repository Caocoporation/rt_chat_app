/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { ChatRoom, CreateChatRoom } from "../components/chat_component";
import { ChatRooms } from "../components";
import { Header } from "../components";

import styled from "styled-components";

export class ProtectedLayouts extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Header />
                    <Switch> 
                        <Route exact path="/chat/chatrooms" component={ChatRooms}></Route>
                        <Route exact path="/chat/chatroom/:roomCode" component={ChatRoom}></Route>
                        <Route exact path="/chat/create-chatroom" component={ CreateChatRoom }></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}