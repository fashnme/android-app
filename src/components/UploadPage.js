import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, TouchableNativeFeedback, Modal, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ProcessingManager } from 'react-native-video-processing';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import PostScreen from './uploadScreen/PostScreen';
import { CamNotAuthView } from './basic';
import {
  uploadPageToggleIsSelected,
  uploadPageUpdateselectedContentPath
} from '../actions';

const screenWidth = Dimensions.get('window').width;

class UploadPage extends Component {
  constructor() {
    super();
    this.state = {
      frontCamera: false,
      isModalVisible: false,
      isRecording: false,
      mediaType: null
    };
  }
  setModalVisible(visible) {
    this.setState({ isModalVisible: visible });
  }

 uploadPickerModal() {
  return (
    <Modal
          animationType="slide"
          visible={this.state.isModalVisible}
          transparent
          onRequestClose={() => {
          }}
    >
      <View style={styles.modal} >
          <View style={styles.modalContainer}>
              <View>
                <Button
                  raised
                  iconRight
                  containerStyle={{ marginTop: 10 }}
                  title={'Upload Image'}
                  titleStyle={{ margin: 5, fontWeight: 'bold', fontSize: 16 }}
                  icon={{ name: 'camera', size: 20, color: 'white', type: 'font-awesome' }}
                  ViewComponent={LinearGradient}
                  buttonStyle={{ borderRadius: 8, margin: 0 }}
                  linearGradientProps={{
                    colors: ['#0072ff', '#00c6ff'],
                    start: { x: 0.0, y: 0.5 },
                    end: { x: 1.0, y: 0.5 },
                  }}
                  onPress={() => { this.setState({ mediaType: 'image' }); this.pickImage('image'); }}
                />

                <Button
                  raised
                  iconRight
                  containerStyle={{ marginTop: 50 }}
                  title={'Upload Video'}
                  titleStyle={{ margin: 5, fontWeight: 'bold', fontSize: 16 }}
                  icon={{ name: 'video-camera', size: 20, color: 'white', type: 'font-awesome' }}
                  ViewComponent={LinearGradient}
                  buttonStyle={{ borderRadius: 8, margin: 0 }}
                  linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: { x: 1.0, y: 0.5 },
                    end: { x: 0.0, y: 0.5 },
                  }}
                  onPress={() => { this.setState({ mediaType: 'video' }); this.pickImage('video'); }}
                />
              </View>

