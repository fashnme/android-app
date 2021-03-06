import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Dimensions, Text, Image, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
// import { Icon } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import LikeScreen from './LikeScreen';
import DislikeScreen from './DislikeScreen';
import { HOME_PAGE_PUBLIC_MODE, HOME_PAGE_PERSONAL_MODE } from '../../types';
import AvatarComp from './AvatarComp';
import HeartComp from './HeartComp';
// import CommentsModal from './CommentsModal';
// import ProductModal from '../productScreen/ProductModal';
// import ShareModal from './ShareModal';

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

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height + StatusBar.currentHeight;
const tabs = { DISLIKE: 0, CONTENT: 1, LIKE: 2 };

class HomePageImagePost extends Component {
  constructor() {
    super();
    this.state = {
      showFullCaption: false
    };
  }
  changeToNextContent(index) {
    const { activeTab, data, userToken, verticalPublicCarouselRef, verticalPersonalCarouselRef } = this.props;
    if (activeTab === HOME_PAGE_PUBLIC_MODE) {
      verticalPublicCarouselRef.snapToNext();
    } else if (activeTab === HOME_PAGE_PERSONAL_MODE) {
      verticalPersonalCarouselRef.snapToNext();
    }
    const { postId, userId } = data;
    switch (index) {
      case tabs.LIKE:
        this.props.homePageLikePost({ postId, userId, userToken });
        break;

      case tabs.CONTENT:
        break;

      case tabs.DISLIKE:
        this.props.homePageDislikePost({ postId, userId, userToken });
        break;

      default:
        break;
    }
    return {};
  }

  renderContent(parallaxProps, uploadUrl) {
      return (
          <ParallaxImage
            source={{ uri: uploadUrl }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0}
            {...parallaxProps}
          />
      );
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

  renderItem({ item }, parallaxProps) {
    const { userToken } = this.props;
     const { totalComments, topComments, taggedProducts, caption, uploadUrl, totalLikes, userName, userPic, userId, postId } = this.props.data;
     // console.log('home Data', totalComments, caption, uploadUrl, totalLikes, userName, userPic, userId, postId);
     // console.log('taggedProducts', taggedProducts);
     if (item === tabs.DISLIKE) {
        return (
          <DislikeScreen />
        );
      } else if (item === tabs.LIKE) {
        return (
          <LikeScreen />
        );
      }
      return (
          <View style={styles.exampleContainer}>
            {this.renderContent(parallaxProps, uploadUrl)}
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
                    onProfileClick={() => this.props.celebrityPageVisitAndSetData({ userToken, userId })}
                 />
                 {/*<CommentsModal /> */}
                 {/*<ProductModal /> */}
              </View>
          </View>
      );
    }


  render() {
    const { currentIndex, currentVisibleIndex } = this.props;
    const absDifference = Math.abs(currentIndex - currentVisibleIndex);
    if (absDifference > 2) {
      return <View />;
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={[styles.exampleContainer]}>
              <Carousel
                ref={(c) => { this.carousel = c; }}
                data={[
                    tabs.DISLIKE, // Dislike
                    tabs.CONTENT, // Image
                    tabs.LIKE, // Like
                  ]}
                renderItem={this.renderItem.bind(this)}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
                style={{ flex: 1 }}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                onSnapToItem={(index) => {
                              if (index !== 1) {
                                this.carousel.snapToItem(1, true, () => {});
                              }
                              this.changeToNextContent(index);
                            }}
                layout={'tinder'}
                hasParallaxImages
                firstItem={1}
              />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  exampleContainer: {
    flex: 1,
  },
  slider: {
    overflow: 'visible', // for custom animations
  },
  item: {
    width: screenWidth,
    height: screenWidth,
  },
  imageContainer: {
    height,
    width: screenWidth,
    backgroundColor: 'white',
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
});

const mapStateToProps = ({ homePageState, personalPageState }) => {
    const { activeTab, verticalPublicCarouselRef, verticalPersonalCarouselRef } = homePageState;
    const { userToken, personalUserId } = personalPageState;
    return { activeTab, verticalPublicCarouselRef, verticalPersonalCarouselRef, userToken, personalUserId };
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
  })(HomePageImagePost);
