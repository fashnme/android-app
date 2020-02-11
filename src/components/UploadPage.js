import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  uploadPageToggleIsSelected,
  uploadPageUpdateCaption,
  uploadPageUpdateSelectedImagePath,
  uploadPageUploadContent
} from '../actions';

// const screenWidth = Dimensions.get('window').width;
// const height = Dimensions.get('window').height + StatusBar.currentHeight;

class UploadPage extends Component {
  // this.props.uploadPageToggleIsSelected(true)
  // this.props.uploadPageUpdateCaption('hello')
  // this.props.uploadPageUpdateSelectedImagePath('file://dafad')
  // this.props.uploadPageUploadContent({ caption, selectedImagePath, userToken })

  render() {
    const { userToken, selectedImagePath, isSelected, caption } = this.props;
    return (
      <View>
        <Text> UploadPage </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ homePageState, uploadPageState }) => {
    const { selectedImagePath, isSelected, caption } = uploadPageState;
    const { userToken } = homePageState;
    return { userToken, selectedImagePath, isSelected, caption };
};

export default connect(mapStateToProps, {
  uploadPageToggleIsSelected,
  uploadPageUpdateCaption,
  uploadPageUpdateSelectedImagePath,
  uploadPageUploadContent
})(UploadPage);
