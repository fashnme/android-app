import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Keyboard } from 'react-native';
import { Icon, ListItem, Input, Overlay, Card, Button } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import {
  commentsPageOpenCommentsModal as _commentsPageOpenCommentsModal,
  commentsPageWriteComment as _commentsPageWriteComment,
  videoPagePlayStatusUpdate as _videoPagePlayStatusUpdate
} from '../../actions';
// import { dummyComments as data } from './dummyComments';
import CommentsRightComp from './CommentsRightComp';

const timeDifference = (timestamp) => {
	const previous = new Date(timestamp).getTime();
	const current = new Date().getTime();
	const msPerMinute = 60 * 1000;
	const msPerHour = msPerMinute * 60;
	const msPerDay = msPerHour * 24;
	const msPerMonth = msPerDay * 30;
	const msPerYear = msPerDay * 365;
	const elapsed = current - previous;
	if (elapsed < msPerMinute) return `${Math.round(elapsed / 1000) + 5}s`;
	else if (elapsed < msPerHour) return `${Math.round(elapsed / msPerMinute)}min`;
	else if (elapsed < msPerDay) return `${Math.round(elapsed / msPerHour)}h`;
	else if (elapsed < msPerMonth) return `${Math.round(elapsed / msPerDay)}d`;
	else if (elapsed < msPerYear) return `${Math.round(elapsed / msPerMonth)}m`;
  return `${Math.round(elapsed / msPerYear)}y`;
};

const renderListItem = ({ item }) => {
  const { commentId, profilePic, userName, commentText, timeStamp, totalLikes, userId } = item;
  return (
      <ListItem
        // onPress={() => console.log(item.commentId, ' this comment is pressed')}
        leftAvatar={{ source: { uri: profilePic } }}
        title={userName}
        titleStyle={styles.commentUserName}
        subtitle={
          <View>
            <Text style={styles.commentContent}>
              {commentText}
            </Text>
            <Text style={styles.commentDate}>{timeDifference(timeStamp)}</Text>
          </View>
        }
        rightIcon={
          <CommentsRightComp
            commentId={commentId}
            totalLikes={totalLikes}
            commenterId={userId}
          />
        }
        bottomDivider
      />
  );
};

const renderSendButton = ({ newComment, postId, userId, userToken, setNewComment, commentsPageWriteComment }) => {
  return (
    <Button
      title={'Post'}
      type="clear"
      disabled={newComment.length === 0}
      color={'#2089dc'}
      onPress={() => {
        commentsPageWriteComment({ postId, userId, commentText: newComment, userToken });
        Keyboard.dismiss();
        showMessage({ message: 'Comment Posted!', type: 'success', floating: true, icon: 'success', duration: 1000 });
        setNewComment('');
      }}
    />
  );
};

const CommentsModal = ({ commentsArray, commentsModalVisible, totalComments, postId, userToken, personalUserId, previousState,
  commentsPageOpenCommentsModal, commentsPageWriteComment, videoPagePlayStatusUpdate }) => {
  // console.log('CommentsModal Up', commentsArray, commentsModalVisible);
  const [newComment, setNewComment] = useState('');
  const { homePageVideoPlay, celebPageVideoPlay } = previousState;
    return (
        <Overlay
          isVisible={commentsModalVisible}
          overlayStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 2, bottom: 0, position: 'absolute' }}
          width={'100%'}
          height={'80%'}
          windowBackgroundColor={'transparent'}
          animationType={'slide'}
        >
          <View style={styles.modalStyle}>
            <View style={styles.commentsModalHeader}>
              <Text style={styles.commentsModalHeaderTitle}>{totalComments} Comments</Text>
              { /* <Text style={styles.commentsModalHeaderTitle}>{data.totalComments} Comments</Text> */ }
                <View style={styles.commentsModalHeaderExitButton}>
                  <Icon
                    name='cross'
                    type='entypo'
                    size={18}
                    raised
                    containerStyle={styles.crossStyle}
                    onPress={() => {
                      commentsPageOpenCommentsModal({ isVisible: false, userToken, commentsData: [], totalComments: 0 });
                      videoPagePlayStatusUpdate({ homePageVideoPlay, celebPageVideoPlay });
                      setNewComment('');
                    }}
                  />
                </View>
            </View>
            <View style={styles.body}>
                <FlatList
                    // data={data.comments} // commentsArray
                    data={commentsArray}
                    scrollEnabled
                    keyExtractor={(item) => item.commentId}
                    renderItem={renderListItem}
                />
              </View>

            <Card containerStyle={{ margin: 0, padding: 0, borderRadius: 10, maxHeight: 200 }}>
              <Input
                placeholder='Say Something...'
                value={newComment}
                onChangeText={(txt) => setNewComment(txt)}
                inputStyle={styles.commentInputStyle}
                maxLength={280}
                multiline
                rightIcon={renderSendButton({ newComment: newComment.trim(), postId, userId: personalUserId, userToken, setNewComment, commentsPageWriteComment })}
              />
            </Card>
          </View>
        </Overlay>
        // </Modal>
    );
};

const styles = StyleSheet.create({
    modalStyle: {
        height: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        margin: 0,
      },
      commentsModalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 10
      },
      commentsModalHeaderTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        opacity: 0.6,
      },
      commentsModalHeaderExitButton: {
        position: 'absolute',
        right: 2,
        top: 0,
        opacity: 0.8,
      },
      body: {
        flex: 1,
      },
      commentUserName: {
        fontSize: 14,
        opacity: 0.8,
        fontWeight: 'bold',
        color: 'grey'
      },
      commentDate: {
        opacity: 0.5,
        fontSize: 11,
        fontWeight: 'bold'
      },
      commentInputStyle: {
        fontSize: 17,
        textAlignVertical: 'top',
        maxHeight: 200
      },
      crossStyle: {
        marginRight: 0,
        marginTop: 0,
        padding: 0
      },
      commentContent: {
        color: 'black',
        fontWeight: 'bold'
      }
});

const mapStateToProps = ({ postCommentState, personalPageState, videoPlayStatusState }) => {
    const { commentsModalVisible, commentsArray, totalComments, postId } = postCommentState;
    const { userToken, personalUserId } = personalPageState;
    const { previousState } = videoPlayStatusState;
    return { commentsModalVisible, commentsArray, totalComments, userToken, personalUserId, postId, previousState };
};

export default connect(mapStateToProps, {
  commentsPageOpenCommentsModal: _commentsPageOpenCommentsModal,
  commentsPageWriteComment: _commentsPageWriteComment,
  videoPagePlayStatusUpdate: _videoPagePlayStatusUpdate
})(CommentsModal);
