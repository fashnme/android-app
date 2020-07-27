import axios from 'axios';

import {
  COMMENTS_PAGE_TOGGLE_COMMENTS_MODAL,
  COMMENTS_PAGE_ADD_MORE_COMMENTS,
  USER_LIKED_COMMENT,
  USER_UNLIKED_COMMENT,
  COMMENTS_PAGE_ADD_USER_COMMENT,
  COMMENTS_PAGE_DELETE_USER_COMMENT
} from '../types';

import {
  CommentsPageLikeCommentURL,
  CommentsPageUnlikeCommentURL,
  CommentsPageFetchMoreCommentsURL,
  CommentsPageDeleteCommentURL,
  CommentsPageWriteCommentURL
} from '../URLS';

// Method to Toggle Comments Modal And Set First Set of comments present with post
export const commentsPageOpenCommentsModal = ({ isVisible, userToken, commentsData, totalComments, postId }) => {
  // return {
  //   type: COMMENTS_PAGE_TOGGLE_COMMENTS_MODAL,
  //   payload: { isVisible, commentsData, totalComments, postId }
  // };
  const headers = {
    'Content-Type': 'application/json',
     Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: COMMENTS_PAGE_TOGGLE_COMMENTS_MODAL, payload: { isVisible, commentsData, totalComments, postId } });
    if (isVisible) {
      axios({
          method: 'get',
          url: CommentsPageFetchMoreCommentsURL,
          headers,
          params: { offset: 0, size: 20, postId }
          })
          .then((response) => {
              // console.log('commentsPageOpenCommentsModal resp', response.data);
              const { comments } = response.data;
              dispatch({ type: COMMENTS_PAGE_ADD_MORE_COMMENTS, payload: comments });
          })
          .catch((error) => {
              console.log('commentsPageOpenCommentsModal Actions Error ', error);
        });
    }
  };
};


// Method to Fetch more Comments on Scrolling
export const commentsPageFetchMoreComments = ({ commentsPageNum, postId, userToken }) => {
  const size = 20;
  const offset = (commentsPageNum * size) + size;
  const headers = {
    'Content-Type': 'application/json',
     Authorization: userToken
  };
  return (dispatch) => {
    axios({
        method: 'get',
        url: CommentsPageFetchMoreCommentsURL,
        headers,
        params: { offset, size, postId }
        })
        .then((response) => {
            console.log('commentsPageFetchMoreComments resp', response.data);
            const { comments } = response.data;
            dispatch({ type: COMMENTS_PAGE_ADD_MORE_COMMENTS, payload: comments });
        })
        .catch((error) => {
            console.log('commentsPageFetchMoreComments Actions Error ', error);
      });
  };
};


// User Liked Comment
export const commentsPageLikeComment = ({ commentId, userId, commenterId, userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_LIKED_COMMENT, payload: commentId });
    axios({
        method: 'post',
        url: CommentsPageLikeCommentURL,
        headers,
        data: { commentId, userId, commenterId }
        })
        .then((response) => {
            console.log('commentsPageLikeComment', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('commentsPageLikeComment Actions Error ', error);
      });
  };
};


// User Unliked Comment
export const commentsPageUnlikeComment = ({ commentId, userId, commenterId, userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: USER_UNLIKED_COMMENT, payload: commentId });
    axios({
        method: 'post',
        url: CommentsPageUnlikeCommentURL,
        headers,
        data: { commentId, userId, commenterId }
        })
        .then((response) => {
            console.log('commentsPageUnlikeComment', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('commentsPageUnlikeComment Actions Error ', error);
      });
  };
};


// User Delete Comment
export const commentsPageDeleteComment = ({ commentId, postId, userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  console.log('commentsPageDeleteComment', commentId, postId);
  return (dispatch) => {
    dispatch({ type: COMMENTS_PAGE_DELETE_USER_COMMENT, payload: { commentId } });
    axios({
        method: 'post',
        url: CommentsPageDeleteCommentURL,
        headers,
        data: { commentId, postId }
        })
        .then((response) => {
            console.log('commentsPageDeleteComment', response.data);
        })
        .catch((error) => {
            //handle error
            console.log('commentsPageDeleteComment Actions Error ', error);
      });
  };
};


// User Write Comment
export const commentsPageWriteComment = ({ postId, userId, commentText, userToken }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  // console.log('url, ', commentText);
  return (dispatch) => {
    axios({
        method: 'post',
        url: CommentsPageWriteCommentURL,
        headers,
        data: { postId, userId, commentText }
        })
        .then((response) => {
            console.log('commentsPageWriteComment', response.data);
            const { comment } = response.data;
            dispatch({ type: COMMENTS_PAGE_ADD_USER_COMMENT, payload: { comment } });
        })
        .catch((error) => {
            console.log('commentsPageWriteComment Actions Error ', error);
      });
  };
};
