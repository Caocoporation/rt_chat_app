import React, { createContext } from "react";

export const WebsocketContext = createContext();

class WebsocketContextProvider extends React.Component {

    state = {
        websocket: null
    }

    render() {
        return (
            <WebsocketContext.Provider value={{ 
                ...this.state, 
                say_hello: this.say_hello,
                setWebsocket: (websocket) => {
                    console.log(websocket);
                    // var greet = "hi";
                
                    this.setState({
                        websocket: websocket
                    });
                    // this.forceUpdate();
                }
            }}>
                {this.props.children}
            </WebsocketContext.Provider>
        );
    }
}

export { WebsocketContextProvider }