import {
  HOME_PAGE_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_FEED_EXTRA_DATA_UPDATE,
  HOME_PAGE_ACTIVE_TAB_UPDATE
} from '../types';


const INITIAL_STATE = {
  feedData: [], // Stores the Feed as a Array
  feedPageNum: 1, // Stores the Current Page for Feed
  activeTab: 1, // Active Tab, 1: Public , 2: Following
  userToken: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case HOME_PAGE_FEED_INITIAL_DATA_UPDATE:
          return { ...state, feedData: action.payload, feedPageNum: 2 };

      case HOME_PAGE_FEED_EXTRA_DATA_UPDATE: {
          const newFeedData = [...state.feedData, ...action.payload];
          const newPage = state.feedPageNum + 1;
          return { ...state, feedData: newFeedData, feedPageNum: newPage };
      }

      case HOME_PAGE_ACTIVE_TAB_UPDATE:
          return { ...state, activeTab: action.payload };

      default:
          return state;
    }
};
