import axios from 'axios';

import {
  USER_FOLLOWED_HIM,
  USER_UNFOLLOWED_HIM
} from '../types';

import {
  CelebrityPageFollowURL,
  CelebrityPageUnfollowURL
} from '../URLS';


// Method to Follow a Celebrity
export const celebrityPageFollow = ({ userToken, userId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_FOLLOWED_HIM, payload: userId });
    axios({
        method: 'post',
        url: CelebrityPageFollowURL,
        headers,
        data: { userId }
        })
        .then((response) => {
            console.log('celebrityPageFollow', response);
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageFollow Actions Error ', error);
      });
  };
};


// Method to Unfollow a Celebrity
export const celebrityPageUnfollow = ({ userToken, userId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_UNFOLLOWED_HIM, payload: userId });
    axios({
        method: 'post',
        url: CelebrityPageUnfollowURL,
        headers,
        data: { userId }
        })
        .then((response) => {
            console.log('celebrityPageUnfollow', response);
        })
        .catch((error) => {
            //handle error
            console.log('celebrityPageUnfollow Actions Error ', error);
      });
  };
};
