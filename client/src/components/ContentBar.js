import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ChannelBar from "./ChannelBar";
import { projectModalOpen, deleteProject } from "../store/actions";

const ContentBarComp = styled.div`
  position: relative;
  width: ${({ selectedProject }) =>
    selectedProject === null ? "0px" : "240px"};
  height: 100%;
  background-color: #252525;
  box-sizing: border-box;
  transition: 0.5s;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #1b1b1b;
  color: #ddd;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-family: "Montserrat", "san-serif";
  font-weight: 600;
  font-size: 16px;
  cursor: default;
`;

const Buttons = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;

  transition: 0.2s;
  ${Header}:hover & {
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
  }

  :hover i {
    color: ${(props) => (props.color === "red" ? "red" : "#1a8cff")};
  }
`;

const ContentBar = (props) => {
  const { selectedProject, projectModalOpen, deleteProject } = props;

  const onRenameProject = () => {
    projectModalOpen("RENAME", {
      currentProjectName: selectedProject.name,
      projectId: selectedProject._id,
    });
  };

  const onDeleteProject = () => {
    deleteProject(selectedProject._id);
  };

  // Render the name of the project
  // If project name is too long (over 15 chars), will end with first 15 chars followed by ellipses
  const renderName = () => {
    const maxNameLength = 15;

    if (selectedProject) {
      if (selectedProject.name.length > maxNameLength) {
        return selectedProject.name.substring(0, maxNameLength) + "...";
      }
      return selectedProject.name;
    }

    return null;
  };

  return (
    <ContentBarComp selectedProject={selectedProject}>
      <Header>
        {renderName()}
        <Buttons>
          <Button onClick={(e) => onRenameProject(e)}>
            <i className="fa fa-pencil"></i>
          </Button>
          <Button onClick={(e) => onDeleteProject(e)} color="red">
            <i className="fa fa-times"></i>
          </Button>
        </Buttons>
      </Header>
      {selectedProject === null ? null : <ChannelBar />}
    </ContentBarComp>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    projectModalOpen: (type, data) => dispatch(projectModalOpen(type, data)),
    deleteProject: (projectId) => dispatch(deleteProject(projectId)),
  };
};

export default connect(null, mapDispatchToProps)(ContentBar);
