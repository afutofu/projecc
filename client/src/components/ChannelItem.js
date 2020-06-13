import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { changeChannel } from "../store/actions";

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
  color: #888;
  margin: 0;
  font-weight: 600;

  transition: 0.1s;
  ${ChannelItemComp}:hover & {
    color: #ddd;
  }
`;

const ChannelItem = (props) => {
  return (
    <ChannelItemComp onClick={() => props.changeChannel(props.name)}>
      <ChatPrefix />
      <ItemName>{props.name}</ItemName>
    </ChannelItemComp>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeChannel: (channel) => dispatch(changeChannel(channel)),
  };
};

export default connect(null, mapDispatchToProps)(ChannelItem);
