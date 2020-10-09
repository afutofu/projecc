import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { connect } from "react-redux";

import Messages from "./Messages";
import {
  createMessage,
  createMessageClient,
  deleteMessage,
  deleteMessageClient,
} from "../store/actions";
import { fetchUserData } from "../shared/utils";

const ChatComp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-family: "Raleway", "san-serif";
`;

const ChatPrefix = styled.span`
  :before {
    content: "~";
  }
  width: 15px;
  color: #555;
  font-size: 25px;
  padding-right: 8px;
  font-weight: 700;
`;

const FriendPrefix = styled.span`
  width: 30px;
  color: #555;
  font-size: 25px;
  padding-right: 5px;
  font-weight: 700;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #1b1b1b;
  color: #ddd;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
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
`;

const Form = styled.form.attrs((props) => ({
  onSubmit: props.onSubmit,
}))`
  position: relative;
  width: 100%;
  bottom: 0;
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Input = styled.input.attrs((props) => ({
  placeholder: "Message ~general",
}))`
  position: relative;
  width: 100%;
  height: 45px;
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  background-color: #333;
  outline: none;
  border: none;
  box-sizing: border-box;
  font-size: 14px;
  font-family: "Raleway", "san-serif";
  margin: 0;
`;

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [directMessage, setDirectMessage] = useState({});
  const [memberName, setMemberName] = useState("");
  const {
    selectedProject,
    selectedChannel,
    username,
    userId,
    directMessageId,
    directMessages,
    fetchUserData,
    createMessage,
    deleteMessage,
    socket,
    chatType,
  } = props;

  useEffect(() => {
    if (chatType == "dm") {
      fetchMemberName();
    }
  }, [directMessageId]);

  const fetchMemberName = () => {
    let memberNameTemp = "";

    setMemberName(memberNameTemp);

    // Get direct message from redux store using id
    const directMessageTemp = directMessages.find((directMessage) => {
      if (directMessage._id == directMessageId) return directMessage;
    });

    setDirectMessage(directMessageTemp);

    // Get all members excluding the user
    const memberIds = directMessageTemp.members.filter((member) => {
      if (member != userId) return member;
    });

    // Get the first member in the memberIds array
    const memberId = memberIds[0];

    // Get user data for member
    fetchUserData(memberId)
      .then((member) => {
        setMemberName(member.name);
      })
      .catch(() => {
        return null;
      });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (message) {
      createMessage(
        {
          text: message,
          username,
          userId,
        },
        selectedChannel._id,
        selectedProject._id
      )
        .then(({ data, channelId, projectId }) => {
          // Send message to server
          socket.emit("sendMessage", { data, channelId, projectId }, () => {
            setMessage("");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onDeleteMessage = (messageId, channelId, projectId) => {
    deleteMessage(messageId, channelId, projectId)
      .then(({ data, channelId, projectId }) => {
        socket.emit("deleteMessage", { data, channelId, projectId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (chatType == "dm") {
    return (
      <ChatComp>
        <Header>
          <FriendPrefix>-</FriendPrefix>
          {memberName}
        </Header>
        <Container>
          <Messages
            messages={directMessage.messages}
            deleteMessage={onDeleteMessage}
          />
          <Form onSubmit={onMessageSubmit}>
            <Input
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </Form>
        </Container>
      </ChatComp>
    );
  }

  return (
    <ChatComp>
      <Header>
        <ChatPrefix />
        {selectedChannel.name}
      </Header>
      <Container>
        <Messages
          messages={selectedChannel.messages}
          channelId={selectedChannel._id}
          projectId={selectedProject._id}
          deleteMessage={onDeleteMessage}
        />
        <Form onSubmit={onMessageSubmit}>
          <Input onChange={(e) => setMessage(e.target.value)} value={message} />
        </Form>
      </Container>
    </ChatComp>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.name,
    userId: state.auth.user._id,
    directMessages: state.directMessage.directMessages,
    socket: state.socket.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: (message, channelId, projectId) =>
      dispatch(createMessage(message, channelId, projectId)),
    createMessageClient: (message, channelId, projectId) =>
      dispatch(createMessageClient(message, channelId, projectId)),
    deleteMessage: (messageId, channelId, projectId) =>
      dispatch(deleteMessage(messageId, channelId, projectId)),
    deleteMessageClient: (updatedChannel, channelId, projectId) =>
      dispatch(deleteMessageClient(updatedChannel, channelId, projectId)),
    fetchUserData: (userId) => dispatch(fetchUserData(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
