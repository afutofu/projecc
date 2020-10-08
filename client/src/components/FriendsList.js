import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

import { fetchUserData } from "../shared/utils";
import { deleteFriendRequest, addFriend, deleteFriend } from "../store/actions";

const fadeIn = keyframes`
from{
  opacity:0;
}
to{
  opacity:1;
}
`;

const FriendsListComp = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease forwards;
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
  padding: 5px 20px;
  padding-right: 15px;
  background-color: none;
  color: #aaa;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
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

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const Buttons = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;
  font-size: 18px;

  transition: 0.2s;
  ${FriendItem}:hover & {
    transition: 0.5s;
    opacity: 1;
  }
`;

const Button = styled.div`
  transition: 0.2s;
  padding: 5px;
  margin-left: 10px;

  i {
    transition: 0.3s;
  }

  :hover i {
    color: ${(props) => (props.color ? props.color : "#1a8cff")};
  }
`;

const FriendsList = (props) => {
  const {
    statusDisplay,
    user,
    friends,
    requests,
    fetchUserData,
    deleteFriendRequest,
    addFriend,
    deleteFriend,
  } = props;

  const [allFriends, setAllFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    fetchFriends(friends);
    fetchRequests(requests);
  }, [friends, requests]);

  const fetchFriends = (friends) => {
    let friendsArr = [];

    setAllFriends([...friendsArr]);

    friends.forEach((friend, i) => {
      fetchUserData(friend.friendId)
        .then((friend) => {
          friendsArr.unshift(
            <FriendItem key={i}>
              <Info>
                <Name>{friend.name}</Name>
                <Id>{friend._id}</Id>
              </Info>
              <Buttons>
                <Button
                  onClick={() => deleteFriend(user._id, friend._id)}
                  color="red"
                >
                  <i className="fa fa-times"></i>
                </Button>
              </Buttons>
            </FriendItem>
          );
          setAllFriends([...friendsArr]);
        })
        .catch(() => {
          return null;
        });
    });
  };

  const fetchRequests = (requests) => {
    let sent = [],
      received = [];

    setSentRequests([...sent]);
    setReceivedRequests([...received]);

    requests.forEach((request, i) => {
      console.log(request);
      switch (request.type) {
        case "SENT":
          fetchUserData(request.friendId)
            .then((friend) => {
              sent.unshift(
                <FriendItem key={i}>
                  <Info>
                    <Name>{friend.name}</Name>
                    <Id>{friend._id}</Id>
                  </Info>
                  <Buttons>
                    <Button
                      onClick={() => deleteFriendRequest(user._id, friend._id)}
                      color="red"
                    >
                      <i className="fa fa-times"></i>
                    </Button>
                  </Buttons>
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
            .then((friend) => {
              received.unshift(
                <FriendItem key={i}>
                  <Info>
                    <Name>{friend.name}</Name>
                    <Id>{friend._id}</Id>
                  </Info>
                  <Buttons>
                    <Button onClick={() => addFriend(user._id, friend._id)}>
                      <i className="fa fa-check"></i>
                    </Button>
                    <Button
                      onClick={() => deleteFriendRequest(user._id, friend._id)}
                      color="red"
                    >
                      <i className="fa fa-times"></i>
                    </Button>
                  </Buttons>
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
        return allFriends.length > 0 && allFriends;
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
    user: state.auth.user,
    friends: state.friend.friends,
    requests: state.friend.requests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: (userId) => dispatch(fetchUserData(userId)),
    deleteFriendRequest: (userId, friendId) =>
      dispatch(deleteFriendRequest(userId, friendId)),
    addFriend: (userId, friendId) => dispatch(addFriend(userId, friendId)),
    deleteFriend: (userId, friendId) =>
      dispatch(deleteFriend(userId, friendId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
