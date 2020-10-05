import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { logout } from "../store/actions";
import ContentBar from "./ContentBar";
import Content from "./Content";

const ProjectContentComp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

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
    selectedProject: state.project.selectedProject,
  };
};

export default connect(mapStateToProps)(ProjectContent);
