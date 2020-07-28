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

// let socket;

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const {
    selectedProject,
    selectedChannel,
    username,
    createMessage,
    createMessageClient,
    deleteMessage,
    deleteMessageClient,
    socket,
  } = props;

  // const ENDPOINT = `http://localhost:5000/`;

  // useEffect(() => {
  //   // socket = io(ENDPOINT);

  //   if (username === "") return;

  //   // Listening for message from server
  //   socket.on("message", ({ type, data, channelId, projectId }) => {
  //     switch (type) {
  //       case "CREATE":
  //         // Send message to redux store
  //         createMessageClient(data, channelId, projectId);
  //         break;
  //       case "DELETE":
  //         // Send updated channel to redux store
  //         deleteMessageClient(data, channelId, projectId);
  //         break;
  //       default:
  //         return null;
  //     }
  //   });
  // }, [
  //   selectedProject._id,
  //   username,
  //   // ENDPOINT,
  //   createMessageClient,
  //   deleteMessageClient,
  // ]);

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

  return (
    <ChatComp>
      <Messages
        messages={selectedChannel.messages}
        channelId={selectedChannel._id}
        projectId={selectedProject._id}
        deleteMessage={onDeleteMessage}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
