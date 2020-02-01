import React, { Component } from 'react';
import {
  Dimensions,
  StatusBar,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {
  homePageGetInitialFeedData,
  homePageUpdateActiveTab,
  homePageGetInitialPublicFeedData,
  homePageSetPublicVerticalCarouselRef,
  homePageSetPersonalVerticalCarouselRef
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
  }

  render() {
    const { feedData, activeTab, publicFeedData } = this.props;
    if (activeTab === 1) {
      return (
        <Carousel
          data={publicFeedData}
          ref={(c) => { this.props.homePageSetPublicVerticalCarouselRef(c); }}
          sliderHeight={WINDOW_HEIGHT}
          itemHeight={WINDOW_HEIGHT}
          vertical
          useScrollView={false}
          renderItem={({ item }) => (<HomePagePost data={item} />)}
        />
      );
    } else if (activeTab === 2) {
      return (
        <Carousel
          data={feedData}
          ref={(c) => { this.props.homePageSetPersonalVerticalCarouselRef(c); }}
          sliderHeight={WINDOW_HEIGHT}
          itemHeight={WINDOW_HEIGHT}
          vertical
          useScrollView={false}
          renderItem={({ item }) => (<HomePagePost data={item} />)}
        />
      );
    }

    // Return the Spinner
    return <View />;
  }
}

const mapStateToProps = ({ homePageState }) => {
  const { feedData, feedPageNum, publicFeedData, activeTab, userToken } = homePageState;
  return { feedData, feedPageNum, publicFeedData, activeTab, userToken };
};


export default connect(mapStateToProps, {
  homePageGetInitialFeedData,
  homePageUpdateActiveTab,
  homePageGetInitialPublicFeedData,
  homePageSetPublicVerticalCarouselRef,
  homePageSetPersonalVerticalCarouselRef
})(HomePage);
