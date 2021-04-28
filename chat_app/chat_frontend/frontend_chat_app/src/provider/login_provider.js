import React, { createContext } from "react";

export const LoginContext = createContext();

class LoginContextProvider extends React.Component {

    state = {
        isLogin: true,

        loginStatus: { 
            loginMsg: "Login sucessfully", 
            loginKey: "Login", 
            avatarUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pphfoundation.ca%2Fabout%2Fdefault-avatar%2F&psig=AOvVaw0sVQUmDCcz1m27mGEWjjj-&ust=1611959970111000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiFj_7Yv-4CFQAAAAAdAAAAABAD", 
            noficationMsg: "Hello World" 
        },

        logoutStatus: {
            loginMsg: "Logout Successfully", 
            loginKey: "Logout", 
            avatarUrl: "", 
            noficationMsg: "You are logging out." 
        },

        notifications: [],
    }

    render() {
        return (
            <LoginContext.Provider value={{ 
                ...this.state, 
                say_hello: this.say_hello,
                setNotifications: (msg) => {
                    this.state.notifications.push(msg);
                    this.forceUpdate();
                }
            }}>
                {this.props.children}
            </LoginContext.Provider>
        );
    }
}

export { LoginContextProvider }