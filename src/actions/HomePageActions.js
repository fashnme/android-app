import axios from 'axios';
import Share from 'react-native-share';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
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
  HOME_PAGE_TOGGLE_COMMENTS_MODAL,
  HOME_PAGE_TOGGLE_SHARE_MODAL,
  HOME_PAGE_SET_TOGGLE_PRODUCTS_DATA
} from '../types';

import {
  HomePageGetInitialFeedDataURL,
  HomePageGetInitialPublicFeedDataURL,
  HomePageLikePostURL,
  HomePageUnlikePostURL,
  HomePageDislikePostURL
} from '../URLS';


// Method to Get the Initial Personal Feed Data
export const homePageGetInitialFeedData = ({ userToken }) => {
  return (dispatch) => {
    axios.get(HomePageGetInitialFeedDataURL, { headers: { Authorization: userToken } })
    .then(response => {
      console.log('Actions Feed Data', response.data.posts);
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

// Method to Toggle Comments Modal on HomePage
export const homePageToggleCommentsModal = (isVisible) => {
  return {
    type: HOME_PAGE_TOGGLE_COMMENTS_MODAL,
    payload: isVisible
  };
};

// Method to Toggle Share Modal on HomePage
export const homePageToggleShareModal = (isVisible) => {
  return {
    type: HOME_PAGE_TOGGLE_SHARE_MODAL,
    payload: isVisible
  };
};

// Method to Toggle Products Modal on HomePage
export const homePageOpenProductsModal = ({ isVisible, productsData }) => {
  return (dispatch) => {
    dispatch({ type: HOME_PAGE_TOGGLE_COMMENTS_MODAL, payload: false });
    dispatch({ type: HOME_PAGE_SET_TOGGLE_PRODUCTS_DATA, payload: { isVisible, productsData } });
  };
};

export const homePageSharePost = ({ postData }) => {
  return (dispatch) => {
    const url = postData.uploadUrl;
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
    RNFS.exists(cacheDir)
      .then(response => {
         if (response !== true) {
          // Directory not exists
          RNFS.mkdir(cacheDir);
          console.log('homePageSharePost Directory Created', cacheDir);
         }
         RNFS.downloadFile({
           fromUrl: url,
           toFile: outputPath
         })
         .promise.then(() => {
           RNFS.readFile(outputPath, 'base64')
           .then((d) => {
             const content = `data:${b64PreExt};base64,${d}`;
             const message = `Check out ${postData.userName}'s Post \u000A ${postData.caption.trim()} \u000A Download the App`;
             const options = { message, url: content, title: 'Share Now' };
             Share.open(options)
              .then((res) => { console.log('homePageSharePost Post Shared', res); })
              .catch((err) => { console.log('homePageSharePost Post Sharing Error', err); });
           });

           return { path: outputPath }; // Downloaded Successfully
         })
         .catch((error) => {
           console.log('Error while Downloading Share Image', url, error);
         });
       });
    dispatch({ type: 'homePageSharePost' });
  };
};
