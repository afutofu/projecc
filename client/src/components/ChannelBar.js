import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ChannelItem from "./ChannelItem";
import { channelModalOpen } from "../store/actions/modal";

const ChannelBarComp = styled.div``;

const ContentBarComp = styled.div`
  position: relative;
  width: 240px;
  height: 100%;
  background-color: #252525;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #1b1b1b;
  color: #ddd;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  font-family: "Montserrat", "san-serif";
  font-weight: 600;
  font-size: 16px;
  cursor: default;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  padding: 20px 10px;
  box-sizing: border-box;
`;

const AddChannelButton = styled.button`
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
  background: #252525;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  border: none;
  box-sizing: border-box;
  padding-top: 5px;
  cursor: pointer;

  i {
    color: #888;
    font-size: 18px;
    transition: 0.2s;
  }

  :hover i {
    color: #ddd;
  }
`;

const ContentBar = (props) => {
  const { channelModalOpen, project, channels, selectedChannel } = props;

  // const channels = Object.keys(project.channels);
  return (
    <ChannelBarComp>
      <Container>
        {channels.map((channel, i) => {
          return (
            <ChannelItem
              key={i}
              name={channel}
              projectName={project.name}
              project={project}
              selected={channel == selectedChannel ? true : false}
            />
          );
        })}
      </Container>
      <AddChannelButton onClick={channelModalOpen}>
        <i className="fa fa-plus"></i>
      </AddChannelButton>
    </ChannelBarComp>
  );
};

const mapStateToProps = (state) => {
  const { selectedProject } = state.message;

  if (selectedProject) {
    return {
      project: selectedProject,
      channels: Object.keys(selectedProject.channels),
      selectedChannel: selectedProject.selectedChannel,
    };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    channelModalOpen: () => dispatch(channelModalOpen()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentBar);
