import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { fetchUserData } from "../shared/utils";
import { deleteFriendRequest } from "../store/actions";

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
  } = props;

  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    fetchRequests(requests);
  }, [requests]);

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
                      onClick={() =>
                        onDeleteFriendRequest(user._id, friend._id)
                      }
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
                    <Button onClick={(e) => console.log(e)}>
                      <i className="fa fa-check"></i>
                    </Button>
                    <Button onClick={(e) => console.log(e)} color="red">
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

  const onDeleteFriendRequest = (userId, friendId) => {
    deleteFriendRequest(userId, friendId);
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
