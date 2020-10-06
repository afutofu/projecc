import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { friendModalOpen } from "../store/actions";

const FriendsComp = styled.div`
  width: 100%;
  height: 100%;
  font-family: "Montserrat", "san-serif";
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #1b1b1b;
  color: #ddd;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-family: "Montserrat", "san-serif";
  font-weight: 600;
  font-size: 16px;
  cursor: default;
  position: relative;
  background-color: #2b2b2b;
`;

const Container = styled.div`
  position: relative;
  height: calc(100% - 50px);
  padding: 10px 20px;
  box-sizing: border-box;
`;

const AddFriendButton = styled.button`
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Montserrat", "san-serif";
  box-sizing: border-box;
  font-weight: 600;
  border: none;
  outline: none;
  background-color: #1a8cff;
  color: #ddd;
  margin-right: 20px;

  transition: 0.2s;
  :hover {
    background-color: #0073e6;
  }
`;

const Friends = (props) => {
  const { friendModalOpen } = props;

  return (
    <FriendsComp>
      <Header>
        Friends
        <AddFriendButton onClick={() => friendModalOpen("ADD")}>
          Add Friend
        </AddFriendButton>
      </Header>
      <Container>FriendsList</Container>
    </FriendsComp>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    friendModalOpen: (type) => dispatch(friendModalOpen(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
