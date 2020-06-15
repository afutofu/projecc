import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import ProjectBar from "./ProjectBar";
import ContentBar from "./ContentBar";
import Content from "./Content";
import ChannelAddModal from "./ChannelAddModal";

const ProjectComp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #1b1b1b;
  color: white;
  display: flex;
  overflow: hidden;
`;

let socket;
const Project = (props) => {
  const ENDPOINT = "localhost:5000";
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (props.isLogged == false) setRedirect(true);
  }, []);

  const render = () => {
    if (redirect) return <Redirect to="/" />;

    return (
      <ProjectComp>
        <ChannelAddModal />
        <ProjectBar />
        <ContentBar />
        <Content />
      </ProjectComp>
    );
  };

  return render();
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

export default connect(mapStateToProps)(Project);
