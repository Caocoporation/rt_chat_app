import React from 'react'
import axiosInstance from '../../axios/index';
import jwt_decode from 'jwt-decode';
import { connect } from "react-redux";
import { loginAction } from "../../actions/loginAction";
// import { Redirect } from "react-router-dom";

// import cookie from 'cookie';'

class Login extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            username: "",
            password: "",
            chatrooms_url: "/chat/chatrooms",
            isLoading: true
        }
        this.handleUsernameValue = this.handleUsernameValue.bind(this);
        this.handlePasswordValue = this.handlePasswordValue.bind(this);
        this.handleLoginForm = this.handleLoginForm.bind(this);
    }

    // state = {
        
    // }

    handleUsernameValue(e) {
        console.log(e.target.value);
        this.setState({ username: e.target.value });
    }

    handlePasswordValue(e) {
        console.log(e.target.value);
        this.setState({ password: e.target.value });
    }

    handleLoginForm = async (e) => {
        e.preventDefault();

        console.log(this.state.isLoading);

        await axiosInstance
            .post(`/api/token/`, {
                type: "login",
                username: this.state.username,
                password: this.state.password
            })

            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

                // store username in localStorage
                var payload =  jwt_decode(res.data.access);
                localStorage.setItem('username', payload.username);

                const fetchUserInfo = async () => {
                    console.log("it's running");
                    await this.props.loginAction(payload);

                    this.setState({
                        isLoading: false
                    })
                }

                fetchUserInfo();               
            });

        console.log(this.state.isLoading);
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.user.flag === true ) {
            window.location.href = "/chat/chatrooms";
        }
    }

    render() {
        return (
            <div>
                <div className="content-section">
                    <form action="" method="POST" className="register-form">
                        <fieldset className="login-field">
                            
                            <legend className="login-legend">Log In</legend>
                            <div className="group-form">
                                <input className="username" type="text" placeholder="Username" onChange={this.handleUsernameValue}></input>
                                <input className="password" type="password" placeholder="Password" onChange={this.handlePasswordValue}></input>
                            </div>
                        </fieldset>
                        
                        <div className="submit-wrapper">
                            <input type="button" className="register-submit-button" value="Login" onClick={this.handleLoginForm}/>
                        </div>

                        <div className="already-have-account">
                            <small className="text-muted">
                                {/* Haven't had an account? <a href="" className="ml-2">Sign Up</a> */}
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        isLogin: state.setUserStatus.isLogin,
        user: state.setUserStatus.user,
        flag: state.setUserStatus.flag
    }
}

export default connect( mapStateToProps, { loginAction } )(Login);