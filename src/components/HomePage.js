import React, { Component } from 'react';
import { Dimensions, StatusBar, View, BackHandler, Alert, Image } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {
  homePageUpdateActiveTab,
  homePageSetPublicVerticalCarouselRef,
  homePageSetPersonalVerticalCarouselRef,
  homePageGetInitialFeedData,
  homePageFetchUserColdStartDetails,
  personalPageSetData,
  homePageGetInitialPublicFeedData,
  videoPagePlayStatusUpdate,
  celebrityPageVisitAndSetData,
  customSinglePostViewPageVisitAndSetData,
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
    // To play home video
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.props.videoPagePlayStatusUpdate({ homePageVideoPlay: true, celebPageVideoPlay: false });
    });

    // Check Internet Status
    axios.get('https://clients3.google.com/generate_204')
        .then((response) => {
          if (response.status !== 204) {
            showMessage({ message: 'No Internet', type: 'danger', duration: 20000, floating: true, icon: 'warning', description: 'Check You Internet Connection' });
          }
        })
        .catch(() => {
          showMessage({ message: 'No Internet', type: 'danger', duration: 20000, floating: true, icon: 'warning', description: 'Check You Internet Connection' });
        });

    const { userToken, feedData, newUser } = this.props;

    // Handle the Dynamic Link after Installing the App for first time
    if (newUser) {
      dynamicLinks()
        .getInitialLink()
        .then(link => {
          let params = {};
          // console.log('link', link);
          if (link !== null) {
            params = this.parseUrl({ url: link.url });
          }
          const { postId, referrerId, type } = params;
          switch (type) {
            case 'postShare':
              this.props.customSinglePostViewPageVisitAndSetData({ postId });
              break;
            case 'profileShare':
              this.props.celebrityPageVisitAndSetData({ userId: referrerId, userToken });
              break;
            default:
              break;
          }
        });
    }

    // Getting the Initial Feed Data, when App in opened
    if (feedData.length === 0) {
      // Transfered these Method calling to Splash Screen, but when came first time after installing feedData is empty
      // console.log('Called Again HomePage');
      this.props.homePageGetInitialFeedData({ userToken });
      this.props.homePageGetInitialPublicFeedData({ userToken });
      this.props.homePageFetchUserColdStartDetails({ userToken }); // TODO Update this to store info in local storage
      this.props.personalPageSetData({ userToken });
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
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

  parseUrl({ url }) {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};
    let match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    return params;
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
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
        <Image source={require('../resources/background/loader-gif.gif')} style={{ height: 250, width: 250 }} />
        <FlashMessage position="top" duration={1000} ref="homePage" />
      </View>
    );
  }
}
//../resources/background/loader-gif.gif

const mapStateToProps = ({ homePageState, personalPageState, referralState }) => {
  const { feedData, feedPageNum, publicFeedData, activeTab } = homePageState;
  const { userToken } = personalPageState;
  const { newUser } = referralState;
  // console.log('HomePage mapStateToProps', feedData.length, feedPageNum);
  return { feedData, feedPageNum, publicFeedData, activeTab, userToken, newUser };
};


export default connect(mapStateToProps, {
  homePageUpdateActiveTab,
  homePageSetPublicVerticalCarouselRef,
  homePageSetPersonalVerticalCarouselRef,
  homePageGetInitialFeedData,
  homePageFetchUserColdStartDetails,
  personalPageSetData,
  homePageGetInitialPublicFeedData,
  videoPagePlayStatusUpdate,
  celebrityPageVisitAndSetData,
  customSinglePostViewPageVisitAndSetData,
})(HomePage);
