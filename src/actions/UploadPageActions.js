// import axios from 'axios';
import { Image, Alert, Platform } from 'react-native';
import axios from 'axios';
import fileType from 'react-native-file-type';
import ImageResizer from 'react-native-image-resizer/index.android';
import { RNS3 } from 'react-native-aws3';
import { ProcessingManager } from 'react-native-video-processing';
import { Actions } from 'react-native-router-flux';
import RNFS from 'react-native-fs';


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

// Main method to recieve uploading content order
export const uploadPageUploadContent = ({ caption, selectedContentPath, userToken, personalUserId }) => {
  // console.log('Path', selectedContentPath);
  return (dispatch) => {
    dispatch({ type: UPLOAD_PAGE_UPDATE_UPLOADING_STATUS, payload: { status: 'Preparing...', isUploading: true, progress: 0 } });
    fileType(selectedContentPath).then(({ mime }) => {
      // console.log('File Type', mime);
      if (mime.includes('image')) {
        resizeAndUploadImage({ selectedImagePath: selectedContentPath, userToken, personalUserId, caption, dispatch });
      } else if (mime.includes('video')) {
        resizeAndUploadVideo({ selectedVideoPath: selectedContentPath, userToken, personalUserId, caption, dispatch });
      }
    })
    .catch((err) => {
      console.log('fileType error', err);
    });
    dispatch({ type: 'uploadPageUploadContent' });
  };
};

// Method to resize & compress Video
const resizeAndUploadVideo = ({ selectedVideoPath, userToken, personalUserId, caption, dispatch }) => {
  // console.log('resizeAndUploadVideo', selectedVideoPath);
  ProcessingManager.getVideoInfo(selectedVideoPath)
  .then((orig) => {
    const { height, width } = orig.size;
    const bitrateMultiplier = 1.1;
    // // TODO:  Set the bitrateMultiplier based on videoSize
    // const videoSize = (orig.bitrate * orig.duration) / 8; // In Bytes
    // if (videoSize > 8000000) { // Greater than 8 MB
    //   bitrateMultiplier = 1.6;
    // } else if (videoSize > 4000000) { // Greater than 4 MB
    //   bitrateMultiplier = 1.4;
    // }
    // console.log('Original Video Properties ', { orig, bitrateMultiplier, videoSize });
    // Create Thumbnail
    ProcessingManager.getPreviewForSecond(selectedVideoPath, 1, { height, width })
    .then((thumbnailData) => {
        // console.log('get getPreviewForSecond', typeof thumbnailData, thumbnailData);
        // const options = { width, height, bitrateMultiplier: 1.0 };
        const options = { width, height, bitrateMultiplier };
        // https://github.com/shahen94/react-native-video-processing/issues/138 This issue helped: bitrateMultiplier times quality degrade
        ProcessingManager.compress(selectedVideoPath, options).then((d) => {
            // console.log('Compressed Video Info ', d);
            fileType(d.source).then(({ mime }) => {
              uploadContent({ uri: d.source, type: mime, personalUserId, userToken, caption, dispatch, thumbnailData });
            });
        }).catch((err) => {
          console.log('Error in Compressing Video', err);
        });
    }).catch((err) => {
      console.log('Error in Creating Thumbnail Video', err);
    });
  })
  .catch((err) => {
    console.log('Get Video Info Error', err);
  });
};

// Method to resize & compress Image
const resizeAndUploadImage = ({ selectedImagePath, userToken, personalUserId, caption, dispatch }) => {
  Image.getSize(selectedImagePath, (w, h) => {
    ImageResizer.createResizedImage(selectedImagePath, w, h, 'WEBP', 80).then((response) => {
      uploadContent({ uri: response.uri, type: 'image/webp', personalUserId, userToken, caption, dispatch });
    }).catch((err) => {
      console.log('Error in Image Compression', err);
    });
  });
};

