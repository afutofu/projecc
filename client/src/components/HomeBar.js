import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchUser, setHomeItem } from "../store/actions";
import { fetchUserData } from "../shared/utils";
import HomeItem from "./HomeItem";
import { FETCH_USER_BEGIN } from "../store/actions/actions";

const HomeBarComp = styled.div``;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  padding: 10px 10px;
  box-sizing: border-box;
`;

const DirectMessageTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  font-family: "Montserrat", "san-serif";
  padding-left: 10px;
  margin: 30px 0;
  margin-bottom: 10px;
`;

const HomeBar = (props) => {
  const { user, fetchUserData, homeItem, setHomeItem, directMessages } = props;

  const [DMs, setDMs] = useState([]);

  useEffect(() => {
    fetchDirectMessages(directMessages);
  }, [directMessages.length]);

  const fetchDirectMessages = (directMessages) => {
    let DMArr = [];

    setDMs([...DMArr]);

    directMessages.forEach((directMessage, i) => {
      // Get all members excluding the user
      const memberIds = directMessage.members.filter((member) => {
        if (member != user._id) return member;
      });

      // Get the first member in the
      const memberId = memberIds[0];

      // Get user data for each member
      fetchUserData(memberId)
        .then((member) => {
          DMArr.unshift(
            <HomeItem
              key={i}
              id={directMessage._id}
              name={member.name}
              setHomeItem={setHomeItem}
            />
          );
          setDMs([...DMArr]);
        })
        .catch(() => {
          return null;
        });
    });
  };

  const renderDirectMessages = () => {
    if (directMessages.length > 0) {
      return (
        <React.Fragment>
          <DirectMessageTitle>direct messages</DirectMessageTitle>
          {DMs}
        </React.Fragment>
      );
    }

    return null;
  };

  return (
    <HomeBarComp>
      <Container>
        <HomeItem id="profile" name="Profile" icon setHomeItem={setHomeItem} />
        <HomeItem
          id="schedule"
          name="Schedule"
          icon
          setHomeItem={setHomeItem}
        />
        <HomeItem id="friends" name="Friends" icon setHomeItem={setHomeItem} />
        {renderDirectMessages()}
      </Container>
    </HomeBarComp>
  );
};

const mapStateToProps = (state) => {
  return {
    homeItem: state.home.homeItem,
    user: state.auth.user,
    directMessages: state.directMessage.directMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: (userId) => dispatch(fetchUserData(userId)),
    setHomeItem: (homeItem) => dispatch(setHomeItem(homeItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBar);
