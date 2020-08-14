import {
  SHARE_PAGE_TOGGLE_SHARE_MODAL,
  SHARE_PAGE_UPDATE_DOWNLOAD_PROGRESS
} from '../types';

const INITIAL_STATE = {
  shareModalVisible: false, // Referred By
  shareDownloadProgress: 0 // Video/Image Download Progress
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SHARE_PAGE_TOGGLE_SHARE_MODAL:
          return { ...state, shareModalVisible: action.payload, shareDownloadProgress: 0 };

      case SHARE_PAGE_UPDATE_DOWNLOAD_PROGRESS: {
        if (action.payload === undefined) {
          return state;
        }
        return { ...state, shareDownloadProgress: action.payload };
      }

      default:
          return state;
    }
};
