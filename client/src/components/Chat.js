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
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    if (props.username === "") return;

    socket.emit(
      "joinChat",
      { name: props.username, channel: props.selectedChannel },
      () => {}
    );

    socket.on("message", (message) => {
      console.log(message);
      props.receiveMessage(message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit(
        "sendMessage",
        { msg: message, channel: props.selectedChannel },
        () => {
          setMessage("");
        }
      );
    }
  };

  return (
    <ChatComp>
      <Messages messages={props.messages} />
      <Form onSubmit={onMessageSubmit}>
        <Input onChange={(e) => setMessage(e.target.value)} value={message} />
      </Form>
    </ChatComp>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    selectedChannel: state.message.selectedChannel,
    messages: state.message.channels[state.message.selectedChannel],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveMessage: (message) => dispatch(receiveMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
