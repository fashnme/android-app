import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableNativeFeedback } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  uploadPageToggleIsSelected,
  uploadPageUpdateCaption,
  uploadPageUpdateSelectedImagePath,
  uploadPageUploadContent
} from '../actions';

const screenWidth = Dimensions.get('window').width;
// const height = Dimensions.get('window').height + StatusBar.currentHeight;

const RecordButton = ({ onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
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
    };
  }

  render() {
    const { userToken, selectedImagePath, isSelected, caption } = this.props;

    const takePicture = async () => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        console.log(data.uri);
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
              <Icon size={30} color="white" name="cross" type="entypo" iconStyle={styles.icon} />    
            </View>
            <View style={styles.cameraActions}>
              <CustomIcon name="swap-vertical" type="material-community" onPress={() => this.setState({ frontCamera: !this.state.frontCamera })} />
              <RecordButton onPress={() => takePicture()} />  
              <CustomIcon name="images" type="entypo" onPress={() => console.log('Gallery Tap')} />
            </View>
          </SafeAreaView>
          </RNCamera>
        </View>
      );
    }
      
    return (
      <View>
        <Text> UploadPage Choose a caption </Text>
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
