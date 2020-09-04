import React from 'react';
import { View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import ProgressBar from 'react-native-progress/Bar';

// import ShareList from './ShareList';
// import ReactionList from './ReactionList';


const ShareModal = ({ shareModalVisible, shareDownloadProgress }) => {
    // const reactionDetails = [
    //     {
    //         id: 1,
    //         icon: 'heart-broken',
    //         iconType: 'material-community',
    //         title: 'Not interested'
    //     },
    //     {
    //         id: 2,
    //         icon: 'report-problem',
    //         iconType: 'material-icons',
    //         title: 'Report'
    //     },
    //     {
    //         id: 3,
    //         icon: 'download',
    //         iconType: 'antdesign',
    //         title: 'Save video'
    //     },
    // ];
    // return (
    //   <Overlay
    //     isVisible={shareModalVisible}
    //     overlayStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 2, bottom: 0, position: 'absolute' }}
    //     width={'100%'}
    //     height={'40%'}
    //     windowBackgroundColor={'transparent'}
    //   >
    //   <View style={styles.modalStyle}>
    //     <View style={styles.commentsModalHeader}>
    //       <Text style={styles.commentsModalHeaderTitle}>Share to</Text>
    //     </View>
    //     <View style={{ flex: 1 }}>
    //         <ShareList postData={postData} />
    //     </View>
    //     <View>
    //         <ReactionList reactionOptions={reactionDetails} />
    //     </View>
    //
    //     <View style={styles.editBox}>
    //         <Button title={'Cancel'} type="outline" onPress={() => homePageToggleShareModal(false)} />
    //     </View>
    //   </View>
    //   </Overlay>
    // );
    return (
      <Overlay
        isVisible={shareModalVisible}
        overlayStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 0, bottom: 0, position: 'absolute' }}
        width={'100%'}
        height={'30%'}
        windowBackgroundColor={'transparent'}
      >
        <View style={{ justifyContent: 'space-around', flex: 1 }}>
          <View>
            <Text style={{ justifyContent: 'center', textAlign: 'center', marginTop: 10, fontWeight: 'bold', opacity: 0.6, fontSize: 17 }}>
              Preparing to Share
            </Text>
          </View>
          <View>
            <Text style={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', opacity: 0.3, fontSize: 17 }}>
              {(shareDownloadProgress * 100).toString().slice(0, 2)}%
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            {/*<ActivityIndicator size="large" /> */}
            <ProgressBar
              progress={shareDownloadProgress}
              width={200}
              color={'#a1c4fd'}
              // color={'#861657'}
              useNativeDriver
              borderWidth={10}
              borderColor={'#d5ecf7'}
              // borderColor={'#f0f0f0'}
            />
          </View>
          <View />
          <View />
        </View>
      </Overlay>
    );
};

// const styles = StyleSheet.create({
//     modalStyle: {
//         height: '90%',
//         backgroundColor: 'white',
//         borderTopLeftRadius: 15,
//         borderTopRightRadius: 15,
//         margin: 0,
//       },
//       commentsModalHeader: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         padding: 10,
//       },
//       commentsModalHeaderTitle: {
//         fontSize: 13,
//         fontWeight: 'bold',
//         opacity: 0.6,
//       },
//       editBox: {
//         alignItems: 'center',
//         padding: 15,
//         marginBottom: 5
//       },
//       title: {
//         fontSize: 10,
//       }
// });

const mapStateToProps = ({ sharePageState }) => {
    const { shareModalVisible, shareDownloadProgress } = sharePageState;
    return { shareModalVisible, shareDownloadProgress };
};

export default connect(mapStateToProps, {
})(ShareModal);
