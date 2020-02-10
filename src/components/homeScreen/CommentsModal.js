import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Icon, ListItem, Input } from 'react-native-elements';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { homePageToggleCommentsModal as _homePageToggleCommentsModal } from '../../actions';

const renderListItem = ({ item }) => {
  return (
    <TouchableWithoutFeedback>
      <ListItem
        onPress={() => console.log(item.comment_id, ' this comment is pressed')}
        leftAvatar={{ source: { uri: item.imageUri } }}
        title={<Text style={styles.commentUserName}>iAmTushar</Text>}
        subtitle={
          <View>
            <Text style={styles.commentContent} numberOfLines={3}>
              {item.commentContent}
            </Text>
            <Text style={styles.commentDate}>{item.commentDate}</Text>
          </View>
        }
        rightIcon={<View><Icon onPress={() => console.log(item.comment_id, ' this comment is liked by user')} name="heart" type="font-awesome" color={item.isLiked ? 'red' : 'grey'} size={20} /><Text style={styles.likeCountOfComment}>{item.commentLikeCount}</Text></View>}
        bottomDivider
      />
    </TouchableWithoutFeedback>
  );
};

const CommentsModal = ({ comments, commentModalVisible, homePageToggleCommentsModal }) => {
  console.log('CommentsModal', comments, commentModalVisible);
  const data = {
    comments: [{
    comment_id: '52342',
    imageUri: 'https://pbs.twimg.com/media/EGsDw7nUYAUkiEn.jpg',
    commentContent: "Want to make your timeline sorted? If yes, then download WorDo. A Complete Solution. Don't think, Just WorDo it!",
    commentUserName: 'iAmTushar',
    commentDate: '2020-01-04',
    commentLikeCount: '32K',
    isLiked: true
  }, {
    comment_id: '524342',
    imageUri: 'https://pbs.twimg.com/media/EGsDw7nUYAUkiEn.jpg',
    commentContent: "Want to make your timeline sorted? If yes, then download WorDo. A Complete Solution. Don't think, Just WorDo it!",
    commentUserName: 'iAmTushar',
    commentDate: '2020-01-04',
    commentLikeCount: '32K',
    isLiked: false
  }, {
    comment_id: '522342',
    imageUri: 'https://pbs.twimg.com/media/EGsDw7nUYAUkiEn.jpg',
    commentContent: "Want to make your timeline sorted? If yes, then download WorDo. A Complete Solution. Don't think, Just WorDo it!",
    commentUserName: 'iAmTushar',
    commentDate: '2020-01-04',
    commentLikeCount: '32K',
    isLiked: true
  }, {
    comment_id: '523425',
    imageUri: 'https://pbs.twimg.com/media/EGsDw7nUYAUkiEn.jpg',
    commentContent: "Want to make 2your timeline sorted? If yes, then download WorDo. A Complete Solution. Don't think, Just WorDo it!",
    commentUserName: 'iAmTushar',
    commentDate: '2020-01-04',
    commentLikeCount: '32K',
    isLiked: false
  }, {
    comment_id: '572342',
    imageUri: 'https://pbs.twimg.com/media/EGsDw7nUYAUkiEn.jpg',
    commentContent: "Want to mfake your timeline sorted? If yes, then download WorDo. A Complete Solution. Don't think, Just WorDo it!",
    commentUserName: 'iAmTushar',
    commentDate: '2020-01-04',
    commentLikeCount: '32K',
    isLiked: false
  }, {
    comment_id: '57234s2',
    imageUri: 'https://pbs.twimg.com/media/EGsDw7nUYAUkiEn.jpg',
    commentContent: "Wandt to make your timeline sorted? If yes, then download WorDo. A Complete Solution. Don't think, Just WorDo it!",
    commentUserName: 'iAmTushar',
    commentDate: '2020-01-04',
    commentLikeCount: '32K',
    isLiked: true
  }],
  totalComments: 6,
};
    return (
        <Modal
          swipeDirection={['down']}
          scroll
          isVisible={commentModalVisible}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
          }}
          backdropOpacity={0}
        >
          <View style={styles.modalStyle}>
            <View style={styles.commentsModalHeader}>
              <Text style={styles.commentsModalHeaderTitle}>{data.totalComments} comments</Text>
                <View style={styles.commentsModalHeaderExitButton}>
                  <Icon name='cross' type='entypo' onPress={() => homePageToggleCommentsModal(false)} />
                </View>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={data.comments}
                    scrollEnabled
                    keyExtractor={(item) => item.comment_id}
                    renderItem={renderListItem}
                />
              </View>

            <View>
              <Input
                placeholder='Say Something...'
                style={styles.title}
                rightIcon={<Icon name="at" type="font-awesome" onPress={() => console.log('@ button pressed')} />}
              />
            </View>
          </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalStyle: {
        height: '70%',
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        margin: 0,
      },
      commentsModalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
      },
      commentsModalHeaderTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        opacity: 0.6,
      },
      commentsModalHeaderExitButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        opacity: 0.6,
      },
      body: {
        flex: 1,
      },
      commentUserName: {
        fontSize: 12,
        opacity: 0.6,
      },
      commentDate: {
        opacity: 0.6,
        fontSize: 12,
      },
      likeCountOfComment: {
        fontSize: 12,
        opacity: 0.6,
        textAlign: 'center',
      },
      title: {
        fontSize: 10,
      }
});

const mapStateToProps = ({ homePageState }) => {
    const { commentModalVisible } = homePageState;
    return { commentModalVisible };
};

export default connect(mapStateToProps, {
  homePageToggleCommentsModal: _homePageToggleCommentsModal
})(CommentsModal);
