import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableNativeFeedback, Modal, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { ProcessingManager } from 'react-native-video-processing';
import ImagePicker from 'react-native-image-picker';
import PostScreen from './uploadScreen/PostScreen';
import {
  uploadPageToggleIsSelected,
  uploadPageUpdateSelectedImagePath
} from '../actions';

const screenWidth = Dimensions.get('window').width;

class UploadPage extends Component {
  constructor() {
    super();
    this.state = {
      frontCamera: false,
      isModalVisible: false,
      isRecording: false,
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
            Alert.alert('Modal has been closed.');
          }}
    >
      <View style={styles.modal} >
          <View style={styles.modalContainer}>
            <View>
              <View>
                <TouchableNativeFeedback
                  onPress={() => {
                    this.pickImage('image');
                  }}
                >
                  <View style={styles.item}>
                    <Text style={{ fontSize: 18 }}>Upload Photo</Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => {
                    this.pickImage('video');
                  }}
                  style={styles.item}
                >
                <View style={styles.item}>
                    <Text style={{ fontSize: 18 }}>Upload Video</Text>
                </View>
                </TouchableNativeFeedback>
              </View>

              <TouchableNativeFeedback
                onPress={() => {
                  this.setModalVisible(!this.state.isModalVisible);
                }}
              >
                <View style={{ alignSelf: 'center' }}>
                  <Text style={{ color: '#0A79DF', fontSize: 20 }}>Cancel</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
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
          this.props.uploadPageUpdateSelectedImagePath(`${response.uri}`);
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
              if (duration > 60) {
                Alert.alert(
                   'Too Large File!',
                   'Please upload a video of less than 60 Seconds', [{
                       text: 'Ok',
                       onPress: () => {},
                       style: 'cancel'
                   }], {
                       cancelable: true
                   }
                );
                return;
              }
          });
          this.props.uploadPageUpdateSelectedImagePath(`${response.path}`);
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
        this.props.uploadPageUpdateSelectedImagePath(data.uri);
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
          this.props.uploadPageUpdateSelectedImagePath(data.uri);
          this.props.uploadPageToggleIsSelected(true);
      }
    };

    const CustomIcon = ({ name, type, onPress }) => (
        <Icon onPress={onPress} iconStyle={styles.icon} containerStyle={{ margin: 40 }} color="white" size={30} name={name} type={type} />
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
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
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
              <TouchableNativeFeedback onPress={() => console.log('Exit Button Pressed')}>
                <View>
                  <Icon size={30} color="white" name="cross" type="entypo" iconStyle={styles.icon} />
                </View>
              </TouchableNativeFeedback>
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
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 60,
    paddingVertical: 30,
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
  uploadPageUpdateSelectedImagePath
})(UploadPage);
