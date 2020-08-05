import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {} from "../store/actions";

const ChannelItemComp = styled.div`
  width: 100%;
  height: 45px;
  font-family: "Montserrat", "san-serif";
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.selected ? "#333" : "none")};
  cursor: pointer;

  transition: 0.1s;
  :hover {
    background-color: ${(props) => (props.selected ? "#333" : "#2d2d2d")};
  }
`;

const ChatPrefix = styled.span`
  :before {
    content: "-";
  }
  width: 15px;
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
    color: ${(props) => (props.selected ? "#ddd" : "#bbb")};
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

  i {
    transition: 0.3s;
  }

  :hover i {
    color: ${(props) => (props.color === "red" ? "red" : "#1a8cff")};
  }
`;

const ChannelItem = (props) => {
  const { selected, name, icon } = props;

  return (
    <ChannelItemComp selected={selected}>
      <ItemContainer>
        {icon ? <ChatPrefix /> : null}
        <ItemName selected={selected}>{name}</ItemName>
      </ItemContainer>
    </ChannelItemComp>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelItem);
