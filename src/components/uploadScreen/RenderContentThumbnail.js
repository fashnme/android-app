import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;

const RenderContentThumbnail = ({ selectedContentPath, mediaType }) => {
  // console.log('RenderContentThumbnail path', selectedContentPath, mediaType);
  if (mediaType === 'video') {
    return (
      <Card containerStyle={styles.container}>
        <Video
         source={{ uri: selectedContentPath }} // Can be a URL or a local file.
         onBuffer={() => console.log('buffering')} // Callback when remote video is buffering
         onError={() => console.log('Video Error')} // Callback when video cannot be loaded
         style={styles.backgroundVideo}
         resizeMode={'contain'}
         paused={false}
         fullscreen
         repeat
        />
      </Card>
    );
  }
  return (
    <Card containerStyle={styles.container}>
      <Image style={{ height: 250, width: screenWidth - 20, borderRadius: 5, }} resizeMode="contain" source={{ uri: selectedContentPath }} />
    </Card>
  );
};

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  backgroundVideo: {
    height: 250,
    width: screenWidth - 20
  },
};

const mapStateToProps = ({ uploadPageState }) => {
  const { selectedContentPath, mediaType } = uploadPageState;
  return { selectedContentPath, mediaType };
};

export default connect(mapStateToProps)(RenderContentThumbnail);
