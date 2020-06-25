import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import io from "socket.io-client";

import { createProject } from "../store/actions";
import { projectModalClose } from "../store/actions";

const modalFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%)
  }
  1%{
    opacity:0;
    transform:translateX(0%);
  }
  100%{
    opacity:1;
    transform: translateX(0%)
  }
`;

const modalFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0%)
  }
  99%{
    opacity:0;
    transform: translateX(0%)
  }
  100%{
    opacity:0;
    transform: translateX(100%)
  }
`;

const ButtonContainerHeight = "80px";
const horizontalPadding = "25px";

const ProjectAddModalComp = styled.div`
  position: relative;
  color: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  transform: translateX(-100%);
  opacity: 0;

  animation: ${(props) =>
      props.modalOpen ? modalFadeIn : props.firstRender ? "none" : modalFadeOut}
    0.5s forwards;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 150;
`;

const ChannelAddBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
  background-color: #2b2b2b;
  font-family: "Montserrat", "san-serif";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: ${ButtonContainerHeight};
  box-sizing: border-box;
  z-index: 200;
  border-radius: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: ${horizontalPadding};
  padding-bottom: 0;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 22px;
  margin-bottom: 25px;
`;

const Header = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Input = styled.input.attrs((props) => ({}))`
  position: relative;
  width: 100%;
  height: 45px;
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  background-color: #333;
  outline: none;
  border: none;
  box-sizing: border-box;
  font-size: 14px;
  font-family: "Montserrat", "san-serif";
  margin: 0;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${ButtonContainerHeight};
  background-color: #222;
  border-radius: 0 0 10px 10px;
  padding: ${horizontalPadding};
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-family: "Montserrat", "san-serif";
    box-sizing: border-box;
    font-weight: 500;
  }
`;

const CreateButton = styled.button`
  border: none;
  outline: none;
  background-color: #1a8cff;
  color: #ddd;
  margin-right: 20px;

  transition: 0.2s;
  :hover {
    background-color: #0073e6;
  }
`;

const CancelButton = styled.button`
  border: none;
  outline: none;
  background: none;
  color: #ddd;

  :hover {
    text-decoration: underline;
  }
`;

let socket;
let firstRender = true;
const ChannelAddModal = (props) => {
  const ENDPOINT = "localhost:5000";
  const [projectName, setProjectName] = useState("");
  const { modalOpen, createProject, projectModalClose, username } = props;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("receiveCreatedProject", ({ createdProject }, callback) => {
      callback();
    });
  }, []);

  if (modalOpen) firstRender = false;

  const onCreateProject = () => {
    createProject({ name: projectName, creatorName: username })
      .then((createdProject) => {
        console.log(createdProject);
        socket.emit("createProject", {
          projectId: createdProject._id,
          projectName,
          creatorName: username,
        });
        setProjectName("");
        projectModalClose();
      })
      .catch((err) => {});
  };

  const onProjectModalClose = () => {
    setProjectName("");
    projectModalClose();
  };

  return (
    <ProjectAddModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={() => onProjectModalClose()} />
      <ChannelAddBox>
        <Container>
          <Title>create a project</Title>
          <Header>project name</Header>
          <Input
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
            onKeyPress={(e) => {
              if (e.key === "Enter") onCreateProject();
            }}
          />
        </Container>
        <ButtonContainer>
          <CreateButton onClick={() => onCreateProject()}>
            Create Channel
          </CreateButton>
          <CancelButton onClick={() => onProjectModalClose()}>
            Cancel
          </CancelButton>
        </ButtonContainer>
      </ChannelAddBox>
    </ProjectAddModalComp>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modal.projectModalOpen,
    username: state.auth.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
    projectModalClose: () => dispatch(projectModalClose()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelAddModal);
