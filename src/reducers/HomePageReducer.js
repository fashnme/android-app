import {
  HOME_PAGE_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_FEED_EXTRA_DATA_UPDATE,
  HOME_PAGE_ACTIVE_TAB_UPDATE,
  HOME_PAGE_PUBLIC_FEED_INITIAL_DATA_UPDATE,
  HOME_PAGE_PUBLIC_FEED_EXTRA_DATA_UPDATE,
  HOME_PAGE_SET_PUBLIC_VERTICAL_CAROUSEL_REF,
  HOME_PAGE_SET_PERSONAL_VERTICAL_CAROUSEL_REF,
  HOME_PAGE_PUBLIC_MODE,
  HOME_PAGE_TOGGLE_COMMENTS_MODAL,
  HOME_PAGE_TOGGLE_SHARE_MODAL,
  HOME_PAGE_TOGGLE_PRODUCTS_MODAL
} from '../types';

const INITIAL_STATE = {
  feedData: [
    { caption: 'I am great at caption',
        uploadUrl: 'https://i.pinimg.com/236x/d1/0c/fd/d10cfd6e4fbcbebe1658ea42f7de8d2d.jpg',
        userId: 'yami007',
        mediaType: 'image',
        timestamp: 'Mon Feb 10 2020 16:09:55 GMT+0530',
        totalLikes: 10,
        totalComments: 20,
        taggedProducts: [],
        userName: 'pawan',
        userPic: 'https://i.pinimg.com/236x/d1/0c/fd/d10cfd6e4fbcbebe1658ea42f7de8d2d.jpg',
        postId: 'dafasfas'
    }
  ], // Stores the Feed as a Array
  feedPageNum: 1, // Stores the Current Page for Feed
  activeTab: null, // Active Tab, 1: Public , 2: Following, Initially null to show the spinner
  userToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiUERvNWdtOEJNZ0tZWjFQNFlobFoiLCJpYXQiOjE1Nzg0ODgzODF9.f_0FHHWMZ1Javvvmtl72yO5m_1pICYjggYZA0-ccFQM',
  publicFeedData: [
    { caption: 'I am great at caption',
        uploadUrl: 'https://i.pinimg.com/236x/d1/0c/fd/d10cfd6e4fbcbebe1658ea42f7de8d2d.jpg',
        userId: 'yami007',
        mediaType: 'image',
        timestamp: 'Mon Feb 10 2020 16:09:55 GMT+0530',
        totalLikes: 10,
        totalComments: 20,
        taggedProducts: [],
        userName: 'pawan',
        userPic: 'https://i.pinimg.com/236x/d1/0c/fd/d10cfd6e4fbcbebe1658ea42f7de8d2d.jpg',
        postId: 'dafasfas'
    }
  ],
  publicFeedPageNum: 1,
  commentModalVisible: false,
  shareModalVisible: false,
  productsModalVisible: false,
  verticalPublicCarouselRef: null,
  verticalPersonalCarouselRef: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case HOME_PAGE_FEED_INITIAL_DATA_UPDATE:
          return { ...state, feedData: action.payload, feedPageNum: 2, activeTab: HOME_PAGE_PUBLIC_MODE, verticalCarouselRef: null };

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

      case HOME_PAGE_TOGGLE_COMMENTS_MODAL:
          return { ...state, commentModalVisible: action.payload, shareModalVisible: false, productsModalVisible: false };

      case HOME_PAGE_TOGGLE_SHARE_MODAL:
          return { ...state, shareModalVisible: action.payload, commentModalVisible: false, productsModalVisible: false };

      case HOME_PAGE_TOGGLE_PRODUCTS_MODAL:
          return { ...state, productsModalVisible: action.payload, commentModalVisible: false, shareModalVisible: false };
      default:
          return state;
    }
};
