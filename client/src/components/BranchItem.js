import React from "react";
import styled from "styled-components";

const BranchItemComp = styled.div`
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
  ${BranchItemComp}:hover & {
    color: #ddd;
  }
`;

const BranchItem = (props) => {
  return (
    <BranchItemComp>
      <ChatPrefix />
      <ItemName>{props.name}</ItemName>
    </BranchItemComp>
  );
};

export default BranchItem;
