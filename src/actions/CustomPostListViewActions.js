import { Actions } from 'react-native-router-flux';

import {
  CUSTOM_POST_LIST_VIEW_PAGE_SET_DATA
} from '../types';

// Method to Get the Extra Personal Feed Data
export const customPostListViewPageVisitAndSetData = ({ customFeedData, postIndex }) => {
  Actions.customPostListView();
  console.log('customPostListViewPageVisitAndSetData', postIndex);
  return {
    type: CUSTOM_POST_LIST_VIEW_PAGE_SET_DATA,
    payload: { customFeedData, postIndex }
  };
};
