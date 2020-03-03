import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Dimensions, Text, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
import LikeScreen from './LikeScreen';
import DislikeScreen from './DislikeScreen';
import { HOME_PAGE_PUBLIC_MODE, HOME_PAGE_PERSONAL_MODE } from '../../types';
import AvatarComp from './AvatarComp';
import HeartComp from './HeartComp';
import CommentsModal from './CommentsModal';
import ProductModal from '../productScreen/ProductModal';
// import ShareModal from './ShareModal';
import {
  homePageLikePost,
  homePageDislikePost,
  homePageUnlikePost,
  celebrityPageFollow,
  celebrityPageUnfollow,
  celebrityPageVisitAndSetData,
  homePageToggleCommentsModal,
  homePageSharePost,
  productPageOpenProductModal
} from '../../actions';

const screenWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height + StatusBar.currentHeight;
const tabs = { DISLIKE: 0, CONTENT: 1, LIKE: 2 };

class HomePagePost extends Component {
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

  renderIconWithText({ style, name, type, text, color = '#fafafa', onPress }) {
      return (
        <TouchableNativeFeedback onPress={onPress} style={style}>
          <View>
            <Icon
              name={name}
              type={type}
              color={color}
              size={32}
              iconStyle={styles.icons}
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
                    style: styles.productTag,
                    name: 'shopping-bag',
                    type: 'font-awesome',
                    text: '',
                    onPress: () => { this.props.productPageOpenProductModal({ isVisible: true, productsData: taggedProducts, postDetails: this.props.data }); }
               })}

               {this.renderIconWithText({
                     style: styles.actionButton,
                     name: 'share',
                     type: 'font-awesome',
                     text: 'Share',
                     onPress: () => { this.props.homePageSharePost({ postData: this.props.data }); }
                })}

                {this.renderIconWithText({
                      style: styles.actionButton,
                      name: 'commenting',
                      type: 'font-awesome',
                      text: totalComments,
                      onPress: () => { this.props.homePageToggleCommentsModal(true); }
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
                    onFollowPress={() => this.props.celebrityPageFollow({ userToken, userId })}
                    onProfileClick={() => this.props.celebrityPageVisitAndSetData({ userToken, userId })}
                 />
                 <CommentsModal comments={topComments} />
                 <ProductModal />
              </View>
          </View>
      );
    }

  render() {
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
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
  },
  postActions: {
   position: 'absolute',
   bottom: 0,
   right: 0,
   marginBottom: 100,
   marginRight: 10,
   flexDirection: 'column-reverse',
 },
});

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
    homePageToggleCommentsModal,
    homePageSharePost,
    productPageOpenProductModal
  })(HomePagePost);
