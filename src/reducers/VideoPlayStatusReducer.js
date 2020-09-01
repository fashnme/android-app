import {
  VIDEO_PAGE_PLAY_STATUS_UPDATE,
  VIDEO_PAGE_DOWNLOAD_STARTED,
  VIDEO_PAGE_DOWNLOAD_COMPLETE,
  VIDEO_PAGE_STOP_DOWNLOAD_STATUS,
  VIDEO_PAGE_ADD_TO_DOWNLOADING_OBJ
} from '../types';


const INITIAL_STATE = {
  homePageVideoPlay: false,
  celebPageVideoPlay: false,
  previousState: { homePageVideoPlay: false, celebPageVideoPlay: false }, // Holds the previous State
  // So, when app comes in foreground from background, the values resetted
  videosDownloadingStatus: [], // ['postId': { jobId: To stop un-necessary download,
    // postIndex: To mark which download to be stopped, compType: 'homeVideo'/'customVideo' so that both
    // don't interfare with each other  }]
  videosDownloaded: {}, // Keep track of downloaded Videos, so that video page is not refreshed when a video is removed from above object
  videosAlreadyDownloading: {}, // Videos Currently Downloading
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case VIDEO_PAGE_PLAY_STATUS_UPDATE: {
        const { homePageVideoPlay, celebPageVideoPlay } = action.payload;
        const previousState = { homePageVideoPlay: state.homePageVideoPlay, celebPageVideoPlay: state.celebPageVideoPlay };
        return { ...state, homePageVideoPlay, celebPageVideoPlay, previousState };
      }

      case VIDEO_PAGE_ADD_TO_DOWNLOADING_OBJ: {
        const { postId, error } = action.payload;
        if (error) {
          // Error While Downloading the video, then remove it from downloading
          const newVideosAlreadyDownloading = { ...state.videosAlreadyDownloading };
          delete newVideosAlreadyDownloading[postId];
          return { ...state, videosAlreadyDownloading: newVideosAlreadyDownloading };
        }
        // Add to Downloading Object
        const newObject = {};
        newObject[postId] = 1;
        const newVideosAlreadyDownloading = { ...state.videosAlreadyDownloading, ...newObject };
        return { ...state, videosAlreadyDownloading: newVideosAlreadyDownloading };
      }

      case VIDEO_PAGE_DOWNLOAD_STARTED: {
        // Add to Array
        const { postId, postIndex, compType, jobId } = action.payload;
        const newArray = [...state.videosDownloadingStatus, { postId, postIndex, compType, jobId }];
        return { ...state, videosDownloadingStatus: newArray };
      }

      case VIDEO_PAGE_DOWNLOAD_COMPLETE: {
        const { postId, currentIndex, compType } = action.payload;
        if (postId in state.videosDownloaded) {
          // Video already downloaded
          return state;
        }
        const newObject = {};
        newObject[postId] = { index: currentIndex, compType };
        const newVideosDownloaded = { ...state.videosDownloaded, ...newObject };
        // Remove from downloading Object
        const newVideosAlreadyDownloading = { ...state.videosAlreadyDownloading };
        delete newVideosAlreadyDownloading[postId];
        // Remove the post from videosDownloadingStatus array // TODO
        let delIndex = null;
        const { videosDownloadingStatus } = state;
        videosDownloadingStatus.forEach((obj, index) => { if (obj.postId === postId) { delIndex = index; } });
        if (delIndex !== null) {
          videosDownloadingStatus.splice(delIndex, 1);
          const newVideosDownloadingStatus = [...videosDownloadingStatus];
          return { ...state, videosDownloadingStatus: newVideosDownloadingStatus, videosDownloaded: newVideosDownloaded, videosAlreadyDownloading: newVideosAlreadyDownloading };
        }
        return { ...state, videosDownloaded: newVideosDownloaded, videosAlreadyDownloading: newVideosAlreadyDownloading };
      }

      case VIDEO_PAGE_STOP_DOWNLOAD_STATUS: {
        const { postId } = action.payload;
        // Remove from downloading Object
        const newVideosAlreadyDownloading = { ...state.videosAlreadyDownloading };
        delete newVideosAlreadyDownloading[postId];
        let delIndex = null;
        const { videosDownloadingStatus } = state;
        videosDownloadingStatus.forEach((obj, index) => { if (obj.postId === postId) { delIndex = index; } });
        if (delIndex !== null) {
          videosDownloadingStatus.splice(delIndex, 1);
          const newVideosDownloadingStatus = [...videosDownloadingStatus];
          return { ...state, videosDownloadingStatus: newVideosDownloadingStatus, videosAlreadyDownloading: newVideosAlreadyDownloading };
        }
        return { ...state, videosAlreadyDownloading: newVideosAlreadyDownloading };
      }

      default:
          return state;
    }
};
