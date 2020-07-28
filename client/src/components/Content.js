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

const CenterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", "san-serif";
`;

const Content = (props) => {
  const { selectedProject } = props;

  if (selectedProject && selectedProject.selectedChannel) {
    return (
      <ContentComp>
        <Header>
          <ChatPrefix />
          {selectedProject.selectedChannel.name}
        </Header>
        <Container>
          <Chat
            selectedProject={selectedProject}
            selectedChannel={selectedProject.selectedChannel}
          />
        </Container>
      </ContentComp>
    );
  } else if (selectedProject) {
    return (
      <ContentComp>
        <CenterContainer>No Channel Selected</CenterContainer>
      </ContentComp>
    );
  }

  return (
    <ContentComp>
      <CenterContainer>No Project Selected</CenterContainer>
    </ContentComp>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProject: state.message.selectedProject,
  };
};

export default connect(mapStateToProps)(Content);
