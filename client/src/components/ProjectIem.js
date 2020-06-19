import React from "react";
import styled from "styled-components";

const ProjectItemComp = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  background-color: #444;
  color: white;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;

  transition: 0.2s;
  :hover {
    border-radius: 30%;
    background-color: #ccc;
  }
`;

const ProjectItem = (props) => {
  const { setSelectedProject, project } = props;

  if (project === null) {
    return (
      <ProjectItemComp
        onClick={() => setSelectedProject(null)}
      ></ProjectItemComp>
    );
  }

  return (
    <ProjectItemComp
      onClick={() => setSelectedProject(project)}
    ></ProjectItemComp>
  );
};

export default ProjectItem;
