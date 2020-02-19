// import axios from 'axios';
import { Image } from 'react-native';
import axios from 'axios';
import fileType from 'react-native-file-type';
import ImageResizer from 'react-native-image-resizer/index.android';
import { RNS3 } from 'react-native-aws3';
import { ProcessingManager } from 'react-native-video-processing';

import {
  UPLOAD_PAGE_TOGGLE_ISSELECTED,
  UPLOAD_PAGE_UPDATE_CAPTION,
  UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH
} from '../types';

import {
  UploadPageUploadContentURL
} from '../URLS';


const awsOptions = {
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
  // console.log('Path', selectedImagePath);
  return (dispatch) => {
    fileType(selectedImagePath).then(({ mime }) => {
      // console.log('File Type', mime);
      if (mime.includes('image')) {
        resizeAndUploadImage(selectedImagePath, userToken, personalUserId, caption);
      } else if (mime.includes('video')) {
        resizeAndUploadVideo(selectedImagePath, userToken, personalUserId, caption);
      }
    })
    .catch((err) => {
      console.log('fileType error', err);
    });
    dispatch({ type: 'uploadPageUploadContent' });
  };
};

const resizeAndUploadVideo = (selectedVideoPath, userToken, personalUserId, caption) => {
  ProcessingManager.getVideoInfo(selectedVideoPath)
  .then((orig) => {
    // console.log('Video Info', orig);
    const { height, width } = orig.size;
    const options = { width, height, bitrateMultiplier: 3, minimumBitrate: 300000 };
    ProcessingManager.compress(selectedVideoPath, options).then((d) => {
        // console.log('Compressed Video Info ', d);
        fileType(d.source).then(({ mime }) => { uploadContent(d.source, mime, personalUserId, userToken, caption); });
    }).catch((err) => {
      console.log('Error in Compressing Video', err);
    });
  })
  .catch((err) => {
    console.log('Get Video Info Error', err);
  });
};

const resizeAndUploadImage = (selectedImagePath, userToken, personalUserId, caption) => {
  Image.getSize(selectedImagePath, (w, h) => {
    ImageResizer.createResizedImage(selectedImagePath, w, h, 'WEBP', 50).then((response) => {
      uploadContent(response.uri, 'image/webp', personalUserId, userToken, caption);
    }).catch((err) => {
      console.log('Error in Image Compression', err);
    });
  });
};

const uploadContent = (uri, type, personalUserId, userToken, caption) => {
  let name = '';
  let keyPrefix = '';
  if (type.includes('image')) {
    name = `${personalUserId}-time-${Math.round((new Date().getTime()) / 1000)}.webp`;
    keyPrefix = 'images/';
  } else {
    name = `${personalUserId}-time-${Math.round((new Date().getTime()) / 1000)}.mp4`;
    keyPrefix = 'videos/';
  }
  awsOptions.keyPrefix = keyPrefix;
  const file = { uri, name, type };
  RNS3.put(file, awsOptions).then(response => {
    if (response.status === 201) {
      console.log('Content Uploaded', response);
      updateDatabase(caption, type, response.body.postResponse.location, userToken);
    } else {
      console.log('Error in Uploading Content', response, uri, name, type);
    }
  })
  .catch((err) => {
    console.log('Catch Error in Uploading Content', err);
  });
};

const updateDatabase = (caption, mediaType, uploadUrl, userToken) => {
  console.log(caption, mediaType, uploadUrl, userToken);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  axios({
      method: 'post',
      url: UploadPageUploadContentURL,
      headers,
      data: { caption, mediaType: mediaType.split('/')[0], uploadUrl }
      })
      .then((response) => {
          console.log('Content Uploaded updateDatabase', response.data);
      })
      .catch((error) => {
          //handle error
          console.log('Content Uploaded updateDatabase ', error);
    });
};
