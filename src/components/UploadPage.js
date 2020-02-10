import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Dimensions, Text, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import {
  uploadPageToggleIsSelected,
  uploadPageUpdateCaption,
  uploadPageUpdateSelectedImagePath
} from '../actions';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height + StatusBar.currentHeight;

class UploadPage extends Component {
  // this.props.uploadPageToggleIsSelected(true)
  // this.props.uploadPageUpdateCaption('hello')
  // this.props.uploadPageUpdateSelectedImagePath('file://dafad')

  
  render() {
    return (
      <View>
        <Text> UploadPage </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ homePageState, userActionData }) => {
    const { likedPosts, followingData } = userActionData;
    const { activeTab, verticalPublicCarouselRef, verticalPersonalCarouselRef, userToken } = homePageState;
    console.log('In the mapStateToProps of HomePagePost');
    return { activeTab, verticalPublicCarouselRef, verticalPersonalCarouselRef, userToken, likedPosts, followingData };
};

  export default connect(mapStateToProps, {
    uploadPageToggleIsSelected,
    uploadPageUpdateCaption,
    uploadPageUpdateSelectedImagePath
  })(UploadPage);
