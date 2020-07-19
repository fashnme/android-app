import React, { Component } from 'react';
import { Dimensions, StatusBar, View, BackHandler, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import FlashMessage from 'react-native-flash-message';
import {
  homePageUpdateActiveTab,
  homePageSetPublicVerticalCarouselRef,
  homePageSetPersonalVerticalCarouselRef,
  homePageGetInitialFeedData,
  homePageFetchUserColdStartDetails,
  personalPageSetData,
  homePageGetInitialPublicFeedData,
  videoPagePlayStatusUpdate
} from '../actions';
import HomePageImagePost from './homeScreen/HomePageImagePost';
import HomePageVideoPost from './homeScreen/HomePageVideoPost';
import ProductModal from './productScreen/ProductModal';
import CommentsModal from './homeScreen/CommentsModal';
import ShareModal from './homeScreen/ShareModal';

// Store height(Window + StatusBar) in variable
const WINDOW_HEIGHT = Dimensions.get('window').height + StatusBar.currentHeight;


class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      currentVisibleIndex: 0
    };
    this.handleViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 95 };
  }
  componentDidMount() {
    // Getting the Initial Feed Data, when App in opened
    const { userToken, feedData } = this.props; // Transfered this Method calling to Splash Screen
    if (feedData.length === 0) {
      console.log('Called Again HomePage');
      this.props.homePageGetInitialFeedData({ userToken });
      this.props.homePageGetInitialPublicFeedData({ userToken });
      this.props.homePageFetchUserColdStartDetails({ userToken }); // TODO Update this to store info in local storage
      this.props.personalPageSetData({ userToken });
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));

    // To play home video
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.props.videoPagePlayStatusUpdate({ homePageVideoPlay: true, celebPageVideoPlay: false });
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener.remove();
  }

  onViewableItemsChanged({ viewableItems }) {
    if (viewableItems && viewableItems.length > 0) {
        this.setState({ currentVisibleIndex: viewableItems[0].index });
    }
  }

  handleBackButton() {
    if (Actions.currentScene === 'home') {
        Alert.alert(
         'Exit App',
         'Exiting the application?', [{
             text: 'No',
             onPress: () => console.log('Cancel Pressed'),
             style: 'cancel'
         }, {
             text: 'Yes',
             onPress: () => BackHandler.exitApp()
         }], {
             cancelable: true
         }
      );
    }
    if (Actions.currentScene === 'home' || Actions.currentScene === 'enterDetailsPage') {
      return true;
    }
    return false;
  }

  render() {
    // const { feedData, activeTab, publicFeedData } = this.props;
    const { feedData, activeTab } = this.props;
    if (activeTab === 1) {
      return (<View />); // No need for Now
      // return (
      //   <View>
      //     <StatusBar hidden />
      //     <Carousel
      //       data={publicFeedData}
      //       ref={(c) => { this.props.homePageSetPublicVerticalCarouselRef(c); }}
      //       sliderHeight={WINDOW_HEIGHT}
      //       itemHeight={WINDOW_HEIGHT}
      //       vertical
      //       useScrollView={false}
      //       renderItem={({ item }) => (<HomePageImagePost data={item} />)}
      //     />
      //   <FlashMessage position="top" duration={500} />
      //   </View>
      // );
    } else if (activeTab === 2) {
      return (
        <View>
          <StatusBar hidden />
          <Carousel
            data={feedData}
            ref={(c) => { this.props.homePageSetPersonalVerticalCarouselRef(c); }}
            sliderHeight={WINDOW_HEIGHT}
            itemHeight={WINDOW_HEIGHT}
            vertical
            useScrollView={false}
            renderItem={({ item, index }) => {
              const { mediaType } = item;
              if (mediaType === 'image') {
                return <HomePageImagePost data={item} currentIndex={index} currentVisibleIndex={this.state.currentVisibleIndex} />;
              }
              return <HomePageVideoPost data={item} currentIndex={index} currentVisibleIndex={this.state.currentVisibleIndex} />;
            }}
            onViewableItemsChanged={this.handleViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
          />
          <ProductModal />
          <CommentsModal />
          <ShareModal />
          <FlashMessage position="top" duration={1000} ref="homePage" />
        </View>
      );
    }

    // Return the Spinner
    return <View />;
  }
}
// <FlashMessage position="top" duration={500} />

const mapStateToProps = ({ homePageState, personalPageState }) => {
  const { feedData, feedPageNum, publicFeedData, activeTab } = homePageState;
  const { userToken } = personalPageState;
  return { feedData, feedPageNum, publicFeedData, activeTab, userToken };
};


export default connect(mapStateToProps, {
  homePageUpdateActiveTab,
  homePageSetPublicVerticalCarouselRef,
  homePageSetPersonalVerticalCarouselRef,
  homePageGetInitialFeedData,
  homePageFetchUserColdStartDetails,
  personalPageSetData,
  homePageGetInitialPublicFeedData,
  videoPagePlayStatusUpdate
})(HomePage);
