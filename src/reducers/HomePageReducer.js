import {
  HOME_PAGE_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_FEED_EXTRA_DATA_UPDATE,
  HOME_PAGE_ACTIVE_TAB_UPDATE,
  HOME_PAGE_PUBLIC_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_PUBLIC_FEED_EXTRA_DATA_UPDATE,
  HOME_PAGE_SET_PUBLIC_VERTICAL_CAROUSEL_REF,
  HOME_PAGE_SET_PERSONAL_VERTICAL_CAROUSEL_REF,
  HOME_PAGE_PERSONAL_MODE
} from '../types';

const INITIAL_STATE = {
  feedData: [], // Stores the Feed as a Array
  feedPageNum: 1, // Stores the Current Page for Feed
  activeTab: null, // Active Tab, 1: Public , 2: Following, Initially null to show the spinner
  publicFeedData: [],
  publicFeedPageNum: 1,
  verticalPublicCarouselRef: null,
  verticalPersonalCarouselRef: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case HOME_PAGE_FEED_INITIAL_DATA_UPDATE:
          return { ...state, feedData: action.payload, feedPageNum: 2, activeTab: HOME_PAGE_PERSONAL_MODE, verticalCarouselRef: null };

      case HOME_PAGE_FEED_EXTRA_DATA_UPDATE: {
          const newFeedData = [...state.feedData, ...action.payload];
          const newPage = state.feedPageNum + 1;
          return { ...state, feedData: newFeedData, feedPageNum: newPage };
      }

      case HOME_PAGE_PUBLIC_FEED_INITIAL_DATA_UPDATE:
          return { ...state, publicFeedData: action.payload, publicFeedPageNum: 2 };

      case HOME_PAGE_PUBLIC_FEED_EXTRA_DATA_UPDATE: {
          const newFeedData = [...state.publicFeedData, ...action.payload];
          const newPage = state.publicFeedPageNum + 1;
          return { ...state, publicFeedData: newFeedData, publicFeedPageNum: newPage };
      }

      case HOME_PAGE_SET_PUBLIC_VERTICAL_CAROUSEL_REF: {
          if (state.verticalPublicCarouselRef === null) {
            return { ...state, verticalPublicCarouselRef: action.payload };
          }
          return state;
      }

      case HOME_PAGE_SET_PERSONAL_VERTICAL_CAROUSEL_REF: {
        if (state.verticalPersonalCarouselRef === null) {
          return { ...state, verticalPersonalCarouselRef: action.payload };
        }
        return state;
      }

      case HOME_PAGE_ACTIVE_TAB_UPDATE:
          return { ...state, activeTab: action.payload };

      default:
          return state;
    }
};
