import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Chat from "./Chat";
import ProfileContent from "./ProfileContent";

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
  width: 15px;
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
  const { selectedProject, homeItem } = props;

  // PROJECT
  // If there is a selected project and selected channel
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
    // If there is a selected project and no selected channel
  } else if (selectedProject) {
    return (
      <ContentComp>
        <CenterContainer>No Channel Selected</CenterContainer>
      </ContentComp>
    );
  }

  // HOME
  // If selected profile
  switch (homeItem) {
    case "profile":
      return (
        <ContentComp>
          <CenterContainer>
            <ProfileContent />
          </CenterContainer>
        </ContentComp>
      );
    // If selected schedule
    case "schedule":
      return (
        <ContentComp>
          <CenterContainer>Work In Progress :3</CenterContainer>
        </ContentComp>
      );
    // If selected friends
    case "friends":
      return (
        <ContentComp>
          <CenterContainer>Work In Progress :3</CenterContainer>
        </ContentComp>
      );
    // If selected friend for messaging
    default:
      return (
        <ContentComp>
          <CenterContainer>Work In Progress :3</CenterContainer>
        </ContentComp>
      );
  }
};

const mapStateToProps = (state) => {
  return {
    selectedProject: state.project.selectedProject,
    homeItem: state.home.homeItem,
  };
};

export default connect(mapStateToProps)(Content);
