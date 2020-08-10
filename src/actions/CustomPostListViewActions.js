import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  CUSTOM_POST_LIST_VIEW_PAGE_SET_DATA
} from '../types';

import {
  HomePageGetPostDetailsURL
} from '../URLS';

// Method to Get the Extra Personal Feed Data
export const customPostListViewPageVisitAndSetData = ({ customFeedData, postIndex }) => {
  Actions.customPostListView();
  // console.log('customPostListViewPageVisitAndSetData', postIndex);
  return {
    type: CUSTOM_POST_LIST_VIEW_PAGE_SET_DATA,
    payload: { customFeedData, postIndex }
  };
};

// To View a single Post in the CustomPostListView page
export const customSinglePostViewPageVisitAndSetData = ({ postId }) => {
  Actions.customPostListView();
  return (dispatch) => {
    axios({
        method: 'get',
        url: HomePageGetPostDetailsURL,
        headers: { 'Content-Type': 'application/json' },
        params: { postId }
        })
        .then((response) => {
            // console.log('customSinglePostViewPageVisitAndSetData resp', response.data);
            const { post } = response.data;
            dispatch({ type: CUSTOM_POST_LIST_VIEW_PAGE_SET_DATA, payload: { customFeedData: [post], postIndex: 0 } });
        })
        .catch((error) => {
            console.log('customSinglePostViewPageVisitAndSetData Actions Error ', error);
        });
  };
};
