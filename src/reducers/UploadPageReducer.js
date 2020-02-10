import {
  UPLOAD_PAGE_TOGGLE_ISSELECTED,
  UPLOAD_PAGE_UPDATE_CAPTION,
  UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH
} from '../types';


const INITIAL_STATE = {
  selectedImagePath: '',
  isSelected: false,
  caption: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case UPLOAD_PAGE_TOGGLE_ISSELECTED:
        return { ...state, isSelected: action.payload };

      case UPLOAD_PAGE_UPDATE_CAPTION:
          return { ...state, caption: action.payload };

      case UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH:
          return { ...state, selectedImagePath: action.payload };
      default:
          return state;
    }
};
