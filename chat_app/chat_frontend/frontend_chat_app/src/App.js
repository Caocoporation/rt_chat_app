/* eslint-disable no-unused-vars */
import {Header, ChatRooms} from "./components";
import {LoginContextProvider, WebsocketContextProvider} from "./provider";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Login } from "./components/login_component";
import { ChatRoom, CreateChatRoom } from "./components/chat_component";
import { connect, Provider } from 'react-redux';
// ,  persistor
import { store,  persistor } from "./reduxStore";
import { PersistGate } from 'redux-persist/integration/react';
import { ProtectedLayouts, PublicLayouts } from "../src/layouts";
import {ReactDOM} from "react"
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCrown, faCaretDown, faBell, faCoffee } from '@fortawesome/free-solid-svg-icons';
import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {updateWindowSize, changeMode} from './actions/windowAction';
import {hideChatBoxAction} from "./actions/statusAction";

library.add(faCrown, faCaretDown, faBell, faCoffee)

store.subscribe(() => {
  console.log("RUNNING: ");
  console.log(store.getState());
});

class App extends React.Component {
  state = {}

  updateWindowSize = () => {
    this.props.updateWindowSize(window.innerWidth);
  }

  focusOnDefaultSection = () => {
    if (this.props.window.currentSection === this.props.window.displaySection) {
      const defaultSection = document.querySelector(`.${this.props.window.displaySection}`);
      defaultSection.style.backgroundColor = "green";
    }
  }

  defaultChatboxSection = () => {
    const defaultSection = document.querySelector(`.${this.props.window.currentSection}-c`);
    const defaultIcon = document.querySelector(`.${this.props.window.currentIcon}`);

    if (defaultSection !== null) {
      var isMobileMode = this.props.window.currentModeSections.indexOf(this.props.window.currentSection);


      if (isMobileMode !== -1) {
        console.log("True");
        defaultSection.style.display = "initial";
        defaultIcon.style.backgroundColor = "green"
    }
    }
  }

  chatboxInDesktopMode = () => {
    const chatboxSection = document.querySelector(`.chatbox-section-c`);
    
    if (chatboxSection !== null) {
      if (this.props.window.windowMode === "desktop") {
        chatboxSection.style.display = "initial";
      }
  
      else if (this.props.window.windowMode === "mobile" && this.props.window.currentSection !== "chatbox-section") {
        chatboxSection.style.display = "none";
      }
    }
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.updateWindowSize();
      this.props.changeMode(window.innerWidth);
      this.chatboxInDesktopMode();
      this.defaultChatboxSection();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowSize);
  }

  render() {
    return (
      <div>  
        <Router>
          <Switch> 
            <Route path="/user/login" component={ PublicLayouts }></Route>
            <Route path="/chat" component={ ProtectedLayouts }></Route>            
          </Switch>
        </Router>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    window: state.window,
    status: state.status
  }
}

export default connect(
  mapStateToProps, 
  {
    updateWindowSize, 
    hideChatBoxAction,
    changeMode
  }
  
)(App);
