import React from "react";
import styled from "styled-components";

import ProjectItem from "./ProjectIem";

const itemSpacing = "15px";

const ProjectBarComp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 70px;
  height: 100%;
  background: #151515;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: ${itemSpacing} 0;
  box-sizing: border-box;
`;

const ProfileItem = styled.div`
  box-sizing: border-box;
  margin-bottom: ${itemSpacing};
`;

const Separator = styled.div`
  width: 45%;
  height: 3px;
  border-radius: 10px;
  background-color: #333;
  margin-bottom: ${itemSpacing};
`;

const ProjectItemWrapper = styled.div`
  * {
    margin-bottom: ${itemSpacing};
  }
`;

const PlusIcon = styled.div`
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;

  i {
    transition: 0.2s;
    font-size: 25px;
    color: #1a8cff;
  }

  :hover i {
    font-size: 30px;
    color: #0073e6;
  }
`;

const ProjectBar = (props) => {
  return (
    <ProjectBarComp>
      <ProfileItem>
        <ProjectItem />
      </ProfileItem>
      <Separator />
      <ProjectItemWrapper>
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
      </ProjectItemWrapper>
      <PlusIcon>
        <i className="fa fa-plus"></i>
      </PlusIcon>
    </ProjectBarComp>
  );
};

export default ProjectBar;
