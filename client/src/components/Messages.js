import React from "react";
import styled from "styled-components";

import Message from "./Message";

const MessagesComp = styled.div`
  position: relative;
  height: calc(100% - 65px);
  display: flex;
  flex-direction: column-reverse;
  /* justify-content: flex-end; */
  /* align-items: flex-start; */
  overflow-y: auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const TopSpace = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Messages = ({ messages, channelId, projectId }) => {
  let newMessages = [];

  if (messages !== undefined) {
    messages.forEach((message) => {
      newMessages.unshift(message);
    });
  }

  return (
    <MessagesComp>
      {newMessages.map((message) => {
        console.log(message);
        return (
          <Message
            key={message._id}
            message={message}
            channelId={channelId}
            projectId={projectId}
          />
        );
      })}
      <TopSpace />
    </MessagesComp>
  );
};

export default Messages;
