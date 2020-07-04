import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableNativeFeedback, Image } from 'react-native';
import Video from 'react-native-video';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import AvatarComp from './AvatarComp';
import HeartComp from './HeartComp';

import {
  homePageLikePost,
  homePageDislikePost,
  homePageUnlikePost,
  celebrityPageFollow,
  celebrityPageUnfollow,
  celebrityPageVisitAndSetData,
  commentsPageOpenCommentsModal,
  homePageSharePost,
  productPageOpenProductModal
} from '../../actions';

class HomePageVideoPost extends Component {
  constructor() {
    super();
    this.state = {
      showFullCaption: false,
      player: null,
      paused: false
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
                   onPress: () => { this.props.homePageSharePost({ postData: this.props.data }); }
              })}

              {this.renderIconWithText({
                    style: styles.actionButton,
                    name: 'commenting',
                    type: 'font-awesome',
                    source: require('../../resources/icons/comments.png'),
                    text: totalComments,
                    onPress: () => { this.props.commentsPageOpenCommentsModal({ isVisible: true, commentsData: topComments, totalComments, postId }); }
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
                  onProfileClick={() => this.props.celebrityPageVisitAndSetData({ userToken, userId })}
               />
            </View>
        </View>
    );
  }

  render() {
    const { currentIndex, currentVisibleIndex, data } = this.props;
    const { uploadUrl } = data;
    const absDifference = Math.abs(currentIndex - currentVisibleIndex);
    if (absDifference > 2) {
      return <View />;
    }
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback style={styles.containerStyle} onPress={() => {}}>
          <Video
           source={{ uri: uploadUrl }} // Can be a URL or a local file.
           // ref={(ref) => {
           //   console.log('Ref', ref);
           //   // this.setState({ player: ref });
           // }} // Store reference
           onBuffer={() => console.log('buffering')} // Callback when remote video is buffering
           onError={() => console.log('Video Error')} // Callback when video cannot be loaded
           style={styles.backgroundVideo}
           resizeMode={'cover'}
           paused={absDifference !== 0}
           fullscreen
           // poster={'https://scontent.fdel15-1.fna.fbcdn.net/v/t1.0-9/12190970_1065949860091603_2210139939726579912_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=Zgj8MrL1sHwAX9tT0DV&_nc_ht=scontent.fdel15-1.fna&oh=96b8680e4616d86b0e65771a013aeb57&oe=5F25B9F2'}
           repeat
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


const mapStateToProps = ({ homePageState, userActionData, personalPageState }) => {
    const { likedPosts, followingDataMap } = userActionData;
    const { activeTab, verticalPublicCarouselRef, verticalPersonalCarouselRef } = homePageState;
    const { userToken } = personalPageState;
    return { activeTab, verticalPublicCarouselRef, verticalPersonalCarouselRef, userToken, likedPosts, followingDataMap };
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
    productPageOpenProductModal
  })(HomePageVideoPost);
