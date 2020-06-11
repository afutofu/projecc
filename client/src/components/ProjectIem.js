import React from "react";
import styled from "styled-components";

const ProjectItemComp = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  background-color: #444;
  color: white;
  border-radius: 50%;
  cursor: pointer;

  transition: 0.2s;
  :hover {
    border-radius: 30%;
    background-color: #ccc;
  }
`;

const ProjectItem = () => {
  return <ProjectItemComp></ProjectItemComp>;
};

export default ProjectItem;
