/* eslint-disable no-unused-vars */
import React from 'react'
import axiosInstance from '../../../axios/index';
import jwt_decode from 'jwt-decode';
import { connect } from "react-redux";
import { loginAction } from "../../../actions/loginAction";
import { Redirect } from "react-router-dom";

// import cookie from 'cookie';'

class LoginButton extends React.Component {
    state = {
        linkToLogin: "/login"
    }

    loginHandler = () => {
        window.location.href = this.state.linkToLogin;
    }

    render() {
        return (
            <div className="login-btn-wrapper">
                <button className="login-btn" onClick={ this.logoutHandler }>
                    Log In
                </button>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        isLogin: state.setUserStatus.isLogin,
        user: state.setUserStatus.user
    }
}

export default connect( mapStateToProps, { loginAction } )(LoginButton);