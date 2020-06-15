import { CHANGE_CHANNEL, RECEIVE_MESSAGE, CREATE_CHANNEL } from "./actions";

export const changeChannel = (channel) => {
  return {
    type: CHANGE_CHANNEL,
    payload: { channel },
  };
};

export const receiveMessage = ({ user, msg, channel }) => {
  return {
    type: RECEIVE_MESSAGE,
    payload: { user, msg, channel },
  };
};

export const createChannel = (channel) => {
  return {
    type: CREATE_CHANNEL,
    payload: { channel },
  };
};
