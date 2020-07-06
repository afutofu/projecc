import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { connect } from "react-redux";

import Messages from "./Messages";
import { receiveMessage, createMessage } from "../store/actions";

const ChatComp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-family: "Raleway", "san-serif";
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

let socket;

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const {
    selectedProject,
    selectedChannel,
    receiveMessage,
    username,
    createMessage,
    createMessageSuccess,
  } = props;

  const ENDPOINT = `http://localhost:5000/${selectedProject._id}`;

  useEffect(() => {
    socket = io(ENDPOINT);

    if (username === "") return;

    // Listening for message from server
    socket.on("message", ({ message, channelId, projectId }) => {
      // Send message to redux store
      receiveMessage(message, channelId, projectId);
    });
  }, [selectedProject._id]);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (message) {
      createMessage(
        {
          text: message,
          user: username,
        },
        selectedChannel._id,
        selectedProject._id
      )
        .then(({ createdMessage, channelId, projectId }) => {
          // Send message to server
          socket.emit(
            "sendMessage",
            { message: createdMessage, channelId, projectId },
            () => {
              setMessage("");
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ChatComp>
      <Messages
        messages={selectedChannel.messages}
        channelId={selectedChannel._id}
        projectId={selectedProject._id}
      />
      <Form onSubmit={onMessageSubmit}>
        <Input onChange={(e) => setMessage(e.target.value)} value={message} />
      </Form>
    </ChatComp>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    // selectedChannel: state.message.selectedChannel,
    // messages: state.message.channels[state.message.selectedChannel],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    createMessage: (message, channelId, projectId) =>
      dispatch(createMessage(message, channelId, projectId)),
    receiveMessage: (message, channelId, projectId) =>
      dispatch(receiveMessage(message, channelId, projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
