import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Chat from "./Chat";

const ContentComp = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
  background-color: #2b2b2b;
`;

const ChatPrefix = styled.span`
  :before {
    content: "~";
  }
  color: #555;
  font-size: 25px;
  padding-right: 8px;
  font-weight: 700;
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

const Content = (props) => {
  return (
    <ContentComp>
      <Header>
        <ChatPrefix />
        {props.selectedChannel}
      </Header>
      <Container>
        <Chat />
      </Container>
    </ContentComp>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedChannel: state.message.selectedChannel,
  };
};

export default connect(mapStateToProps)(Content);
