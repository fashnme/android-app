import React, { Component } from 'react';
import {
  Dimensions,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {
  homePageGetInitialFeedData,
  homePageUpdateActiveTab
} from '../actions';
import HomePagePost from './homeScreen/HomePagePost';

// Store height(Window + StatusBar) in variable
const WINDOW_HEIGHT = Dimensions.get('window').height + StatusBar.currentHeight;
// Store height(Window + StatusBar) in variable
const WINDOW_WIDTH = Dimensions.get('window').width;

class HomePage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.MainScreen = this.MainScreen.bind(this);
  // }

  componentDidMount() {
    // Getting the Initial Feed Data, when App in opened
    this.props.homePageGetInitialFeedData({ userToken: '' });
  }
  // componentWillUnmount() {
  //
  // }

  render() {
    const { feedData, feedPageNum } = this.props;
    // console.log('HomePage Feed Data', feedData, feedPageNum);
    return (
    <Carousel
      data={feedData}
      ref={'verticalCarousel'}
      sliderHeight={WINDOW_HEIGHT}
      itemHeight={WINDOW_HEIGHT}
      vertical
      renderItem={({ item }) => (
          <HomePagePost item={item} WINDOW_WIDTH={WINDOW_WIDTH} verticalCarousel={this.refs.verticalCarousel} />
      )}
    />   
    );
  }
}

const mapStateToProps = ({ homePageState }) => {
  const { feedData, feedPageNum, activeTab, userToken } = homePageState;
  return { feedData, feedPageNum, activeTab, userToken };
};


export default connect(mapStateToProps, {
  homePageGetInitialFeedData,
  homePageUpdateActiveTab
})(HomePage);
