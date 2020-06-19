import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ChannelBar from "./ChannelBar";
import { channelModalOpen } from "../store/actions/modal";

const ContentBarComp = styled.div`
  position: relative;
  width: ${({ selectedProject }) =>
    selectedProject === null ? "0px" : "240px"};
  height: 100%;
  background-color: #252525;
  box-sizing: border-box;
  transition: 1s;
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

const ContentBar = (props) => {
  const { selectedProject } = props;

  return (
    <ContentBarComp selectedProject={selectedProject}>
      <Header>{selectedProject ? selectedProject.name : null}</Header>
      {selectedProject === null ? null : <ChannelBar />}
    </ContentBarComp>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProject: state.message.selectedProject,
  };
};

export default connect(mapStateToProps)(ContentBar);
