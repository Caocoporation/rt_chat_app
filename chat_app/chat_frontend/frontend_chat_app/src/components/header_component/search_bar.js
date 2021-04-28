/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import axiosInstance from "../../axios";

class SearchBar extends React.Component {
    state = {
        searchKey: "",
        listRooms: [],
        searchPopupStatus: false,
        searchIconWrapper: true
    }

    searchKeyHandler = (e) => {
        this.setState({ searchKey: e.target.value });
    }

    searchButtonSwitch = () => {
        if(this.props.window.windowSize <= 768) {
            this.searchPopup();
        } 

        else {
            this.searchBarHandler();
        }
    }

    searchBarHandler = (e) => {
        console.log("Search > 600px");

        console.log(this.state.key);
        axiosInstance.post(
            `http://127.0.0.1:8000/room/find/`, 
            {
                type: "search room", 
                searchKey: this.state.searchKey, 
            }
        )
            .then((res) => {
                console.log(res.data);
                // var data = res.data.data;
            });
    }

    searchPopup = (e) => {
        console.log("Search <= 600px");

        if (this.state.searchPopupStatus === false) {
            this.setState({
                searchPopupStatus: true,
                searchIconWrapper: false
            })
        }

        else {
            this.setState({
                searchPopupStatus: false
            })
        }
        
    }

    caretLeftHandler = () => {
        if (this.state.searchPopupStatus === false) {
            this.setState({
                searchPopupStatus: true,
                searchIconWrapper: false
            })
        }

        else {
            this.setState({
                searchPopupStatus: false,
                searchIconWrapper: true
            })
        }
    }

    render() {
        return(
            <SearchBarWrapper>
                {(() => {
                    if (this.state.searchIconWrapper === true) {
                        return (   
                                <InnerWrapper> 
                                
                                    <SearchInput 
                                        type="text" 
                                        className="search-input" 
                                        placeholder="Enter room code..." 
                                        onChange={this.searchKeyHandler} 
                                        onKeyPress={(e) => {
                                            if(e.key === "Enter") {
                                                this.searchBarHandler();
                                            }
                                        }}/>
                                                                                        
                                    <SearchIconWrapper
                                        onClick={this.searchButtonSwitch}>

                                        <FontAwesomeIcon 
                                            icon={Icons.faSearch}
                                            style={ { fontSize: 23 } } /> 

                                    </SearchIconWrapper>     
                                </InnerWrapper>
                            )
                        }
                })()}
                {(() => {
                    if (this.state.searchPopupStatus === true) {
                        return(
                            <SearchPopup
                                id="search-popup">
                                <SearchPopupInner>
                                    <CaretLeftWrapper
                                        onClick={this.caretLeftHandler}>

                                        <FontAwesomeIcon 
                                            icon={Icons.faCaretLeft}
                                            style={ { fontSize: 23 } } />
                                    </CaretLeftWrapper>

                                    <SearchInput2 
                                        type="text" 
                                        className="search-input" 
                                        placeholder="Enter room code..." 
                                        onChange={this.searchKeyHandler}
                                        onKeyPress={(e) => {
                                            if(e.key === "Enter") {
                                                this.searchBarHandler();
                                            }
                                        }}/>
                                </SearchPopupInner>
                            </SearchPopup>
                        )
                    }
                })()}
                
            </SearchBarWrapper>
        )
    }
}

const SearchPopupInner = styled.div`
    display: flex;
    background-color: white;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 50px;
`;

const SearchInput2 = styled.input`
    height: 35px;
    padding-left: 5px;
    padding-right: 5px;
    outline: none;
    border: none;
    border-radius: 0 50px 50px 0;
`;

const CaretLeftWrapper = styled.div`
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchBarWrapper = styled.div`
    height: 80px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    // position: relative;
`;

const InnerWrapper = styled.div`
    background-color: white;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    padding: 0 5px 0 5px;
    
    @media only screen and (max-width: 768px) {
        width: 50px;
        height: 50px;
        padding: 0px;
    }
`;
const SearchInput = styled.input`
    height: 45px;
    border-radius: 50px;
    width: 79%;
    padding: 0 5px 0 5px;
    outline: none;
    border: none;
  
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const SearchPopup = styled.div`
    height: 80px;
    background-color: transperent;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    // position: absolute;
    // top: 0px;
    // left: 0px;
    z-index: 2;
`;

const SearchIconWrapper = styled.div`
    background-color: violet;
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
`;

const mapStateToProps = function (state) {
    return {
        // websocket: state.setWebsocket.websocket,
        isLogin: (state.setUserStatus.isLogin).toString(),
        window: state.window
    }
}

export default connect(mapStateToProps, { })(SearchBar);