import {
  CHANNEL_MODAL_OPEN,
  CHANNEL_MODAL_CLOSE,
  PROJECT_MODAL_OPEN,
  PROJECT_MODAL_CLOSE,
} from "../actions/actions";

const initialState = {
  modalData: {},
  channelModalOpen: false,
  channelModalType: null,
  projectModalOpen: false,
  projectModalType: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_MODAL_OPEN:
      return {
        ...state,
        channelModalOpen: true,
        channelModalType: action.payload.type,
        modalData: action.payload.data,
      };
    case CHANNEL_MODAL_CLOSE:
      return {
        ...state,
        channelModalOpen: false,
        channelModalType: null,
        modalData: {},
      };
    case PROJECT_MODAL_OPEN:
      return {
        ...state,
        projectModalOpen: true,
        projectModalType: action.payload.type,
        modalData: action.payload.data,
      };
    case PROJECT_MODAL_CLOSE:
      return {
        ...state,
        projectModalOpen: false,
        projectModalType: null,
        modalData: {},
      };
    default:
      return state;
  }
};

export default modalReducer;
