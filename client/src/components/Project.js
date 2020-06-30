import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

import ProjectBar from "./ProjectBar";
import ContentBar from "./ContentBar";
import Content from "./Content";
import ProjectModal from "./ProjectModal";
import ChannelModal from "./ChannelModal";

import { fetchProjects } from "../store/actions";

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

  const { fetchProjects } = props;

  useEffect(() => {
    if (props.isLogged == false) setRedirect(true);
    fetchProjects();
  }, []);

  const render = () => {
    if (redirect) return <Redirect to="/" />;

    return (
      <ProjectComp>
        <ProjectModal />
        <ChannelModal />
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
