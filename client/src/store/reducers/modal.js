import {
  CHANNEL_MODAL_OPEN,
  CHANNEL_MODAL_CLOSE,
  PROJECT_MODAL_OPEN,
  PROJECT_MODAL_CLOSE,
} from "../actions/actions";

const initialState = {
  channelModalOpen: false,
  projectModalOpen: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_MODAL_OPEN:
      return { ...state, channelModalOpen: true };
    case CHANNEL_MODAL_CLOSE:
      return { ...state, channelModalOpen: false };
    case PROJECT_MODAL_OPEN:
      return { ...state, projectModalOpen: true };
    case PROJECT_MODAL_CLOSE:
      return { ...state, projectModalOpen: false };
    default:
      return state;
  }
};

export default modalReducer;
