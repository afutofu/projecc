import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { connect } from "react-redux";

import Message from "./Message";

const ChatComp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: "Raleway", "san-serif";
`;

const MessagesContainer = styled.div`
  width: 100%;
  height: calc(100% - 65px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Form = styled.form.attrs((props) => ({
  onSubmit: props.onSubmit,
}))``;

const Input = styled.input.attrs((props) => ({
  placeholder: "Message ~general",
}))`
  position: absolute;
  bottom: 20px;
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
`;

let socket;

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit(
      "joinChat",
      { name: props.username, chat: "general" },
      () => {}
    );

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const onMessageSubmit = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  console.log(message, messages);

  return (
    <ChatComp>
      <MessagesContainer>
        {messages.map((message) => {
          return <Message name={message.user} message={message.text} />;
        })}
      </MessagesContainer>
      <Form onSubmit={onMessageSubmit}>
        <Input onChange={(e) => setMessage(e.target.value)} value={message} />
      </Form>
    </ChatComp>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapStateToProps)(Chat);
