import {
  COMMENTS_PAGE_TOGGLE_COMMENTS_MODAL,
  COMMENTS_PAGE_ADD_MORE_COMMENTS,
  COMMENTS_PAGE_ADD_USER_COMMENT,
  COMMENTS_PAGE_DELETE_USER_COMMENT
} from '../types';

const INITIAL_STATE = {
  commentsModalVisible: false,
  commentsArray: [],
  totalComments: 0,
  postId: '', // id of the post
  posterId: '', // Owner of the post
  commentsPageNum: 1 // To fetch more comments using pagination
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case COMMENTS_PAGE_TOGGLE_COMMENTS_MODAL: {
        const { isVisible, commentsData, totalComments, postId, posterId } = action.payload;
        return { ...state, commentsModalVisible: isVisible, commentsArray: commentsData, commentsPageNum: 1, totalComments, postId, posterId };
      }

      case COMMENTS_PAGE_ADD_MORE_COMMENTS: {
        if (state.commentsPageNum === 1) {
          return { ...state, commentsArray: action.payload, commentsPageNum: state.commentsPageNum + 1 };
        }
        return { ...state, commentsArray: [...state.commentsArray, ...action.payload], commentsPageNum: state.commentsPageNum + 1 };
      }

      case COMMENTS_PAGE_ADD_USER_COMMENT: {
        const { comment } = action.payload;
        const { commentsArray } = state;
        commentsArray.splice(0, 0, comment);
        const newCommentsArray = [...commentsArray];
        return { ...state, commentsArray: newCommentsArray, totalComments: state.totalComments + 1 };
      }

      case COMMENTS_PAGE_DELETE_USER_COMMENT: {
        const { commentId } = action.payload;
        let delIndex = null;
        const { commentsArray } = state;
        commentsArray.forEach((obj, index) => { if (obj.commentId === commentId) { delIndex = index; } });
        if (delIndex !== null) {
          commentsArray.splice(delIndex, 1);
          const newCommentsArray = [...commentsArray];
          return { ...state, commentsArray: newCommentsArray, totalComments: state.totalComments - 1 };
        }
        return { ...state };
      }

      default:
          return state;
    }
};
