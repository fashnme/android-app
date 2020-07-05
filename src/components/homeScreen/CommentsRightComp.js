import React from 'react';
import { View, Text, } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import {
  commentsPageLikeComment as _commentsPageLikeComment,
  commentsPageUnlikeComment as _commentsPageUnlikeComment,
  commentsPageDeleteComment as _commentsPageDeleteComment
} from '../../actions';

const convertIntToString = (num) => {
  const precision = 0;
  const abbrev = ['', 'K', 'M', 'B'];
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(num)) / 3);
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
  const suffix = abbrev[order];
  return (num / Math.pow(10, order * 3)).toFixed(precision) + suffix;
};

const CommentsRightComp = ({ commentId, totalLikes, commenterId, likedComments, userToken, postId, personalUserId,
      commentsPageLikeComment, commentsPageUnlikeComment, commentsPageDeleteComment }) => {
  if (personalUserId === commenterId) {
    return (
      <View>
        <Icon
          onPress={() => {
            commentsPageDeleteComment({ commentId, userToken, postId });
            showMessage({ message: 'Comment Deleted!', type: 'danger', floating: true, icon: 'danger' });
          }}
          name="delete" type="antdesign"
          color={'red'}
          size={20}
        />
      </View>
    );
  }

  if (commentId in likedComments) {
    return (
      <View>
        <Icon
          onPress={() => commentsPageUnlikeComment({ commentId, userId: personalUserId, commenterId, userToken })}
          name="heart" type="font-awesome"
          color={'red'}
          size={20}
        />
        <Text style={styles.likeCountOfComment}>{convertIntToString(totalLikes + 1)} </Text>
      </View>
    );
  }
  return (
    <View>
      <Icon
        onPress={() => commentsPageLikeComment({ commentId, userId: personalUserId, commenterId, userToken })}
        name="heart" type="font-awesome"
        color={'grey'}
        size={20}
      />
      <Text style={styles.likeCountOfComment}>{convertIntToString(totalLikes)} </Text>
    </View>
  );
};

const styles = {
  likeCountOfComment: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
};

const mapStateToProps = ({ userActionData, personalPageState, postCommentState }) => {
    const { likedComments } = userActionData;
    const { postId } = postCommentState;
    const { userToken, personalUserId } = personalPageState;
    return { likedComments, userToken, personalUserId, postId };
};
export default connect(mapStateToProps, {
  commentsPageLikeComment: _commentsPageLikeComment,
  commentsPageUnlikeComment: _commentsPageUnlikeComment,
  commentsPageDeleteComment: _commentsPageDeleteComment
})(CommentsRightComp);
