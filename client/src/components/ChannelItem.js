import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { setSelectedChannel, deleteChannel } from "../store/actions";

const ChannelItemComp = styled.div`
  width: 100%;
  height: 35px;
  font-family: "Montserrat", "san-serif";
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.selected ? "#333" : "none")};
  cursor: pointer;

  transition: 0.1s;
  :hover {
    background-color: #333;
  }
`;

const ChatPrefix = styled.span`
  :before {
    content: "~";
  }
  color: #555;
  font-size: 25px;
  padding-right: 8px;
  font-weight: 700;
`;

const ItemName = styled.h3`
  font-size: 14px;
  color: ${(props) => (props.selected ? "#ddd" : "#888")};
  margin: 0;
  font-weight: 600;

  transition: 0.1s;
  ${ChannelItemComp}:hover & {
    color: #ddd;
  }
`;

const ItemContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Buttons = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;

  transition: 0.2s;
  ${ChannelItemComp}:hover & {
    transition: 0.5s;
    opacity: 1;
  }
`;

const Button = styled.div`
  transition: 0.2s;
  padding: 5px;

  :hover {
    color: #1a8cff;
  }
`;

const ChannelItem = (props) => {
  const {
    setSelectedChannel,
    deleteChannel,
    projectName,
    selected,
    name,
    project,
  } = props;

  const onDeleteChannel = (e) => {
    e.stopPropagation();
    deleteChannel(name, projectName);
  };

  return (
    <ChannelItemComp
      onClick={() => setSelectedChannel(name, project)}
      selected={selected}
    >
      <ItemContainer>
        <ChatPrefix />
        <ItemName selected={selected}>{name}</ItemName>
      </ItemContainer>
      <Buttons>
        <Button onClick={(e) => onDeleteChannel(e)}>
          <i className="fa fa-minus"></i>
        </Button>
      </Buttons>
    </ChannelItemComp>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedChannel: (channel, project) =>
      dispatch(setSelectedChannel(channel, project)),
    deleteChannel: (channel, projectName) =>
      dispatch(deleteChannel(channel, projectName)),
  };
};

export default connect(null, mapDispatchToProps)(ChannelItem);
