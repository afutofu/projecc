import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ProjectItem from "./ProjectIem";
import { projectModalOpen } from "../store/actions";
import { setSelectedProject } from "../store/actions/";

const itemSpacing = "15px";

const ProjectBarComp = styled.div.attrs((props) => ({
  ref: props.ref,
}))`
  position: relative;
  top: 0;
  left: 0;
  width: 70px;
  height: 100%;
  background-color: #151515;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: ${itemSpacing} 0;
  padding-right: 0px;
  box-sizing: border-box;
`;

const ProfileItem = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  margin-bottom: ${itemSpacing};
`;

const Separator = styled.div`
  position: relative;
  width: 45%;
  min-height: 3px;
  border-radius: 15px;
  background-color: #333;
  margin-bottom: ${itemSpacing};
`;

const ProjectItemWrapper = styled.div`
  max-height: calc(100%-100px);
  overflow-y: auto;
  div {
    margin-bottom: ${itemSpacing};
  }
`;

const PlusIcon = styled.div`
  width: 50px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;

  i {
    transition: 0.2s;
    font-size: 22px;
    color: #1a8cff;
  }

  :hover i {
    font-size: 22px;
    color: #0073e6;
  }
`;

const ProjectBar = (props) => {
  const {
    projects,
    selectedProject,
    projectModalOpen,
    setSelectedProject,
  } = props;

  return (
    <ProjectBarComp>
      <ProfileItem>
        <ProjectItem
          setSelectedProject={setSelectedProject}
          project={null}
          selected={selectedProject == null ? true : false}
        />
      </ProfileItem>
      <Separator />
      <ProjectItemWrapper>
        {projects.map((project, i) => {
          return (
            <ProjectItem
              setSelectedProject={setSelectedProject}
              key={i}
              project={project}
              selected={
                selectedProject ? selectedProject._id === project._id : null
              }
            />
          );
        })}
      </ProjectItemWrapper>
      <PlusIcon onClick={() => projectModalOpen("ADD")}>
        <i className="fa fa-plus"></i>
      </PlusIcon>
    </ProjectBarComp>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.message.projects,
    selectedProject: state.message.selectedProject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    projectModalOpen: (type) => dispatch(projectModalOpen(type)),
    setSelectedProject: (project) => dispatch(setSelectedProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBar);
