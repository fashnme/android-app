import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Header, Input, Button, Overlay, Card } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import {
  uploadPageUpdateCaption as _uploadPageUpdateCaption,
  uploadPageToggleIsSelected as _uploadPageToggleIsSelected,
  uploadPageUploadContent as _uploadPageUploadContent
} from '../../actions';

import RenderContentThumbnail from './RenderContentThumbnail';

const screenWidth = Dimensions.get('window').width;

const renderUpdatingOverlay = ({ uploadingStatus }) => {
  const { status, isUploading, progress } = uploadingStatus;
  return (
    <Overlay
      isVisible={isUploading}
      windowBackgroundColor={'transparent'}
      width={screenWidth - 20}
      borderRadius={10}
    >
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <ProgressBar progress={progress} width={screenWidth - 80} />
        <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#000', marginTop: 4, fontSize: 20 }}>{status}</Text>
      </View>
    </Overlay>
  );
};

const PostScreen = ({ selectedContentPath, caption, userToken, userName, personalUserId, uploadingStatus,
  uploadPageUpdateCaption, uploadPageToggleIsSelected, uploadPageUploadContent }) => {
  const [hashtag, setHashtag] = useState('');
  const [lenError, setlenError] = useState('');
        return (
          <View>
            <Header
              backgroundColor="white"
              leftComponent={{ icon: 'arrow-left', type: 'font-awesome', color: '#505050', onPress: () => { uploadPageToggleIsSelected(false); Actions.uploadPage(); } }}
              centerComponent={{ text: { userName }, style: { color: 'black', fontSize: 20 } }}
              rightComponent={{ icon: 'delete', type: 'antdesign', color: 'red', onPress: () => { uploadPageToggleIsSelected(false); Actions.uploadPage(); } }}
              containerStyle={{ paddingTop: 0, height: 50 }}
            />
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="dark-content" />
                    <RenderContentThumbnail />
                    <Card containerStyle={{ margin: 0, padding: 0, borderRadius: 10, marginTop: 10 }}>
                      <Text style={styles.headingStyle}> Caption </Text>
                      <Input
                        placeholder="Write a caption"
                        value={caption}
                        onChangeText={(text) => { uploadPageUpdateCaption(text); setlenError(''); }}
                        inputStyle={styles.commentInputStyle}
                        maxLength={280}
                        multiline
                        inputContainerStyle={styles.inputContainerStyle}
                        errorMessage={lenError}
                      />
                      <Text style={styles.headingStyle}> #hashtags (Optional) </Text>
                      <Input
                        placeholder="Add #hashtags"
                        value={hashtag}
                        onChangeText={(text) => setHashtag(text)}
                        inputStyle={styles.commentInputStyle}
                        maxLength={280}
                        multiline
                        inputContainerStyle={styles.inputContainerStyle}
                      />

                    </Card>
                    <Button
                      containerStyle={{ margin: 100, marginTop: 15, marginBottom: 100 }}
                      loading={uploadingStatus.isUploading}
                      raised
                      title="POST"
                      titleStyle={{ fontWeight: 'bold' }}
                      ViewComponent={LinearGradient}
                      linearGradientProps={{
                        colors: ['#00E8D3', '#00AEE9'],
                        start: { x: 1.0, y: 0.5 },
                        end: { x: 0.0, y: 0.5 },
                      }}
                      onPress={() => {
                        if (caption.trim().length === 0) {
                          setlenError('Please Enter a Small Caption');
                        } else {
                          uploadPageUploadContent({ caption: `${caption} ${hashtag}`, selectedContentPath, userToken, personalUserId });
                        }
                      }}
                    />
                </View>
                { renderUpdatingOverlay({ uploadingStatus }) }
            </ScrollView>
          </View>
        );
};

const styles = StyleSheet.create({
      inputContainerStyle: {
        backgroundColor: '#fff',
        // height: 200,
        borderRadius: 10,
        elevation: 2,
        marginTop: 6,
        marginBottom: 20,
        borderColor: 'transparent',
      },
      commentInputStyle: {
        fontSize: 17,
        textAlignVertical: 'top',
        maxHeight: 200,
      },
      headingStyle: {
        fontWeight: 'bold',
        color: '#606060',
        marginLeft: 15,
        marginTop: 10
      }
});

const mapStateToProps = ({ uploadPageState, personalPageState }) => {
  const { selectedContentPath, caption, uploadingStatus } = uploadPageState;
  const { userToken, personalUserId, personalUserDetails } = personalPageState;
  const { userName } = personalUserDetails;
  return { selectedContentPath, caption, userToken, personalUserId, uploadingStatus, userName };
};

export default connect(mapStateToProps, {
  uploadPageUpdateCaption: _uploadPageUpdateCaption,
  uploadPageToggleIsSelected: _uploadPageToggleIsSelected,
  uploadPageUploadContent: _uploadPageUploadContent
})(PostScreen);
