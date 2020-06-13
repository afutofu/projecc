import React from "react";
import styled from "styled-components";

const MessageComp = styled.div`
  display: relative;
  width: 100%;
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "Montserrat", "san-serif";
  margin-bottom: 20px;
`;

const NameDate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Name = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: yellow;
  margin: 0;
  margin-right: 10px;
`;

const DateComp = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

const MessageText = styled.p`
  font-size: 14px;
  color: #ddd;
  margin: 0;
`;

const Message = ({ user, msg }) => {
  const dateObj = new Date();
  const date =
    dateObj.getMonth() +
    1 +
    "/" +
    dateObj.getDate() +
    "/" +
    dateObj.getFullYear();
  const time = dateObj.getHours() + ":" + dateObj.getMinutes();

  const dateTime = date + " " + time;

  return (
    <MessageComp>
      <NameDate>
        <Name>{user}</Name>
        <DateComp>{dateTime}</DateComp>
      </NameDate>
      <MessageText>{msg}</MessageText>
    </MessageComp>
  );
};

export default Message;
