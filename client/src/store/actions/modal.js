import { CHANNEL_MODAL_OPEN, CHANNEL_MODAL_CLOSE } from "./actions";

export const channelModalOpen = () => {
  return {
    type: CHANNEL_MODAL_OPEN,
  };
};

export const channelModalClose = () => {
  return {
    type: CHANNEL_MODAL_CLOSE,
  };
};
