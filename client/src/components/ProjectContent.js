import React, { useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { connect } from "react-redux";

import ContentBar from "./ContentBar";
import Content from "./Content";

const ProjectContentComp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

let socket;
const ProjectContent = ({ selectedProject }) => {
  return (
    <ProjectContentComp>
      <ContentBar selectedProject={selectedProject} />
      <Content selectedProject={selectedProject} />
    </ProjectContentComp>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProject: state.message.selectedProject,
  };
};

export default connect(mapStateToProps)(ProjectContent);
