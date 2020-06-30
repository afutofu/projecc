import React from "react";
import styled from "styled-components";

const ProjectItemComp = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  background-color: ${(props) => (props.selected ? "#ccc" : "#444")};
  color: white;
  border-radius: ${(props) => (props.selected ? "30%" : "50%")};
  box-sizing: border-box;
  cursor: pointer;

  transition: 0.2s;
  :hover {
    border-radius: 30%;
    background-color: #ccc;
  }
`;

const ProjectItem = (props) => {
  const { setSelectedProject, project, selected } = props;

  if (project === null) {
    return (
      <ProjectItemComp
        selected={selected}
        onClick={() => setSelectedProject(null)}
      ></ProjectItemComp>
    );
  }

  return (
    <ProjectItemComp
      selected={selected}
      onClick={() => setSelectedProject(project)}
    ></ProjectItemComp>
  );
};

export default ProjectItem;
