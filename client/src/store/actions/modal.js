import {
  CHANNEL_MODAL_OPEN,
  CHANNEL_MODAL_CLOSE,
  PROJECT_MODAL_OPEN,
  PROJECT_MODAL_CLOSE,
} from "./actions";

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

export const projectModalOpen = () => {
  return {
    type: PROJECT_MODAL_OPEN,
  };
};

export const projectModalClose = () => {
  return {
    type: PROJECT_MODAL_CLOSE,
  };
};
