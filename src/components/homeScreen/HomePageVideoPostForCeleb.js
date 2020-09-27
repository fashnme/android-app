import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableNativeFeedback, Image } from 'react-native';
import Video from 'react-native-video';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { PATH_TO_CACHE_DIR, FILE_TYPE } from '../../types';
import AvatarComp from './AvatarComp';
import HeartComp from './HeartComp';
import BlinkingVideoIcon from './BlinkingVideoIcon';
// import VideoDownloadComp from './VideoDownloadComp';
// import TestBlinking from './TestBlinking';

import {
  homePageLikePost,
  homePageDislikePost,
  homePageUnlikePost,
  celebrityPageFollow,
  celebrityPageUnfollow,
  celebrityPageVisitAndSetData,
  commentsPageOpenCommentsModal,
  homePageSharePost,
  productPageOpenProductModal,
  videoPagePlayStatusUpdate,
  homePageMarkUserViewedPost
} from '../../actions';

class HomePageVideoPostForCeleb extends Component {
  constructor() {
    super();
    this.state = {
      showFullCaption: false,
      player: null,
      // showVideo: false,
      showStreamVideo: true
    };
  }

  renderIconWithText({ source, text, onPress }) {
      return (
        <TouchableNativeFeedback onPress={onPress}>
          <View style={styles.icons}>
            <Image
              style={[{ width: 32, height: 32, justifyContent: 'center', alignSelf: 'center' }]}
              source={source}
            />
            <Text style={styles.actionCaption}>{text}</Text>
          </View>
        </TouchableNativeFeedback>
      );
  }

  renderUserCaption(caption, userName, userToken, userId) {
      return (
        <View style={styles.postDetails}>
          <Text
            style={styles.userName}
            onPress={() => this.props.celebrityPageVisitAndSetData({ userToken, userId })}
          >
            {`@${userName}`}
          </Text>
          <Text
            style={styles.postCaption}
            numberOfLines={this.state.showFullCaption === false ? 1 : 0}
            onPress={() => this.setState({ showFullCaption: !this.state.showFullCaption })}
          >
            {caption}
          </Text>
        </View>
      );
  }

  renderScreenButtons() {
    const { userToken } = this.props;
    const { totalComments, topComments, taggedProducts, caption, totalLikes, userName, userPic, userId, postId } = this.props.data;
    return (
        <View style={styles.exampleContainer}>
          {this.renderUserCaption(caption, userName, userToken, userId)}
          <View style={styles.postActions}>
            {this.renderIconWithText({
                  style: styles.actionButton,
                  name: 'shopping-bag',
                  type: 'font-awesome',
                  source: require('../../resources/icons/shopping_bag.png'),
                  text: 'Shop',
                  onPress: () => { this.props.productPageOpenProductModal({ isVisible: true, productsData: taggedProducts, postDetails: this.props.data }); }
             })}

             {this.renderIconWithText({
                   style: styles.actionButton,
                   name: 'whatsapp',
                   type: 'font-awesome',
                   source: require('../../resources/icons/whatsapp.png'),
                   text: 'Share',
                   onPress: () => { this.props.homePageSharePost({ postData: this.props.data, referrerId: this.props.personalUserId }); }
              })}

              {this.renderIconWithText({
                    style: styles.actionButton,
                    name: 'commenting',
                    type: 'font-awesome',
                    source: require('../../resources/icons/comments.png'),
                    text: totalComments,
                    onPress: () => { this.props.commentsPageOpenCommentsModal({ isVisible: true, userToken, commentsData: topComments, totalComments, postId, posterId: userId }); }
               })}

               <HeartComp
                  postId={postId}
                  likes={totalLikes}
                  onLikePress={() => this.props.homePageLikePost({ postId, userId, userToken })}
                  onUnlikePress={() => this.props.homePageUnlikePost({ postId, userId, userToken })}
               />
               <AvatarComp
                  userId={userId}
                  userPic={userPic}
                  onFollowPress={() => { this.props.celebrityPageFollow({ userToken, userId }); showMessage({ message: 'Celeb Followed!', type: 'success', floating: true, icon: 'success' }); }}
                  onProfileClick={() => {
                    this.props.videoPagePlayStatusUpdate({ homePageVideoPlay: false, celebPageVideoPlay: false });
                    this.props.celebrityPageVisitAndSetData({ userToken, userId });
                  }}
               />
            </View>
            <BlinkingVideoIcon />
        </View>
    );
  }

