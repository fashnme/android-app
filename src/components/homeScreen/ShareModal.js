import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import ShareList from './ShareList';
import ReactionList from './ReactionList';

const ShareModalView = ({ isVisible, onExit }) => {
    const shareDetails = [
        {
            id: 1,
            icon: 'facebook',
            title: 'Facebook Post'
        },
        {
            id: 2,
            icon: 'instagram',
            title: 'Instagram'
        },
        {
            id: 3,
            icon: 'twitter',
            title: 'Twitter Post'
        },
        {
            id: 4,
            icon: 'youtube',
            title: 'Youtube'
        },
    ];
    const reactionDetails = [
        {
            id: 1,
            icon: 'heart-broken',
            iconType: 'material-community',
            title: 'Not interested'
        },
        {
            id: 2,
            icon: 'report-problem',
            iconType: 'material-icons',
            title: 'Report'
        },
        {
            id: 3,
            icon: 'download',
            iconType: 'antdesign',
            title: 'Save video'
        },
    ];

    return (
        <Modal
          onSwipeComplete={() => onExit(false)}
          swipeDirection={['down']}
          scroll
          isVisible={isVisible}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
          }}
          backdropOpacity={0}
        >
          <View style={styles.modalStyle}>
            <View style={styles.commentsModalHeader}>
              <Text style={styles.commentsModalHeaderTitle}>Share to</Text>
            </View>
            <View style={styles.body}>
                <ShareList socialOptions={shareDetails} />
                <ReactionList reactionOptions={reactionDetails} />
            </View>

            <View style={styles.editBox}>
                <Text style={styles.exitCaption} onPress={() => onExit(false)}> Cancel </Text>
            </View>
          </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalStyle: {
        height: '40%',
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
      editBox: {
        alignItems: 'center',
        padding: 15,
      },
      title: {
        fontSize: 10,
      }
});

export default ShareModalView;
