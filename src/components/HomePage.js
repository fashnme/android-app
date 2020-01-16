import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text,
  ImageBackground,
  StatusBar,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {
  homePageGetInitialFeedData,
  homePageUpdateActiveTab
} from '../actions';
// Store height(Window + StatusBar) in variable
const height = Dimensions.get('window').height + StatusBar.currentHeight;

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
  // Renders main slider(vertical) with user details
  MainScreen(item) {
    return (
      <ImageBackground source={{ uri: item.uploadUrl }} resizeMode="contain" style={styles.body}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.followTabs}>
          <Text onPress={() => this.props.homePageUpdateActiveTab({ activeTab: 1 })} style={this.props.activeTab === 1 ? { ...styles.followTabsItem, ...styles.selectedTab } : styles.followTabsItem}>
            For you
          </Text>
          <Text onPress={() => this.props.homePageUpdateActiveTab({ activeTab: 2 })} style={this.props.activeTab === 2 ? { ...styles.followTabsItem, ...styles.selectedTab } : styles.followTabsItem}>Following</Text>
        </View>
        <View style={styles.postContent}>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{item.userId}</Text>
              <Text style={styles.postCaption}>{item.caption}</Text>
            </View>
        </View>
        <View style={styles.postActionsOptions}>
          <Text style={{ color: 'red' }}>Hi</Text>
        </View>
      </ImageBackground>
    );
  }

  render() {
    const { feedData, feedPageNum } = this.props;
    // console.log('HomePage Feed Data', feedData, feedPageNum);
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
  const { feedData, feedPageNum, activeTab } = homePageState;
  return { feedData, feedPageNum, activeTab };
};

const styles = StyleSheet.create({
  body: {
      flex: 1,
      paddingTop: 20,
  },
  postActionsOptions: {
  },
  followTabs: {
      flexDirection: 'row',
      justifyContent: 'center',
  },
  postContent: {
    position: 'absolute',
    bottom: 0
  },
  userDetails: {
      flexDirection: 'column',
      marginBottom: 60,
      color: 'white',
      textShadowColor: 'black',
      textShadowRadius: 4,
      marginLeft: 5
  },
  userName: {
      color: 'white',
      textShadowColor: 'black',
      textShadowRadius: 4,
      fontWeight: 'bold',
      fontSize: 18
  },
  postCaption: {
      color: 'white',
      textShadowColor: 'black',
      textShadowRadius: 4,
      fontSize: 16,
      width: '65%'
  },
  followTabsItem: {
      color: 'white',
      fontSize: 24,
      padding: 10,
      textShadowColor: 'black',
      textShadowRadius: 4,
      opacity: 0.8
  },
  selectedTab: {
      opacity: 1,
      fontWeight: 'bold',
  }
});


export default connect(mapStateToProps, {
  homePageGetInitialFeedData,
  homePageUpdateActiveTab
})(HomePage);
