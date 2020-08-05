import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { logout } from "../store/actions";

const ProfileContentComp = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserDisplay = styled.h1`
  font-size: 20px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 30px;
`;

const LogoutButon = styled.button`
  width: 200px;
  height: 45px;
  margin-bottom: 5px;
  padding-left: 10px;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: white;
  background: #1a8cff;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  transition: background-color 0.25s;
  :hover {
    background: #0073e6;
  }

  a {
    color: white;
    all: unset;
  }
`;

const ProfileContent = (props) => {
  const { socket, user, logout } = props;

  const onLogout = () => {
    console.log("logout");
    socket.emit("forceDisconnect");
    logout();
  };

  return (
    <ProfileContentComp>
      {user ? <UserDisplay>{user.name}</UserDisplay> : null}
      <LogoutButon onClick={onLogout}>Logout</LogoutButon>
    </ProfileContentComp>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.socket.socket,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContent);
