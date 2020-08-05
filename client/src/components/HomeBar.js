import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import HomeItem from "./HomeItem";

const HomeBarComp = styled.div``;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  padding: 10px 10px;
  box-sizing: border-box;
`;

const HomeBar = (props) => {
  const {} = props;

  return (
    <HomeBarComp>
      <Container>
        <HomeItem selected={true} name="Profile" icon />
        <HomeItem selected={false} name="Schedule" icon />
        <HomeItem selected={false} name="Friends" icon />
      </Container>
    </HomeBarComp>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBar);
