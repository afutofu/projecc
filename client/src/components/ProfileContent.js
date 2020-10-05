import React, { useState, useRef } from "react";
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
  font-family: "Montserrat", sans-serif;
`;

const AvatarDisplay = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #1a1a1a;
  margin-bottom: 30px;
  overflow: hidden;

  :focus {
    border: #1a8cff 1px solid;
  }
`;

const AvatarImage = styled.img.attrs((props) => ({
  src: props.src && props.src,
}))`
  width: 100%;
  height: 100%;
  background: none;
  outline: none;
`;

const UserDisplay = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 20px;
  color: #ddd;
`;

const EmailDisplay = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 20px;
  color: #ddd;
`;

const IdDisplay = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;
  margin-bottom: 20px;
`;

const FileInput = styled.input.attrs((props) => ({
  type: "file",
}))`
  display: none;
`;

const AvatarEdit = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #ddd;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;

  transition: opacity 0.2s;
  :hover {
    opacity: 1;
  }
`;

const UserEdit = styled.input.attrs((props) => ({
  placeholder: props.placeholder,
  value: props.value,
  spellCheck: "false",
  type: "text",
}))`
  width: 100%;
  max-width: 300px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 20px;
  background-color: #222;
  color: #ddd;
  padding: 15px;
  box-sizing: border-box;
  outline: unset;
  border: #222 1px solid;
  border-radius: 4px;
  font-family: "Montserrat", sans-serif;

  :focus {
    border: #1a8cff 1px solid;
  }
`;

const EmailEdit = styled.input.attrs((props) => ({
  placeholder: props.placeholder,
  value: props.value,
  spellCheck: "false",
  type: "text",
}))`
  width: 100%;
  max-width: 300px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 20px;
  background-color: #222;
  color: #ddd;
  padding: 15px;
  box-sizing: border-box;
  outline: unset;
  border: #222 1px solid;
  border-radius: 4px;
  font-family: "Montserrat", sans-serif;

  :focus {
    border: #1a8cff 1px solid;
  }
`;

const Button = styled.button`
  width: 200px;
  height: 45px;
  margin-bottom: 20px;
  padding-left: 10px;
  text-transform: uppercase;
  /* font-family: "Montserrat", sans-serif; */
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

const CancelButton = styled.button`
  border: none;
  outline: none;
  background: none;
  color: #ddd;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  bottom: 20px;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  color: #d42222;
  border: none;
  background: unset;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  font-size: 16px;

  :hover {
    text-decoration: underline;
  }
`;

const ProfileContent = (props) => {
  const { socket, user, logout } = props;

  let fileInput = useRef(null);

  const [editable, setEditable] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
  );
  const [usernameVal, setUsernameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");

  const onProfileImageSelect = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onEdit = () => {
    setUsernameVal(user.name);
    setEmailVal(user.email);
    setEditable(true);
  };

  const onEditExit = () => {
    setEditable(false);
  };

  const onEditSave = () => {
    setEditable(false);
  };

  const onLogout = () => {
    console.log("logout");
    socket.emit("forceDisconnect");
    logout();
  };

  if (editable) {
    return (
      <ProfileContentComp>
        <AvatarDisplay>
          <FileInput
            onChange={onProfileImageSelect}
            ref={(el) => (fileInput = el)}
          />
          <AvatarEdit onClick={() => fileInput.click()}>
            Change Avatar
          </AvatarEdit>
          <AvatarImage src={profileImage} />
        </AvatarDisplay>
        {user ? (
          <UserEdit
            placeholder={"Username"}
            value={usernameVal}
            onChange={(e) => setUsernameVal(e.target.value)}
          />
        ) : null}
        {user ? (
          <EmailEdit
            placeholder={"Email"}
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
          />
        ) : null}
        <CancelButton onClick={onEditExit}>Cancel</CancelButton>
        <Button onClick={onEditSave}>Save</Button>
      </ProfileContentComp>
    );
  }

  return (
    <ProfileContentComp>
      <AvatarDisplay>
        <AvatarImage src={profileImage} />
      </AvatarDisplay>
      {user ? <UserDisplay>{user.name}</UserDisplay> : null}
      {user ? <EmailDisplay>{user.email}</EmailDisplay> : null}
      {user ? <IdDisplay>{user._id}</IdDisplay> : null}
      <Button onClick={onEdit}>Edit</Button>
      <LogoutButton onClick={onLogout}>Logout</LogoutButton>
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
