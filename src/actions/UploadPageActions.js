// import axios from 'axios';

import {
  UPLOAD_PAGE_TOGGLE_ISSELECTED,
  UPLOAD_PAGE_UPDATE_CAPTION,
  UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH
} from '../types';

export const uploadPageToggleIsSelected = (isSelected) => {
  return {
    type: UPLOAD_PAGE_TOGGLE_ISSELECTED,
    payload: isSelected
  };
};

export const uploadPageUpdateCaption = (caption) => {
  return {
    type: UPLOAD_PAGE_UPDATE_CAPTION,
    payload: caption
  };
};

export const uploadPageUpdateSelectedImagePath = (imgPath) => {
  return {
    type: UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH,
    payload: imgPath
  };
};
