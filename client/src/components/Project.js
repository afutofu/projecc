import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ProjectBar from "./ProjectBar";
import ProjectContent from "./ProjectContent";
import ProjectModal from "./ProjectModal";
import ChannelModal from "./ChannelModal";

import {
  fetchProjects,
  setSocket,
  createMessageClient,
  deleteMessageClient,
} from "../store/actions";

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

  const {
    isLogged,
    fetchProjects,
    setSocket,
    createMessageClient,
    deleteMessageClient,
  } = props;

  useEffect(() => {
    if (isLogged === false) setRedirect(true);
    fetchProjects()
      .then((projects) => {
        socket = io(ENDPOINT);
        socket.emit("initSockets");
        setSocket(socket);
        // Listening for message from server
        socket.on("message", ({ type, data, channelId, projectId }) => {
          console.log("Message from server");
          switch (type) {
            case "CREATE":
              // Send message to redux store
              createMessageClient(data, channelId, projectId);
              break;
            case "DELETE":
              console.log(data.messages);
              // Send updated channel to redux store
              deleteMessageClient(data, channelId, projectId);
              break;
            default:
              return null;
          }
        });
      })
      .catch((err) => {});
  }, [isLogged, fetchProjects]);

  const render = () => {
    if (redirect) return <Redirect to="/" />;

    return (
      <ProjectComp>
        <ProjectModal />
        <ChannelModal />
        <ProjectBar />
        <ProjectContent />
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
    setSocket: (socket) => dispatch(setSocket(socket)),
    createMessageClient: (message, channelId, projectId) =>
      dispatch(createMessageClient(message, channelId, projectId)),
    deleteMessageClient: (updatedChannel, channelId, projectId) =>
      dispatch(deleteMessageClient(updatedChannel, channelId, projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
