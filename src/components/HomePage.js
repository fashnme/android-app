import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  ImageBackground,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { homePageGetInitialFeedData } from '../actions';
import styles from './styles/HomePage';
// Store height in variable
const height = Dimensions.get('window').height;

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
  MainScreen(item) {
    return (
      <ImageBackground source={{ uri: item.uploadUrl }} style={styles.body}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.followTabs}>
          <Text style={{ ...styles.followTabsItem, ...styles.selectedTab }}>
            For you
          </Text>
          <Text style={styles.followTabsItem}>Following</Text>
        </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{item.userId}</Text>
              <Text onPress={() => console.log('clicked')} style={styles.postCaption}>{item.caption}</Text>
            </View>
        <View style={styles.postActionsOptions}>
          <Text style={{ color: 'red' }}>Hi</Text>
        </View>
      </ImageBackground>
    );
  }

  render() {
    const { feedData, feedPageNum } = this.props;
    console.log('HomePage Feed Data', feedData, feedPageNum);
    return (
      <Carousel
        data={feedData}
        sliderHeight={height}
        itemHeight={height}
        vertical
        renderItem={({ item }) => this.MainScreen(item)}
      />
    );
  }
}

const mapStateToProps = ({ homePageState }) => {
  const { feedData, feedPageNum } = homePageState;
  return { feedData, feedPageNum };
};

export default connect(mapStateToProps, {
  homePageGetInitialFeedData
})(HomePage);
