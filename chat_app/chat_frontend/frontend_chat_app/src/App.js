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

import {updateWindowSize} from './actions/windowAction';

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

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowSize);
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
    windowSize: state.window.windowSize
  }
}

export default connect(mapStateToProps, {updateWindowSize})(App);
