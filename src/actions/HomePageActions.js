import axios from 'axios';
import Share from 'react-native-share';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {
  HOME_PAGE_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_FEED_EXTRA_DATA_UPDATE,
  HOME_PAGE_PUBLIC_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_PUBLIC_FEED_EXTRA_DATA_UPDATE,
  HOME_PAGE_ACTIVE_TAB_UPDATE,
  HOME_PAGE_SET_PUBLIC_VERTICAL_CAROUSEL_REF,
  HOME_PAGE_SET_PERSONAL_VERTICAL_CAROUSEL_REF,
  USER_LIKED_POST,
  USER_UNLIKED_POST,
  USER_SET_ACTION_DATA,
  PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID,
  PLAY_STORE_LINK,
  FIREBASE_DOMAIN_URI_PREFIX,
  SHARE_PAGE_TOGGLE_SHARE_MODAL,
  SHARE_PAGE_UPDATE_DOWNLOAD_PROGRESS
} from '../types';

import {
  HomePageGetInitialFeedDataURL,
  HomePageGetInitialPublicFeedDataURL,
  HomePageLikePostURL,
  HomePageUnlikePostURL,
  HomePageDislikePostURL,
  HomePageFetchUserColdStartDetailsURL,
  HomePageMarkUserViewedPostURL
} from '../URLS';


// Fetch Cold Start User Details
export const homePageFetchUserColdStartDetails = ({ userToken }) => {
  return (dispatch) => {
    axios.get(HomePageFetchUserColdStartDetailsURL, { headers: { Authorization: userToken } })
    .then(response => {
      // console.log('Actions homePageFetchUserColdStartDetails', response.data);
      const { followingMap, userLikedPostsMap, userCartMap, userWishlistMap, userLikedCommentsMap, userDetails } = response.data;
      // Set the User Details
      if (userDetails !== undefined) {
        dispatch({ type: PERSONAL_PAGE_SET_PERSONAL_DETAILS_AND_USERID, payload: userDetails });
      }

      const payload = { likedPosts: {}, followingDataMap: {}, userCartMap: {}, userWishlistMap: {}, likedComments: {} };
      if (followingMap !== undefined) {
        payload.followingDataMap = followingMap;
      }
      if (userLikedPostsMap !== undefined) {
        payload.likedPosts = userLikedPostsMap;
      }
      if (userCartMap !== undefined) {
        payload.userCartMap = userCartMap;
      }
      if (userWishlistMap !== undefined) {
        payload.userWishlistMap = userWishlistMap;
      }
      if (userLikedCommentsMap !== undefined) {
        payload.likedComments = userLikedCommentsMap;
      }
      dispatch({ type: USER_SET_ACTION_DATA, payload });
    })
    .catch(error => {
      console.log('HomePageActions homePageFetchUserColdStartDetails Error', error);
    });
  };
};


// Method to Get the Initial Personal Feed Data
export const homePageGetInitialFeedData = ({ userToken }) => {
  return (dispatch) => {
    axios.get(HomePageGetInitialFeedDataURL, { headers: { Authorization: userToken } })
    .then(response => {
      // console.log('Actions homePageGetInitialFeedData', response.data.posts);
      dispatch({ type: HOME_PAGE_FEED_INITIAL_DATA_UPDATE, payload: response.data.posts });
    })
    .catch(error => {
      console.log('HomePageActions homePageGetInitialFeedData Error', error);
    });
  };
};


// Method to Get the Extra Personal Feed Data
export const homePageGetExtraFeedData = ({ userToken, feedPageNum }) => {
  console.log('Actions ', userToken, feedPageNum);
  return {
    type: HOME_PAGE_FEED_EXTRA_DATA_UPDATE,
    payload: []
  };
};

// Method to Get the Initial Public Feed Data
export const homePageGetInitialPublicFeedData = ({ userToken }) => {
  return (dispatch) => {
    axios.get(HomePageGetInitialPublicFeedDataURL, { headers: { Authorization: userToken } })
    .then(response => {
      // console.log('Actions Feed Data', response.data.posts);
      dispatch({ type: HOME_PAGE_PUBLIC_FEED_INITIAL_DATA_UPDATE, payload: response.data.posts });
    })
    .catch(error => {
      console.log('HomePageActions homePageGetInitialFeedData Error', error);
    });
  };
};

// Method to Get the Extra Public Feed Data
export const homePageGetExtraPublicFeedData = ({ userToken, publicFeedPageNum }) => {
  console.log('Actions ', userToken, publicFeedPageNum);
  return {
    type: HOME_PAGE_PUBLIC_FEED_EXTRA_DATA_UPDATE,
    payload: []
  };
};

// Method to Update the Active Tab on Home page
export const homePageUpdateActiveTab = ({ activeTab }) => {
  // console.log('Active Tab Updated', activeTab);
  return {
    type: HOME_PAGE_ACTIVE_TAB_UPDATE,
    payload: activeTab
  };
};

// Method to set verticalPublicCarouselRef on Home Page
export const homePageSetPublicVerticalCarouselRef = (ref) => {
  return {
      type: HOME_PAGE_SET_PUBLIC_VERTICAL_CAROUSEL_REF,
      payload: ref
  };
};

// Method to set verticalPersonalCarouselRef on Home Page
export const homePageSetPersonalVerticalCarouselRef = (ref) => {
  return {
      type: HOME_PAGE_SET_PERSONAL_VERTICAL_CAROUSEL_REF,
      payload: ref
  };
};

