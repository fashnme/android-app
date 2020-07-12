import {
  CUSTOM_POST_LIST_VIEW_PAGE_SET_DATA
} from '../types';


const INITIAL_STATE = {
  customFeedData: [],
  postIndex: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CUSTOM_POST_LIST_VIEW_PAGE_SET_DATA: {
        const { customFeedData, postIndex } = action.payload;
        return { ...state, customFeedData, postIndex };
      }

      default:
          return state;
    }
};
