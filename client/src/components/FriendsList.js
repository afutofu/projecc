import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchUserData } from "../shared/utils";

const FriendsListComp = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const RequestArea = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 16px;
  color: #ddd;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;
  margin: 10px 0;
  margin-bottom: 10px;
`;

const FriendItem = styled.div`
  width: 100%;
  height: 40px;
  padding: 4px 8px;
  background-color: none;
  color: #aaa;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1px;
  font-size: 14px;

  transition: 0.2s;
  :hover {
    background-color: #3d3d3d;
    color: #ddd;
  }
`;

const Name = styled.span`
  color: #aaa;
  margin-right: 20px;
  font-weight: 500;

  transition: 0.2s;
  ${FriendItem}:hover & {
    color: #ddd;
  }
`;

const Id = styled.span`
  color: #888;

  transition: 0.2s;
  ${FriendItem}:hover & {
    color: #aaa;
  }
`;

const FriendsList = (props) => {
  const { statusDisplay, friends, requests, fetchUserData } = props;

  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    let sent = [],
      received = [];

    requests.forEach((request, i) => {
      switch (request.type) {
        case "SENT":
          fetchUserData(request.friendId)
            .then((user) => {
              sent.unshift(
                <FriendItem key={i}>
                  <Name>{user.name}</Name>
                  <Id>{user._id}</Id>
                </FriendItem>
              );
              setSentRequests([...sent]);
            })
            .catch(() => {
              return null;
            });
          break;
        case "RECEIVED":
          fetchUserData(request.friendId)
            .then((user) => {
              received.unshift(
                <FriendItem key={i}>
                  <Name>{user.name}</Name>
                  <Id>{user._id}</Id>
                </FriendItem>
              );
              setReceivedRequests([...received]);
            })
            .catch(() => {
              return null;
            });
          break;
        default:
          return;
      }
    });
  };

  const renderFriends = () => {
    switch (statusDisplay) {
      case "all":
        return friends.map((friend) => {
          return <FriendItem>Friend</FriendItem>;
        });
      case "pending":
        return (
          <React.Fragment>
            <RequestArea>
              {sentRequests.length > 0 && (
                <React.Fragment>
                  <Title>sent</Title>
                  {sentRequests}
                </React.Fragment>
              )}
            </RequestArea>
            <RequestArea>
              {receivedRequests.length > 0 && (
                <React.Fragment>
                  <Title>received</Title>
                  {receivedRequests}
                </React.Fragment>
              )}
            </RequestArea>
          </React.Fragment>
        );

      default:
        return null;
    }
  };

  return <FriendsListComp>{renderFriends()}</FriendsListComp>;
};

const mapStateToProps = (state) => {
  return {
    statusDisplay: state.friend.statusDisplay,
    friends: state.friend.friends,
    requests: state.friend.requests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: (userId) => dispatch(fetchUserData(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