// Method to Like a Post
export const homePageLikePost = ({ userToken, postId, userId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  // console.log('usertoken', userToken);
  return (dispatch) => {
    dispatch({ type: USER_LIKED_POST, payload: postId });
    axios({
        method: 'post',
        url: HomePageLikePostURL,
        headers,
        data: { postId, posterId: userId }
        })
        .then((response) => {
            console.log('homePageLikePost', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('homePageLikePost Actions Error ', error);
      });
  };
};


// Method to UnLike a Post
export const homePageUnlikePost = ({ userToken, postId, userId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_UNLIKED_POST, payload: postId });
    axios({
        method: 'post',
        url: HomePageUnlikePostURL,
        headers,
        data: { postId, posterId: userId }
        })
        .then((response) => {
            console.log('homePageUnlikePost', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('homePageUnlikePost Actions Error ', error);
      });
  };
};


// Method to Dislike a Post
export const homePageDislikePost = ({ userToken, postId, userId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_UNLIKED_POST, payload: postId });
    axios({
        method: 'post',
        url: HomePageDislikePostURL,
        headers,
        data: { postId, posterId: userId }
        })
        .then((response) => {
            console.log('homePageDislikePost', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('homePageDislikePost Actions Error ', error);
      });
  };
};

// Method to mark that video is viewed by user
export const homePageMarkUserViewedPost = ({ posterId, postId, referrerId, userToken }) => {
  console.log('homePageMarkUserViewedPost', { posterId, postId, referrerId, userToken });
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: 'homePageMarkUserViewedPost' });
    axios({
        method: 'post',
        url: HomePageMarkUserViewedPostURL,
        headers,
        data: { viewedPostArray: [{ postId, posterId, referrerId, timeStamp: new Date() }] }
        })
        .then((response) => {
            console.log('homePageMarkUserViewedPost', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('homePageMarkUserViewedPost Actions Error ', error);
      });
  };
};

export const homePageSharePost = ({ postData, referrerId }) => {
  return (dispatch) => {
    dispatch({ type: SHARE_PAGE_TOGGLE_SHARE_MODAL, payload: true });
    let url = '';
    let thumbnailUrl = '';
    if (postData.mediaType === 'video') {
      url = postData.bucketUrl;
      thumbnailUrl = postData.thumbnailUrl;
    } else {
      url = postData.uploadUrl;
      thumbnailUrl = postData.uploadUrl;
    }

    // Options for downloading file
    const type = postData.mediaType;
    const FILE = Platform.OS === 'ios' ? '' : 'file://';
    const cacheDir = `${RNFS.DocumentDirectoryPath}/Cache`;
    let outputPath = '';
    let b64PreExt = '';
    if (type === 'video') {
      outputPath = `${FILE}${cacheDir}/video.mp4`;
      b64PreExt = 'video/mp4';
    } else {
      outputPath = `${FILE}${cacheDir}/image.jpg`;
      b64PreExt = 'image/jpeg';
    }
    // Downloading File
    RNFS.exists(cacheDir)
      .then(response => {
         if (response !== true) {
          // Directory not exists
          RNFS.mkdir(cacheDir);
          console.log('homePageSharePost Directory Created', cacheDir);
         }
         RNFS.downloadFile({
           fromUrl: url,
           toFile: outputPath,
           progressDivider: 3,
           progress: ({ contentLength, bytesWritten }) => dispatch({ type: SHARE_PAGE_UPDATE_DOWNLOAD_PROGRESS, payload: (bytesWritten / contentLength).toFixed(2) })
         })
         .promise.then(() => {
           RNFS.readFile(outputPath, 'base64')
           .then((d) => {
             // Creating Dynamic Link
             const dynamicLinkOptions = {
               link: `${PLAY_STORE_LINK}&referrerId=${referrerId}&postId=${postData.postId}&type=postShare`,
               domainUriPrefix: FIREBASE_DOMAIN_URI_PREFIX,
               android: { packageName: 'com.patang' },
               analytics: { campaign: 'postShare', source: referrerId, content: postData.postId },
               social: {
                title: 'Patang App: Indian Video Shopping & Sharing App',
                descriptionText: `Check out ${postData.userName}'s Post \u000A${postData.caption.trim()}`,
                imageUrl: thumbnailUrl
               }
             };
             dynamicLinks().buildShortLink(dynamicLinkOptions)
             .then((link) => {
                 const content = `data:${b64PreExt};base64,${d}`;
                 const message = `Patang App\u000A \u000ACheck out ${postData.userName}'s Post \u000A${postData.caption.trim()} \u000A \u000AWatch Now:\u000A${link} \u000A \u000APatang App: Indian Video Shopping & Sharing App ❤`;
                 const options = { message, url: content, title: 'Share Now' };
                 Share.open(options)
                  .then((res) => { console.log('homePageSharePost Post Shared', res); })
                  .catch((err) => { console.log('homePageSharePost Post Sharing Error', err); });
             })
             .catch((ed) => {
               console.log('homePageSharePost Error in Creating dynamic link', ed);
             });
           })
           .finally(() => {
             dispatch({ type: SHARE_PAGE_TOGGLE_SHARE_MODAL, payload: false });
           });
           // return { path: outputPath }; // Downloaded Successfully
         })
         .catch((error) => {
           console.log('Error while Downloading Share Image', url, error);
         });
       });
  };
};
