import React, { useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";

const ProjectComp = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1b1b1b;
  color: white;
`;

let socket;

const Project = () => {
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    return () => {
      socket.emit("disconnect");
    };
  }, []);

  return <ProjectComp>Projects</ProjectComp>;
};

export default Project;
