import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import ShareList from './ShareList';
import ReactionList from './ReactionList';
import { homePageToggleShareModal as _homePageToggleShareModal } from '../../actions';


const ShareModal = ({ shareModalVisible, homePageToggleShareModal, postData }) => {
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
          onSwipeComplete={() => homePageToggleShareModal(false)}
          swipeDirection={['down']}
          scroll
          isVisible={shareModalVisible}
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
            <View style={{ flex: 1 }}>
                <ShareList postData={postData} />
            </View>
            <View>
                <ReactionList reactionOptions={reactionDetails} />
            </View>

            <View style={styles.editBox}>
                <Button title={'Cancel'} type="outline" onPress={() => homePageToggleShareModal(false)} />
            </View>
          </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalStyle: {
        height: '60%',
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
      editBox: {
        alignItems: 'center',
        padding: 15,
        marginBottom: 5
      },
      title: {
        fontSize: 10,
      }
});

const mapStateToProps = ({ homePageState }) => {
    const { shareModalVisible } = homePageState;
    return { shareModalVisible };
};

export default connect(mapStateToProps, {
  homePageToggleShareModal: _homePageToggleShareModal
})(ShareModal);
