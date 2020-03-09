import {
  UPLOAD_PAGE_TOGGLE_ISSELECTED,
  UPLOAD_PAGE_UPDATE_CAPTION,
  UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH,
  UPLOAD_PAGE_UPDATE_UPLOADING_STATUS
} from '../types';


const INITIAL_STATE = {
  selectedImagePath: '',
  isSelected: false,
  caption: '',
  uploadingStatus: { status: '', isUploading: false, progress: 0 }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case UPLOAD_PAGE_TOGGLE_ISSELECTED:
        return { ...state, isSelected: action.payload };

      case UPLOAD_PAGE_UPDATE_CAPTION:
          return { ...state, caption: action.payload };

      case UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH:
          return { ...state, selectedImagePath: action.payload };

      case UPLOAD_PAGE_UPDATE_UPLOADING_STATUS: {
        const { status, isUploading, progress } = action.payload;
        return { ...state, uploadingStatus: { status, isUploading, progress } };
      }
      default:
          return state;
    }
};
