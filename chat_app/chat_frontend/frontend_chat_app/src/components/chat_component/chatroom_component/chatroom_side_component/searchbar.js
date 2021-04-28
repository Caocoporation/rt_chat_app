import React from "react";
import axiosInstance  from "../../../../axios";
import SearchPopup from "./search_popup/search_popup";
import styled from "styled-components";
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchUsersBar extends React.Component {
    state = {
        key: "",
        openPopup: false,
        listOfUsers: []
    }

    handleTheKey = (e) => {
        var key = e.target.value
        this.setState({ key: key })

        if (this.state.key === null) {
            this.setState({ openPopup: false })
        }
    }

    getListOfUsers = (e) => {
        console.log(this.state.key);
        axiosInstance.post(
            `http://127.0.0.1:8000/user/invite/${this.state.key}`, 
            {type: "not_login", key: this.state.key}
        )
            .then((res) => {
                console.log(res.data);
                var data = res.data.data;
                this.setState({ listOfUsers: [...data] });
                this.setState({ openPopup: true });
            });
    }

    // componentDidMount() {
    //     window.addEventListener("click", (e) => {
    //         var element_id = e.target.getAttribute("id");

    //         if (element_id !== "list-user-wrapper") {
    //             this.setState({ openPopup: false });
    //         } 
    //     })
    // }
    

    render () {
        console.log(this.state.listOfUsers);
        console.log(this.state.openPopup);
        return (
            <SearchBar>
                <SearchLabelWrapper>
                    <SearchLabel>
                        Find Participants
                    </SearchLabel>
                </SearchLabelWrapper>
                <SearchWrapper>
                    <SearchInput
                        type="text"
                        placeholder="Username ..."
                        onChange={this.handleTheKey}
                        onKeyPress={(e) => {
                            if(e.key === "Enter") {
                                this.getListOfUsers();
                            }
                        }}>

                    </SearchInput>

                    <SearchButton
                        onClick={this.getListOfUsers}>
                            <FontAwesomeIcon 
                                icon={Icons.faSearch}
                                style={{ fontSize: 20 }}/>
                    </SearchButton>
                </SearchWrapper>
                            
                {(() => {
                    if (this.state.openPopup === true) {
                        return (
                            <SearchPopup 
                                roomCode = {this.props.roomCode} 
                                listOfUsers = {this.state.listOfUsers} />
                        )
                    }
                }) ()}
                
            </SearchBar>
        )
    }
}

const SearchBar = styled.div`
    margin-bottom: 10px;
    background-color: rgba(102,101,101,0.5);   
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
`;

const SearchInput = styled.input`
    height: 20px;
    font-size: 14px;
    border: none;
    border-radius: 50%;
    outline: none;
    padding: 5px;
    margin: 5px;
    color: var(--black);
`
const SearchButton = styled.button`
    height: 30px;
    width: 30px;
    font-size: 14px;
    border: none;
    margin: 5px;
    border-radius: 50%;
    outline: none;
    background-color: rgba(102, 101, 101, 0.6);

    > * {
        pointer-events: none;
    }

    &:hover {
        background-color: rgba(102, 101, 101);
    }

    svg {
        background-color: transparent;
    }
`;

const SearchWrapper = styled.div`
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 50px;
    transition: all 0.3s ease;
    margin: 10px 5px 5px 5px;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 4px rgba(21, 156, 228, 0.4);
    }
`;

const SearchLabelWrapper = styled.div`
    height: 30px;
    width: 100%;
    background-color: rgba(102,101,101);
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const SearchLabel = styled.label`
    margin: 5px;
`;

export default SearchUsersBar;