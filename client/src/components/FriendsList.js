import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

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
    background-color: #444;
    color: #ddd;
  }
`;

const FriendsList = (props) => {
  const { statusDisplay, friends, requests } = props;

  const renderFriends = () => {
    switch (statusDisplay) {
      case "all":
        return friends.map((friend) => {
          return <FriendItem>Friend</FriendItem>;
        });
      case "pending":
        let sent = [],
          received = [];

        requests.forEach((request) => {
          switch (request.type) {
            case "SENT":
              sent.unshift(<FriendItem>{request.friendId}</FriendItem>);
              break;
            case "RECEIVED":
              received.unshift(<FriendItem>{request.friendId}</FriendItem>);
              break;
            default:
              return;
          }
        });

        return (
          <React.Fragment>
            <RequestArea>
              {sent.length > 0 && (
                <React.Fragment>
                  <Title>sent</Title>
                  {sent}
                </React.Fragment>
              )}
            </RequestArea>
            <RequestArea>
              {received.length > 0 && (
                <React.Fragment>
                  <Title>received</Title>
                  {received}
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

export default connect(mapStateToProps)(FriendsList);