  render() {
    const { currentIndex, currentVisibleIndex, data, celebPageVideoPlay, referrerId, userToken, videosDownloaded } = this.props;
    const { uploadUrl, thumbnailUrl, userId, postId, bucketUrl } = data;
    const absDifference = currentIndex - currentVisibleIndex;
    if (absDifference !== 0) {
      // return <VideoDownloadComp bucketUrl={bucketUrl} compType={'customVideo'} postId={postId} currentIndex={currentIndex} currentVisibleIndex={currentVisibleIndex} />;
      return <View />;
    }
    // console.log('showStreamVideo', this.state.showStreamVideo, videosDownloaded);

    // if (this.state.showStreamVideo && postId in videosDownloaded) {
    //   this.setState({ showStreamVideo: false });
    //   // console.log('Video Already Downloaded', videosDownloaded[postId]);
    // }
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback style={styles.containerStyle} onPress={() => {}}>
          <Video
           // source={{ uri: this.state.showStreamVideo ? uploadUrl : `${FILE_TYPE}${PATH_TO_CACHE_DIR}/${postId}.mp4` }} // Can be a URL or a local file.
           source={{ uri: bucketUrl }} // Can be a URL or a local file.
           onBuffer={() => console.log('buffering')} // Callback when remote video is buffering
           onError={(e) => console.log('Video Error', postId, e)} // Callback when video cannot be loaded
           style={styles.backgroundVideo}
           resizeMode={'cover'}
           playInBackground={false}
           playWhenInactive={false}
           paused={!(celebPageVideoPlay && absDifference === 0)}
           // fullscreen
           poster={thumbnailUrl}
           posterResizeMode={'cover'}
           repeat
           onEnd={() => this.props.homePageMarkUserViewedPost({ posterId: userId, postId, referrerId, userToken })}
          />
        </TouchableWithoutFeedback>
        {this.renderScreenButtons()}
      </View>
    );
  }
}

const styles = {
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  exampleContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  postDetails: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    marginLeft: 10,
    width: '100%',
    flexDirection: 'column',
  },
  userName: {
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 4,
    fontWeight: 'bold',
    fontSize: 18,
  },
  postCaption: {
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 4,
    paddingTop: 10,
    fontSize: 16,
    width: '65%',
  },
  productTag: {
    marginTop: 20,
  },
  icons: {
    marginTop: 15,
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
  actionCaption: {
    color: 'white',
    textAlign: 'center',
    marginTop: 4,
  },
  postActions: {
   position: 'absolute',
   bottom: 0,
   right: 0,
   marginBottom: 100,
   marginRight: 5,
   paddingRight: 0,
   flexDirection: 'column-reverse',
 },
 actionButton: {}
};


const mapStateToProps = ({ personalPageState, videoPlayStatusState, referralState }) => {
    const { userToken, personalUserId } = personalPageState;
    const { celebPageVideoPlay, videosDownloaded } = videoPlayStatusState;
    const { referrerId } = referralState;
    return { userToken, celebPageVideoPlay, personalUserId, referrerId, videosDownloaded };
};

  export default connect(mapStateToProps, {
    homePageLikePost,
    homePageDislikePost,
    homePageUnlikePost,
    celebrityPageFollow,
    celebrityPageUnfollow,
    celebrityPageVisitAndSetData,
    commentsPageOpenCommentsModal,
    homePageSharePost,
    productPageOpenProductModal,
    videoPagePlayStatusUpdate,
    homePageMarkUserViewedPost
  })(HomePageVideoPostForCeleb);
