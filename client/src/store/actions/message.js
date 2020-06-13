import { CHANGE_CHANNEL, RECEIVE_MESSAGE } from "./actions";

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
