import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  videoPageDownloadVideo as _videoPageDownloadVideo,
  videoPageStopDownload as _videoPageStopDownload
} from '../../actions';
// import RNFS from 'react-native-fs';
// import { PATH_TO_CACHE_DIR } from '../../types';

const secondPriority = 1;
const thirdPriority = 2;

const highPriorityAlreadyDownloaded = ({ videosDownloaded, currentIndex, videosAlreadyDownloading,
  compType, postId, priority }) => {
  if (postId in videosDownloaded || postId in videosAlreadyDownloading) {
    return false;
  }
  // Check if previous already downloaded
  if (priority === secondPriority) {
    for (const [, obj] of Object.entries(videosDownloaded)) {
      if (currentIndex - priority === obj.index && compType === obj.compType) {
        return true;
      }
    }
  } else if (priority === thirdPriority) {
    // It means first video is already downloaded and now check if second is downloaded
    for (const [, obj] of Object.entries(videosDownloaded)) {
      if (currentIndex - secondPriority === obj.index && compType === obj.compType) {
        return true;
      }
    }
  }

  return false;
};

const stopUnwantedDownloadVideos = ({ videosDownloadingStatus, currentVisibleIndex, compType, videoPageStopDownload }) => {
  try {
    // console.log('videosDownloadingStatus', videosDownloadingStatus);
    videosDownloadingStatus.forEach((obj,) => {
      // If currentVisibleIndex is greater than postIndex and compType is same then stop that download
      if (currentVisibleIndex > obj.postIndex && compType === obj.compType) {
        console.log('VideoDownloadComp component Stopping Download', obj);
        videoPageStopDownload({ jobId: obj.jobId, postId: obj.postId });
      }
    });
  } catch (error) {
    console.log('Remove the old downloading videos', error);
  }
};


const VideoDownloadComp = ({ bucketUrl, postId, compType, currentIndex, currentVisibleIndex, shareModalVisible,
  videosDownloadingStatus, videosAlreadyDownloading, videosDownloaded,
  videoPageDownloadVideo, videoPageStopDownload }) => {
  if (!(currentIndex - currentVisibleIndex > thirdPriority || currentIndex - currentVisibleIndex < 0)) {
    if ((currentIndex === currentVisibleIndex) && !(postId in videosAlreadyDownloading || postId in videosDownloaded)) {
      videoPageDownloadVideo({ bucketUrl, postId, compType, currentIndex });
      stopUnwantedDownloadVideos({ videosDownloadingStatus, currentVisibleIndex, compType, videoPageStopDownload });
      console.log('First Priority Download Complete', currentIndex);
    } else if (currentIndex === currentVisibleIndex + secondPriority && !shareModalVisible &&
      highPriorityAlreadyDownloaded({ videosDownloaded, currentIndex, videosAlreadyDownloading, compType, postId, priority: secondPriority })) {
      videoPageDownloadVideo({ bucketUrl, postId, compType, currentIndex });
      stopUnwantedDownloadVideos({ videosDownloadingStatus, currentVisibleIndex, compType, videoPageStopDownload });
      console.log('Second Priority Download Complete', currentIndex);
    } else if (currentIndex === currentVisibleIndex + thirdPriority && !shareModalVisible &&
      highPriorityAlreadyDownloaded({ videosDownloaded, currentIndex, videosAlreadyDownloading, compType, postId, priority: thirdPriority })) {
      videoPageDownloadVideo({ bucketUrl, postId, compType, currentIndex });
      stopUnwantedDownloadVideos({ videosDownloadingStatus, currentVisibleIndex, compType, videoPageStopDownload });
      console.log('Third Priority Download Complete', currentIndex);
    }
  }
  return <View />;
};

const mapStateToProps = ({ videoPlayStatusState, sharePageState }) => {
  const { videosDownloadingStatus, videosAlreadyDownloading, videosDownloaded } = videoPlayStatusState;
  const { shareModalVisible } = sharePageState; // Stop Caching when user sharing the video
  return { videosDownloadingStatus, videosAlreadyDownloading, videosDownloaded, shareModalVisible };
};
export default connect(mapStateToProps, {
  videoPageDownloadVideo: _videoPageDownloadVideo,
  videoPageStopDownload: _videoPageStopDownload
})(VideoDownloadComp);
