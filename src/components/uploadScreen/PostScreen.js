import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Header, Input, Button, Overlay } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  uploadPageUpdateCaption as _uploadPageUpdateCaption,
  uploadPageToggleIsSelected as _uploadPageToggleIsSelected,
  uploadPageUploadContent as _uploadPageUploadContent
} from '../../actions';

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

const PostScreen = ({ selectedImagePath, caption, userToken, personalUserId, uploadingStatus, uploadPageUpdateCaption, uploadPageToggleIsSelected, uploadPageUploadContent }) => {
        return (
          <View>
            <Header
              backgroundColor="white"
              leftComponent={{ icon: 'arrow-left', type: 'font-awesome', color: 'black', onPress: () => { uploadPageToggleIsSelected(false); Actions.uploadPage(); } }}
              centerComponent={{ text: 'Post', style: { color: 'black', fontSize: 20 } }}
              rightComponent={{ icon: 'delete', color: 'black', onPress: () => { uploadPageToggleIsSelected(false); Actions.uploadPage(); } }}
              containerStyle={{ paddingTop: 0, height: 56 }}
            />
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="dark-content" />
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, }}>
                        <Image style={{ height: 250, width: screenWidth - 20, borderRadius: 5, }} resizeMode="center" source={{ uri: selectedImagePath }} />
                    </View>
                    <View style={{ margin: 4 }}>
                    <Input
                        placeholder="Add a caption"
                        multiline
                        value={caption}
                        onChangeText={(text) => uploadPageUpdateCaption(text)}
                        numberOfLines={4}
                        inputStyle={{ height: 100 }}
                        maxLength={280}
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                    />
                    <View style={{ margin: 20, alignItems: 'center' }}>
                        <View style={{ width: 200 }}>
                            <Button
                              loading={uploadingStatus.isUploading}
                              raised
                              title="POST"
                              titleStyle={{ fontWeight: 'bold' }}
                              onPress={() => uploadPageUploadContent({ caption, selectedImagePath, userToken, personalUserId })}
                            />
                        </View>
                    </View>
                </View>
                </View>
                { renderUpdatingOverlay({ uploadingStatus }) }
            </ScrollView>
          </View>
        );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 0,
        paddingRight: 0
      },
      inputContainerStyle: {
        backgroundColor: '#fff',
        height: 100,
        borderRadius: 10,
        elevation: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
      }
});

const mapStateToProps = ({ uploadPageState, personalPageState }) => {
  const { selectedImagePath, caption, uploadingStatus } = uploadPageState;
  const { userToken, personalUserId } = personalPageState;
  return { selectedImagePath, caption, userToken, personalUserId, uploadingStatus };
};

export default connect(mapStateToProps, {
  uploadPageUpdateCaption: _uploadPageUpdateCaption,
  uploadPageToggleIsSelected: _uploadPageToggleIsSelected,
  uploadPageUploadContent: _uploadPageUploadContent
})(PostScreen);
