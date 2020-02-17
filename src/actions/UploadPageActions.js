// import axios from 'axios';
import { Image } from 'react-native';
import fileType from 'react-native-file-type';
import ImageResizer from 'react-native-image-resizer/index.android';
import { RNS3 } from 'react-native-aws3';

import {
  UPLOAD_PAGE_TOGGLE_ISSELECTED,
  UPLOAD_PAGE_UPDATE_CAPTION,
  UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH
} from '../types';

const options = {
  keyPrefix: 'uploads/',
  bucket: 'fashn-social',
  accessKey: 'AKIAISBMFGYLRSA53ROQ',
  secretKey: '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',
  region: 'ap-south-1',
  successActionStatus: 201
};

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

export const uploadPageUploadContent = ({ caption, selectedImagePath, userToken, personalUserId }) => {
  return (dispatch) => {
    fileType(selectedImagePath).then(({ mime }) => {
      if (mime.includes('image')) {
        resizeAndUploadImage(selectedImagePath, userToken, personalUserId);
      } else if (mime.includes('video')) {
        console.log('Video Detected');
      }
    });
    dispatch({ type: 'uploadPageUploadContent' });
  };
};

const resizeAndUploadImage = (selectedImagePath, userToken, personalUserId) => {
  Image.getSize(selectedImagePath, (w, h) => {
    ImageResizer.createResizedImage(selectedImagePath, w, h, 'WEBP', 50).then((response) => {
      console.log('Compressed Image', response.uri);
      uploadContent(response.uri, 'image/webp', personalUserId);
      // fileType(response.uri).then(({ mime }) => {
      //   console.log('New File Type', mime); // image/webp
      // });
    }).catch((err) => {
      console.log('Error in Image Compression', err);
    });
    console.log('Dimensions', w, h);
  });
};

const uploadContent = (uri, type, personalUserId) => {
  let name = '';
  let keyPrefix = '';
  if (type.includes('image')) {
    name = `${personalUserId}-time-${Math.round((new Date().getTime()) / 1000)}.webp`;
    keyPrefix = 'images/';
  } else {
    name = `${personalUserId}-time-${Math.round((new Date().getTime()) / 1000)}.mp4`;
    keyPrefix = 'videos/';
  }
  options.keyPrefix = keyPrefix;
  const file = { uri, name, type };
  RNS3.put(file, options).then(response => {
    if (response.status !== 201) {
      throw new Error('Failed to upload image to S3');
    }
    console.log('Image Uploaded', response.body);
  });
};
