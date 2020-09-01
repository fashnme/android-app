import RNFS from 'react-native-fs';
import {
  VIDEO_PAGE_PLAY_STATUS_UPDATE,
  PATH_TO_CACHE_DIR,
  FILE_TYPE,
  VIDEO_PAGE_DOWNLOAD_STARTED,
  VIDEO_PAGE_DOWNLOAD_COMPLETE,
  VIDEO_PAGE_STOP_DOWNLOAD_STATUS,
  VIDEO_PAGE_ADD_TO_DOWNLOADING_OBJ
} from '../types';


// import {  } from '../../types';

export const videoPagePlayStatusUpdate = ({ homePageVideoPlay, celebPageVideoPlay }) => {
  return { type: VIDEO_PAGE_PLAY_STATUS_UPDATE, payload: { homePageVideoPlay, celebPageVideoPlay } };
};


export const videoPageDownloadVideo = ({ postId, bucketUrl, compType, currentIndex }) => {
  return (dispatch) => {
    const outputPath = `${FILE_TYPE}${PATH_TO_CACHE_DIR}/${postId}.mp4`;
    RNFS.exists(PATH_TO_CACHE_DIR).then(dirIsPresent => { // Folder Exists or Not
       if (!dirIsPresent) {
         RNFS.mkdir(PATH_TO_CACHE_DIR);
       }
       RNFS.exists(outputPath).then(videoAlreadyDownloaded => { // File is already Present or Not
          if (videoAlreadyDownloaded) {
            console.log('videoPageDownloadVideo Video already Downloaded', outputPath);
            dispatch({ type: VIDEO_PAGE_DOWNLOAD_COMPLETE, payload: { postId, currentIndex, compType } });
          } else {
            dispatch({ type: VIDEO_PAGE_ADD_TO_DOWNLOADING_OBJ, payload: { postId } });
            RNFS.downloadFile({ // Download the bucketUrl
              fromUrl: bucketUrl,
              toFile: outputPath,
              begin: ({ jobId }) => dispatch({ type: VIDEO_PAGE_DOWNLOAD_STARTED, payload: { postId, postIndex: currentIndex, compType, jobId } })
            }).promise.then(() => {
              dispatch({ type: VIDEO_PAGE_DOWNLOAD_COMPLETE, payload: { postId, currentIndex, compType } });
              console.log('videoPageDownloadVideo New Video Downloaded', { postId });
            }).catch((error) => {
              console.log('videoPageDownloadVideo Error', error, { postId });
              dispatch({ type: VIDEO_PAGE_ADD_TO_DOWNLOADING_OBJ, payload: { postId, error: true } });
              deletePartialDownloadedFile({ postId });
            });
          }
       });
    }).catch((error) => {
      console.log('videoPageDownloadVideo RNFS.exists(PATH_TO_CACHE_DIR) Error', error);
    });
  };
};

const deletePartialDownloadedFile = ({ postId }) => {
  // Delete the Video which got error while downloading or aborted from downloading
  const path = `${FILE_TYPE}${PATH_TO_CACHE_DIR}/${postId}.mp4`;
  RNFS.unlink(path)
  .then(() => {
    console.log('deletePartialDownloadedFile FILE DELETED', { postId });
  })
  // `unlink` will throw an error, if the item to unlink does not exist
  .catch((err) => {
    console.log('deletePartialDownloadedFile error', { postId }, err);
  });
};

export const videoPageStopDownload = ({ postId, jobId }) => {
  // console.log('videoPageStopDownload params', { postId, jobId });
  return (dispatch) => {
    try {
      RNFS.stopDownload(jobId);//.then(() => {
      console.log('videoPageStopDownload Stopped', { postId, jobId });
      // }).catch((error) => {
      //   console.log('videoPageStopDownload error', error);
      // });
    } catch (error) {
      console.log('videoPageStopDownload 2', error, { postId, jobId });
    }
    deletePartialDownloadedFile({ postId });
    dispatch({ type: VIDEO_PAGE_STOP_DOWNLOAD_STATUS, payload: { postId } });
  };
};
