import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { setHomeItem } from "../store/actions";
import HomeItem from "./HomeItem";

const HomeBarComp = styled.div``;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  padding: 10px 10px;
  box-sizing: border-box;
`;

const HomeBar = (props) => {
  const { homeItem, setHomeItem } = props;

  return (
    <HomeBarComp>
      <Container>
        <HomeItem
          selected={homeItem === "profile"}
          id="profile"
          name="Profile"
          icon
          setHomeItem={setHomeItem}
        />
        <HomeItem
          selected={homeItem === "schedule"}
          id="schedule"
          name="Schedule"
          icon
          setHomeItem={setHomeItem}
        />
        <HomeItem
          selected={homeItem === "friends"}
          id="friends"
          name="Friends"
          icon
          setHomeItem={setHomeItem}
        />
      </Container>
    </HomeBarComp>
  );
};

const mapStateToProps = (state) => {
  return {
    homeItem: state.home.homeItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHomeItem: (homeItem) => dispatch(setHomeItem(homeItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBar);
