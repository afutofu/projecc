import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { connect } from "react-redux";

import Messages from "./Messages";
import { receiveMessage } from "../store/actions";

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
  const { selectedProject, selectedChannel, receiveMessage, username } = props;
  const ENDPOINT = `localhost:5000/${selectedProject.name}`;

  useEffect(() => {
    socket = io(ENDPOINT);

    if (username === "") return;

    // Join channel
    socket.emit(
      "joinChannel",
      { name: username, channel: selectedChannel },
      () => {
        // console.log("Joined channel");
      }
    );

    // Listening for message from server
    socket.on("message", (message) => {
      // Send message to redux store
      receiveMessage(message);
      setMessages([...messages, message]);
    });

    return () => {
      // Leave channel
      socket.emit("disconnect");
      socket.close();
    };
  }, []);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    if (message) {
      // Send message to server
      socket.emit(
        "sendMessage",
        {
          msg: message,
          projectName: selectedProject.name,
          channel: selectedChannel,
        },
        () => {
          setMessage("");
        }
      );
    }
  };
  return (
    <ChatComp>
      <Messages messages={selectedProject.channels[selectedChannel]} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
