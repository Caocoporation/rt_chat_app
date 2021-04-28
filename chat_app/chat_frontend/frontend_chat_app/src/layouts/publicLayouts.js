/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Login } from '../components/login_component';
 
export class PublicLayouts extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch> 
                        <Route exact path="/user/login" component={ Login }></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}