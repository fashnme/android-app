import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import {
  homePageGetInitialFeedData,
  homePageUpdateActiveTab
} from '../../actions';

class HomePagePost extends Component {
  // Renders main slider(vertical) with user details
  MainScreen(item, page) {
    console.log('c1', this.refs.verticalCarousel);
    console.log('c2', this.refs.ch);
    // if (this.carousel.currentIndex === 0) {
    //   this.refs.verticalCarousel.snapToNext();
    // }
    if (page === 'home') {
      return (
        <ImageBackground source={{ uri: item.uploadUrl }} resizeMode="cover" style={styles.body}>
          <StatusBar translucent backgroundColor="transparent" />
          <View style={styles.followTabs}>
            <Text 
              onPress={() => this.props.homePageUpdateActiveTab({ activeTab: 1 })} 
              style={this.props.activeTab === 1 ? { ...styles.followTabsItem, ...styles.selectedTab } : styles.followTabsItem}
            >
              For you
            </Text>
            <Text 
              onPress={() => this.props.homePageUpdateActiveTab({ activeTab: 2 })} 
              style={this.props.activeTab === 2 ? { ...styles.followTabsItem, ...styles.selectedTab } : styles.followTabsItem}
            >
                Following
              </Text>
          </View>
          <View style={styles.postContent}>  
              <View style={styles.userDetails}>
                <Text style={styles.userName}>@{item.userName}</Text>
                <Text style={styles.postCaption}>{item.caption}</Text>
              </View>
          </View>
          <View style={styles.postActionsOptions}>
            <Text style={{ color: 'red' }}>Hi</Text>
          </View>
        </ImageBackground>
      );
    } else if (page === 'like') {
      return (
        <View style={styles.body}>
            <Text>Like</Text>
        </View>
      );
    } else if (page === 'dislike') {
      return (
        <View style={styles.body}>
            <Text>dislike</Text>
        </View>
      );
    }
  }

    render() {
        const { WINDOW_WIDTH, item } = this.props;
        return (
          <Carousel
            data={['dislike', 'home', 'like']}
            sliderWidth={WINDOW_WIDTH}
            itemWidth={WINDOW_WIDTH}
            ref={'ch'}
            firstItem={1}
            horizontal
            renderItem={(i) => this.MainScreen(item, i.item)}
          />
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'black',
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
  
const mapStateToProps = ({ homePageState }) => {
    const { feedData, feedPageNum, activeTab } = homePageState;
    return { feedData, feedPageNum, activeTab };
  };
  
  
  export default connect(mapStateToProps, {
    homePageGetInitialFeedData,
    homePageUpdateActiveTab
  })(HomePagePost);