// Method to upload content on AWS
const uploadContent = ({ uri, type, personalUserId, userToken, caption, dispatch, thumbnailData }) => {
  dispatch({ type: UPLOAD_PAGE_UPDATE_UPLOADING_STATUS, payload: { status: 'Uploading...', isUploading: true, progress: 0 } });
  let name = '';
  let keyPrefix = '';
  let thumbName = '';
  let thumbkeyPrefix = '';
  if (type.includes('image')) {
    name = `${personalUserId}-t-${Math.round((new Date().getTime()) / 1000)}.webp`;
    keyPrefix = 'images/';
  } else {
    const time = Math.round((new Date().getTime()) / 1000);
    name = `${personalUserId}-t-${time}.mp4`;
    keyPrefix = 'videos/';
    thumbName = `${personalUserId}-t-${time}-preview.webp`;
    thumbkeyPrefix = 'thumbnails/';
  }
  AWS_OPTIONS.keyPrefix = keyPrefix;
  const file = { uri, name, type };
  RNS3.put(file, AWS_OPTIONS)
  .progress(({ percent }) => {
    dispatch({ type: UPLOAD_PAGE_UPDATE_UPLOADING_STATUS, payload: { status: 'Uploading...', isUploading: true, progress: percent - 0.04 } });
  })
  .then(response => {
    if (response.status === 201) {
      console.log('Content Uploaded', response.data);
      if (type.includes('image')) {
        updateDatabase({ caption, mediaType: type, uploadUrl: response.body.postResponse.location, userToken, dispatch });
      } else {
        uploadThumbnailMethod({ thumbnailData, thumbName, thumbkeyPrefix, mediaType: type, caption, uploadUrl: response.body.postResponse.location, userToken, dispatch, });
        // updateDatabase({ caption, mediaType: type, uploadUrl: response.body.postResponse.location, userToken, dispatch, thumbnailUrl });
      }
    } else {
      console.log('Error in Uploading Content', response, uri, name, type);
    }
  })
  .catch((err) => {
    console.log('Catch Error in Uploading Content', err);
  });
};

// Method to upload the Video thumbnail on AWS
const uploadThumbnailMethod = ({ thumbnailData, thumbkeyPrefix, thumbName, mediaType, caption, uploadUrl, userToken, dispatch, }) => {
  const cacheDir = `${RNFS.DocumentDirectoryPath}/Cache`;
  const FILE = Platform.OS === 'ios' ? '' : 'file://';
  const outputPath = `${FILE}${cacheDir}/image.jpg`;
  RNFS.exists(cacheDir)
    .then(response => {
         if (response !== true) {
          // Directory not exists
          RNFS.mkdir(cacheDir);
         }
         RNFS.writeFile(outputPath, thumbnailData, 'base64')
          .then(() => {
            // console.log('writeFile', res);

            // Compress the Thumbnail
            Image.getSize(outputPath, (w, h) => {
              ImageResizer.createResizedImage(outputPath, w, h, 'WEBP', 40).then((resp) => {
                  AWS_OPTIONS.keyPrefix = thumbkeyPrefix;
                  const file = { uri: resp.uri, name: thumbName, type: 'image/webp' };
                  RNS3.put(file, AWS_OPTIONS)
                  .then(awsresponse => {
                    const thumbnailUrl = awsresponse.body.postResponse.location;
                    updateDatabase({ caption, mediaType, uploadUrl, userToken, dispatch, thumbnailUrl });
                  }).catch((err) => {
                    console.log('Error in Uploading Thumbnail', err);
                  });
                // uploadContent({ uri: resp.uri, type: 'image/webp', personalUserId, userToken, caption, dispatch });
              }).catch((err) => {
                console.log('Error in Thumbnail Image Compression', err);
              });
            });
          }).catch((error) => {
            console.log('uploadThumbnailMethod RNFS.writeFile error', error);
            Alert(JSON.stringify(error));
          });
     })
     .catch((error) => {
         console.log('Error while writing Thumbnail to file', error);
    });
};

// Final Step to update Database
const updateDatabase = ({ caption, mediaType, uploadUrl, userToken, dispatch, thumbnailUrl }) => {
  // console.log('updateDatabase', caption, mediaType, uploadUrl, userToken, dispatch, thumbnailUrl);
  dispatch({ type: UPLOAD_PAGE_UPDATE_UPLOADING_STATUS, payload: { status: 'Almost Done...', isUploading: true, progress: 0.99 } });
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  const data = { caption, mediaType: mediaType.split('/')[0], uploadUrl };
  if (thumbnailUrl !== undefined) {
    data.thumbnailUrl = thumbnailUrl;
  }
  axios({
      method: 'post',
      url: UploadPageUploadContentURL,
      headers,
      data
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
