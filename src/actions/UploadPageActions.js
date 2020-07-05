// import axios from 'axios';
import { Image, Alert } from 'react-native';
import axios from 'axios';
import fileType from 'react-native-file-type';
import ImageResizer from 'react-native-image-resizer/index.android';
import { RNS3 } from 'react-native-aws3';
import { ProcessingManager } from 'react-native-video-processing';
import { Actions } from 'react-native-router-flux';

import {
  AWS_OPTIONS,
  UPLOAD_PAGE_TOGGLE_ISSELECTED,
  UPLOAD_PAGE_UPDATE_CAPTION,
  UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH,
  UPLOAD_PAGE_UPDATE_UPLOADING_STATUS
} from '../types';

import {
  UploadPageUploadContentURL
} from '../URLS';

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

export const uploadPageUpdateselectedContentPath = ({ selectedContentPath, mediaType }) => {
  return {
    type: UPLOAD_PAGE_UPDATE_SELECTED_IMAGE_PATH,
    payload: { selectedContentPath, mediaType }
  };
};

export const uploadPageUploadContent = ({ caption, selectedContentPath, userToken, personalUserId }) => {
  // console.log('Path', selectedContentPath);
  return (dispatch) => {
    dispatch({ type: UPLOAD_PAGE_UPDATE_UPLOADING_STATUS, payload: { status: 'Preparing...', isUploading: true, progress: 0 } });
    fileType(selectedContentPath).then(({ mime }) => {
      // console.log('File Type', mime);
      if (mime.includes('image')) {
        resizeAndUploadImage(selectedContentPath, userToken, personalUserId, caption, dispatch);
      } else if (mime.includes('video')) {
        resizeAndUploadVideo(selectedContentPath, userToken, personalUserId, caption, dispatch);
      }
    })
    .catch((err) => {
      console.log('fileType error', err);
    });
    dispatch({ type: 'uploadPageUploadContent' });
  };
};

const resizeAndUploadVideo = (selectedVideoPath, userToken, personalUserId, caption, dispatch) => {
  ProcessingManager.getVideoInfo(selectedVideoPath)
  .then((orig) => {
    // console.log('Original Video Info', orig);
    const { height, width } = orig.size;
    const options = { width, height, bitrateMultiplier: 3, minimumBitrate: 300000 };
    ProcessingManager.compress(selectedVideoPath, options).then((d) => {
        // console.log('Compressed Video Info ', d);
        fileType(d.source).then(({ mime }) => { uploadContent(d.source, mime, personalUserId, userToken, caption, dispatch); });
    }).catch((err) => {
      console.log('Error in Compressing Video', err);
    });
  })
  .catch((err) => {
    console.log('Get Video Info Error', err);
  });
};

const resizeAndUploadImage = (selectedContentPath, userToken, personalUserId, caption, dispatch) => {
  Image.getSize(selectedContentPath, (w, h) => {
    ImageResizer.createResizedImage(selectedContentPath, w, h, 'WEBP', 50).then((response) => {
      uploadContent(response.uri, 'image/webp', personalUserId, userToken, caption, dispatch);
    }).catch((err) => {
      console.log('Error in Image Compression', err);
    });
  });
};

const uploadContent = (uri, type, personalUserId, userToken, caption, dispatch) => {
  dispatch({ type: UPLOAD_PAGE_UPDATE_UPLOADING_STATUS, payload: { status: 'Uploading...', isUploading: true, progress: 0 } });
  let name = '';
  let keyPrefix = '';
  if (type.includes('image')) {
    name = `${personalUserId}-t-${Math.round((new Date().getTime()) / 1000)}.webp`;
    keyPrefix = 'images/';
  } else {
    name = `${personalUserId}-t-${Math.round((new Date().getTime()) / 1000)}.mp4`;
    keyPrefix = 'videos/';
  }
  AWS_OPTIONS.keyPrefix = keyPrefix;
  const file = { uri, name, type };
  RNS3.put(file, AWS_OPTIONS)
  .progress(({ percent }) => {
    dispatch({ type: UPLOAD_PAGE_UPDATE_UPLOADING_STATUS, payload: { status: 'Uploading...', isUploading: true, progress: percent - 0.02 } });
  })
  .then(response => {
    if (response.status === 201) {
      console.log('Content Uploaded', response);
      updateDatabase(caption, type, response.body.postResponse.location, userToken, dispatch);
    } else {
      console.log('Error in Uploading Content', response, uri, name, type);
    }
  })
  .catch((err) => {
    console.log('Catch Error in Uploading Content', err);
  });
};

const updateDatabase = (caption, mediaType, uploadUrl, userToken, dispatch) => {
  console.log(caption, mediaType, uploadUrl, userToken);
  dispatch({ type: UPLOAD_PAGE_UPDATE_UPLOADING_STATUS, payload: { status: 'Almost Done...', isUploading: true, progress: 0.99 } });
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
          dispatch({ type: UPLOAD_PAGE_TOGGLE_ISSELECTED, payload: false }); // No path is Selected
          dispatch({ type: UPLOAD_PAGE_UPDATE_UPLOADING_STATUS, payload: { status: '', isUploading: false, progress: 0 } });
          Alert.alert(
               'Congrats!',
               'Your Content is Posted', [{
                   text: 'Ok',
               }], {
                   cancelable: true
               }
            );
          Actions.uploadPage();
      })
      .catch((error) => {
          //handle error
          console.log('Content Uploaded updateDatabase ', error);
    });
};
