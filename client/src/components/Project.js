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
  createChannelClient,
  renameChannelClient,
  deleteChannelClient,
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
    createChannelClient,
    renameChannelClient,
    deleteChannelClient,
  } = props;

  useEffect(() => {
    if (isLogged === false) setRedirect(true);
    fetchProjects()
      .then((projects) => {
        socket = io(ENDPOINT);
        socket.emit("initSockets");
        setSocket(socket);

        // MESSAGE CLIENT EVENT LISTENERS
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

        // CHANNEL CLIENT EVENT LISTENERS
        // Listening for channel from server
        socket.on("channel", ({ type, data, channelId, projectId }) => {
          console.log("Channel from server");
          switch (type) {
            case "CREATE":
              // Send new channel to store
              console.log("Create new channel");
              createChannelClient(data, projectId);
              break;
            case "RENAME":
              // Send renamed channel to store
              console.log("Renamed channel");
              renameChannelClient(data, channelId, projectId);
              break;
            case "DELETE":
              // Send channelId to be deleted to store
              console.log("Delete channel");
              deleteChannelClient(channelId, projectId);
              break;
            default:
              return null;
          }
        });

        // PROJECT CLIENT EVENT LISTENERS
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
    createMessageClient: (newMessage, channelId, projectId) =>
      dispatch(createMessageClient(newMessage, channelId, projectId)),
    deleteMessageClient: (updatedChannel, channelId, projectId) =>
      dispatch(deleteMessageClient(updatedChannel, channelId, projectId)),
    createChannelClient: (newChannel, projectId) =>
      dispatch(createChannelClient(newChannel, projectId)),
    renameChannelClient: (renamedChannel, channelId, projectId) =>
      dispatch(renameChannelClient(renamedChannel, channelId, projectId)),
    deleteChannelClient: (channelId, projectId) =>
      dispatch(deleteChannelClient(channelId, projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