              <Button
                containerStyle={{ marginTop: 80, padding: 0 }}
                title={'Cancel'}
                type={'outline'}
                titleStyle={{ margin: 1, color: 'red' }}
                buttonStyle={{ borderRadius: 15, borderColor: 'red', paddingHorizontal: 10 }}
                onPress={() => { this.setModalVisible(!this.state.isModalVisible); }}
              />
            </View>
          </View>
        </Modal>

  );
}

  pickImage(mediaType) {
    const options = {
      title: 'Select Image/Video',
      mediaType,
      storageOptions: {
        skipBackup: true,
        noData: true,
        waitUntilSaved: true,
        cameraRoll: true
      },
    };
    ImagePicker.launchImageLibrary(options, response => { // Open Image Library:
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        // this.props.selectImageFromLibraryVS(false);
      } else {
        const { path } = response;
        if (mediaType === 'image') {
          this.props.uploadPageUpdateselectedContentPath({ selectedContentPath: `${response.uri}`, mediaType: this.state.mediaType });
          this.props.uploadPageToggleIsSelected(true);
          return;
        }
        if (path === null) { // For Video if path is null Show Error
          Alert.alert(
             'Upload Failed',
             'Sorry, this Video appears to be missing. Please download it to your device.', [{
                 text: 'Ok',
                 onPress: () => {},
                 style: 'cancel'
             }], {
                 cancelable: true
             }
          );
        } else {
          ProcessingManager.getVideoInfo(path)
          .then(({ duration }) => {
              if (duration > 120 || duration < 10) {
                Alert.alert(
                   'Too Large or Short File!',
                   'Please upload a video of between 10 & 120 Seconds', [{
                       text: 'Ok',
                       onPress: () => {},
                       style: 'cancel'
                   }], {
                       cancelable: true
                   }
                );
                Actions.home();
                this.props.uploadPageUpdateselectedContentPath({ selectedContentPath: '', mediaType: '' });
                return;
              }
          });
          this.props.uploadPageUpdateselectedContentPath({ selectedContentPath: `${response.path}`, mediaType: this.state.mediaType });
          this.props.uploadPageToggleIsSelected(true);
        }
      }
    });
  }

  render() {
    const { isSelected } = this.props;

    const RecordButton = ({ onPress, onLongPress }) => {
      return (
        <TouchableNativeFeedback onLongPress={onLongPress} onPress={onPress}>
          <View style={styles.recordButtonOuterCircle}>
            {this.state.isRecording ? <View style={styles.recordingButton} /> : <View style={styles.recordButtonInnerCircle} />}
          </View>
       </TouchableNativeFeedback>
      );
     };

    const takePicture = async () => {
      if (this.camera) {
        const options = { quality: 1, orientation: 'portrait' };
        const data = await this.camera.takePictureAsync(options);
        this.props.uploadPageUpdateselectedContentPath({ selectedContentPath: data.uri, mediaType: 'image' });
        this.props.uploadPageToggleIsSelected(true);
      }
    };
    const takeVideo = async () => {
      if (this.camera) {
        const options = { maxDuration: 30,
              orientation: 'portrait',
              videoBitrate: 1 * 1000 * 1000, // 1Mbps
              quality: RNCamera.Constants.VideoQuality['480p']
            };
        this.setState({
          isRecording: true,
        });
        const data = await this.camera.recordAsync(options);
          this.props.uploadPageUpdateselectedContentPath({ selectedContentPath: data.uri, mediaType: 'video' });
          this.props.uploadPageToggleIsSelected(true);
      }
    };

    const CustomIcon = ({ name, type, onPress }) => (
        <Icon onPress={onPress} reverse iconStyle={styles.icon} containerStyle={{ margin: 40 }} color="grey" size={25} name={name} type={type} />
    );

    if (!isSelected) {
      return (
        <View style={styles.body}>
        <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={this.state.frontCamera ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        autoFocus
        playSoundOnCapture
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        notAuthorizedView={<CamNotAuthView />}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
        >
          <SafeAreaView style={styles.cameraContainer}>
            <View style={styles.header}>
                <Icon size={22} color="black" name="cross" type="entypo" iconStyle={styles.icon} reverse onPress={() => Actions.home()} />
            </View>
            <View style={styles.cameraActions}>
              <CustomIcon name="camera-switch" type="material-community" onPress={() => this.setState({ frontCamera: !this.state.frontCamera })} />
              <RecordButton onLongPress={() => takeVideo()} onPress={() => (this.state.isRecording ? this.camera.stopRecording() : takePicture())} />
              <CustomIcon name="folder-multiple-image" type="material-community" onPress={() => this.setModalVisible(true)} />
            </View>
          </SafeAreaView>
          </RNCamera>
          {this.uploadPickerModal()}
        </View>
      );
    }
    return <PostScreen />;
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 60,
    paddingVertical: 50,
    borderRadius: 10,
  },
  item: {
    padding: 10,
    borderRadius: 20,
  },
  cameraContainer: {
    flex: 1,
    width: screenWidth,
    padding: 10,
  },
  icon: {
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
  cameraActions: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: screenWidth,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    alignItems: 'flex-start',
    marginTop: 30,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  recordButtonInnerCircle: {
    height: 66,
    width: 66,
    borderRadius: 33, // half of height and width for circle
    backgroundColor: '#FF362E',
  },
  recordingButton: {
    height: 40,
    width: 40,
    backgroundColor: '#FF362E',
    margin: 4,
    borderRadius: 10,
  },
  recordButtonOuterCircle: {
    height: 90,
    width: 90,
    borderRadius: 45, // half of height and width for circle
    borderColor: '#EA425C',
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});


const mapStateToProps = ({ uploadPageState }) => {
    const { isSelected } = uploadPageState;
    return { isSelected };
};

export default connect(mapStateToProps, {
  uploadPageToggleIsSelected,
  uploadPageUpdateselectedContentPath
})(UploadPage);
