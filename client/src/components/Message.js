import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MessageComp = styled.div`
  display: relative;
  width: 100%;
  background-color: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "Montserrat", "san-serif";
  margin-bottom: 20px;
`;

const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const NameDate = styled.div`
  display: flex;
  align-items: center;
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

const Buttons = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;

  transition: 0.2s;
  ${MessageComp}:hover & {
    transition: 0.5s;
    opacity: 1;
  }
`;

const Button = styled.div`
  transition: 0.2s;
  padding: 5px;
  cursor: pointer;

  i {
    transition: 0.3s;
    font-size: 18px;
  }

  :hover i {
    color: red;
  }
`;

const Message = (props) => {
  const [memberName, setMemberName] = useState("");
  const {
    chatType,
    message,
    channelId,
    projectId,
    deleteMessage,
    fetchUserData,
  } = props;
  const { _id, userId, username, date, text } = message;

  // If chat is in direct messages, fetch user data (name)
  useEffect(() => {
    if (chatType == "dm") {
      fetchMemberName();
    }
  }, []);

  // If chat is changed, reset

  const fetchMemberName = () => {
    let memberNameTemp = "";

    setMemberName(memberNameTemp);

    // Get user data for member
    fetchUserData(userId)
      .then((member) => {
        setMemberName(member.name);
      })
      .catch(() => {
        return null;
      });
  };

  if (chatType == "dm") {
    return (
      <MessageComp>
        <TopRow>
          <NameDate>
            <Name>{memberName}</Name>
            <DateComp>{date}</DateComp>
          </NameDate>
          <Buttons>
            <Button onClick={() => deleteMessage(_id, channelId, projectId)}>
              <i className="fa fa-times"></i>
            </Button>
          </Buttons>
        </TopRow>
        <MessageText>{text}</MessageText>
      </MessageComp>
    );
  }

  return (
    <MessageComp>
      <TopRow>
        <NameDate>
          <Name>{username}</Name>
          <DateComp>{date}</DateComp>
        </NameDate>
        <Buttons>
          <Button onClick={() => deleteMessage(_id, channelId, projectId)}>
            <i className="fa fa-times"></i>
          </Button>
        </Buttons>
      </TopRow>
      <MessageText>{text}</MessageText>
    </MessageComp>
  );
};

export default Message;
