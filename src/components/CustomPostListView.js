// To View custom list of Posts. Similar to Home Page
import React, { Component } from 'react';
import { Dimensions, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import FlashMessage from 'react-native-flash-message';
import {
} from '../actions';
import HomePageImagePost from './homeScreen/HomePageImagePost';
import HomePageVideoPost from './homeScreen/HomePageVideoPost';
import ProductModal from './productScreen/ProductModal';
import CommentsModal from './homeScreen/CommentsModal';

// Store height(Window + StatusBar) in variable
const WINDOW_HEIGHT = Dimensions.get('window').height + StatusBar.currentHeight;


class CustomPostListView extends Component {
  constructor() {
    super();
    this.state = {
      currentVisibleIndex: 0
    };
    this.handleViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 95 };
    this.flatListRef = null;
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      if (this.flatListRef !== null) {
        const { postIndex } = this.props;
        // console.log('componentDidMount', postIndex);
        this.flatListRef.snapToItem(postIndex, false);
      }
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  onViewableItemsChanged({ viewableItems }) {
    if (viewableItems && viewableItems.length > 0) {
        this.setState({ currentVisibleIndex: viewableItems[0].index });
    }
  }

  render() {
    // const { customFeedData, postIndex } = this.props;
    const { customFeedData } = this.props;
    // console.log('CustomPostListView', customFeedData, postIndex);
      return (
        <View onLayout={() => {}}>
          <StatusBar hidden />
          <Carousel
            data={customFeedData}
            ref={(ref) => {
              // console.log('ref', ref, postIndex);
              if (ref !== null) {
                this.flatListRef = ref;
              }
            }}
            // initialScrollIndex={postIndex}
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
          <FlashMessage position="top" duration={1000} ref="homePage" />
        </View>
      );
  }
}

const mapStateToProps = ({ customPostListViewState }) => {
  const { customFeedData, postIndex } = customPostListViewState;
  return { customFeedData, postIndex };
};


export default connect(mapStateToProps, {
})(CustomPostListView);
