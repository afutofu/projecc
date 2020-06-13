import React from "react";
import styled from "styled-components";

import ChannelItem from "./ChannelItem";

const ContentBarComp = styled.div`
  position: relative;
  margin-left: 70px;
  width: 240px;
  height: 100%;
  background-color: #252525;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #111;
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
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  padding: 20px 10px;
  box-sizing: border-box;
`;

const ContentBar = () => {
  return (
    <ContentBarComp>
      <Header>Project Name</Header>
      <Container>
        <ChannelItem name="general" />
        <ChannelItem name="deadline" />
      </Container>
    </ContentBarComp>
  );
};

export default ContentBar;
