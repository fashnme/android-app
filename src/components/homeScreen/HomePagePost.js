import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ImageSlider from 'react-native-image-slider';
import {
  homePageGetInitialFeedData,
  homePageUpdateActiveTab
} from '../../actions';

class HomePagePost extends Component {
  // Renders main slider(vertical) with user details
  MainScreen(item, index) {
    if (index === 1) {
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
    } else if (index === 2) {
      return (<View style={styles.slide3}>
        <Text>Dislike</Text>
      </View>);
    } else if (index === 0) {
      return (<View style={styles.slide1}>
        <Text>Like</Text>
      </View>);
    }
  }

    render() {
        const { item, WIDTH, verticalCarousel } = this.props;
        return (
          <ImageSlider 
          images={['like', 'home', 'dislike']}
          position={1}
          onPositionChanged={(index) => {
            if (index !== 1) {
              verticalCarousel.snapToNext();
            }
          }}
          customSlide={({ index, style, width }) => (
            // It's important to put style here because it's got offset inside
            <View key={index} style={{ width }}>
                {this.MainScreen(item, index)}
            </View>
          )}
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
    slide1: {
      backgroundColor: 'green',
      flex: 1
    },
    slide3: {
      backgroundColor: 'red',
      flex: 1
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
