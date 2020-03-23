import React, { Component } from 'react';
import { Dimensions, StatusBar, View, BackHandler, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import {
  homePageGetInitialFeedData,
  homePageUpdateActiveTab,
  homePageGetInitialPublicFeedData,
  homePageSetPublicVerticalCarouselRef,
  homePageSetPersonalVerticalCarouselRef,
  homePageFetchUserColdStartDetails
} from '../actions';
import HomePagePost from './homeScreen/HomePagePost';

// Store height(Window + StatusBar) in variable
const WINDOW_HEIGHT = Dimensions.get('window').height + StatusBar.currentHeight;


class HomePage extends Component {
  componentDidMount() {
    // Getting the Initial Feed Data, when App in opened
    const { userToken } = this.props;
    this.props.homePageGetInitialFeedData({ userToken });
    this.props.homePageGetInitialPublicFeedData({ userToken });
    this.props.homePageFetchUserColdStartDetails({ userToken });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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
      //       renderItem={({ item }) => (<HomePagePost data={item} />)}
      //     />
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
            renderItem={({ item }) => (<HomePagePost data={item} />)}
          />
        </View>
      );
    }

    // Return the Spinner
    return <View />;
  }
}

const mapStateToProps = ({ homePageState, personalPageState }) => {
  const { feedData, feedPageNum, publicFeedData, activeTab } = homePageState;
  const { userToken } = personalPageState;
  return { feedData, feedPageNum, publicFeedData, activeTab, userToken };
};


export default connect(mapStateToProps, {
  homePageGetInitialFeedData,
  homePageUpdateActiveTab,
  homePageGetInitialPublicFeedData,
  homePageSetPublicVerticalCarouselRef,
  homePageSetPersonalVerticalCarouselRef,
  homePageFetchUserColdStartDetails
})(HomePage);
