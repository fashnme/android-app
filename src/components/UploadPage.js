import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableNativeFeedback, Modal, Alert, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {
  uploadPageToggleIsSelected,
  uploadPageUpdateCaption,
  uploadPageUpdateSelectedImagePath,
  uploadPageUploadContent
} from '../actions';

const screenWidth = Dimensions.get('window').width;
// const height = Dimensions.get('window').height + StatusBar.currentHeight;

const RecordButton = ({ onPress, onLongPress }) => {
  return (
    <TouchableNativeFeedback onLongPress={onLongPress} onPress={onPress}>
      <View style={styles.recordButtonOuterCircle}>
        <View style={styles.recordButtonInnerCircle} />
      </View>
   </TouchableNativeFeedback>
  ); 
 };

class UploadPage extends Component {
  // this.props.uploadPageToggleIsSelected(true)
  // this.props.uploadPageUpdateCaption('hello')
  // this.props.uploadPageUpdateSelectedImagePath('file://dafad')
  // this.props.uploadPageUploadContent({ caption, selectedImagePath, userToken })
  constructor() {
    super();
    this.state = {
      frontCamera: false,
      isModalVisible: false,
    };
  }
  setModalVisible(visible) {
    this.setState({ isModalVisible: visible });
  }

  
 UploadPickerModal() {
  return (
    <Modal
          animationType="slide"
          visible={this.state.isModalVisible}
          transparent
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
    >
      <View
        style={styles.modal}
      >
          <View style={styles.modalContainer}>
            <View>
              <View> 
                <TouchableNativeFeedback
                  onPress={() => {
                    this.PickImage('image');
                  }}
                >  
                  <View style={styles.item}>
                    <Text style={{ fontSize: 18 }}>Upload Photo</Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => {
                    this.PickImage('video');
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

  PickImage(mediaType) {
    const options = {
      title: 'Select Image/Video',
      mediaType, 
      storageOptions: {
        skipBackup: true,
        noData: true,
      },
    };
    // Open Image Library:
    ImagePicker.launchImageLibrary(options, response => {
      // Same code as in above section!
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.props.selectImageFromLibraryVS(false);
        // } else if (response.customButton) {
        //   console.log('User tapped custom button: ', response.customButton);
      } else {
        this.props.uploadPageUpdateSelectedImagePath(response.uri);
        this.props.uploadPageToggleIsSelected(true);
      }
    });
  }

  render() {
    const { userToken, selectedImagePath, isSelected, caption } = this.props;

    const takePicture = async () => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        this.props.uploadPageUpdateSelectedImagePath(data.uri);
        this.props.uploadPageToggleIsSelected(true);
      }
    };
    const takeVideo = async () => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takeVideo(options);
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
              <CustomIcon name="swap-vertical" type="material-community" onPress={() => this.setState({ frontCamera: !this.state.frontCamera })} />
              <RecordButton onPress={() => takePicture()} />  
              <CustomIcon name="images" type="entypo" onPress={() => this.setModalVisible(true)} />
            </View>
          </SafeAreaView>
          </RNCamera>
          {this.UploadPickerModal()}
        </View>
      );
    } 
      return (
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
          <Image style={{ height: 300, width: 400 }} source={{ uri: selectedImagePath }} />
        </View>
      );
  }
}

const mapStateToProps = ({ homePageState, uploadPageState }) => {
    const { selectedImagePath, isSelected, caption } = uploadPageState;
    const { userToken } = homePageState;
    return { userToken, selectedImagePath, isSelected, caption };
};

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
  recordButtonOuterCircle: {
    height: 90,
    width: 90,
    borderRadius: 45, // half of height and width for circle
    borderColor: '#EA425C',
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(mapStateToProps, {
  uploadPageToggleIsSelected,
  uploadPageUpdateCaption,
  uploadPageUpdateSelectedImagePath,
  uploadPageUploadContent
})(UploadPage);
