import React, { Component } from 'react';
import { View } from 'react-native';
import { Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import TrendingScreen from './exploreScreen/TrendingScreen';
import WomenPage from './exploreScreen/WomenPage';
import MenPage from './exploreScreen/MenPage';
import { WomenCategoriesData, MenCategoriesData } from '../resources/staticData/CategoriesData';

import {
  videoPagePlayStatusUpdate,
  explorePageSetCategoriesData
} from '../actions';

class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: 0
    };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.props.videoPagePlayStatusUpdate({ homePageVideoPlay: false, celebPageVideoPlay: false });
      // const { userToken } = this.props;
      // this.props.explorePageGetTrendingUsers({ userToken });
      // this.props.explorePageGetTrendingPosts({ userToken });
    });
    this.props.explorePageSetCategoriesData({ WomenCategoriesData, MenCategoriesData });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <Tabs
          locked
          tabBarUnderlineStyle={{ height: 2, borderRadius: 2, backgroundColor: styles.tabColor[this.state.currentTab], padding: 0 }}
          onChangeTab={({ i }) => this.setState({ currentTab: i })}
        >
          <Tab
            heading="Trending"
            tabStyle={styles.tabStyle}
            activeTabStyle={{ backgroundColor: '#fafafa' }}
            activeTextStyle={{ color: '#0db7af', fontWeight: 'bold', fontSize: 16 }}
            textStyle={{ color: '#808080', fontSize: 16 }}
          >
            <TrendingScreen />
          </Tab>
          <Tab
            heading="Women"
            tabStyle={styles.tabStyle}
            activeTabStyle={{ backgroundColor: '#fafafa' }}
            activeTextStyle={{ color: '#fb56c1', fontWeight: 'bold', fontSize: 16 }}
            textStyle={{ color: '#808080', fontSize: 16 }}
          >
            <WomenPage />
          </Tab>
          <Tab
            heading="Men"
            tabStyle={styles.tabStyle}
            activeTabStyle={{ backgroundColor: '#fafafa' }}
            activeTextStyle={{ color: '#ee5f73', fontWeight: 'bold', fontSize: 16 }}
            textStyle={{ color: '#808080', fontSize: 16 }}
          >
            <MenPage />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const styles = {
  tabStyle: {
    backgroundColor: '#fafafa',
  },
  activeTabStyle: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 6,
    borderColor: '#0f0'
  },
  text: {
    fontWeight: 'bold'
  },
  tabColor: {
    0: '#0db7af',
    1: '#fb56c1',
    2: '#ee5f73'
  }
};

const mapStateToProps = ({ personalPageState, explorePageState }) => {
    const { userToken } = personalPageState;
    const { explorePageLoading } = explorePageState;
    return { userToken, explorePageLoading };
};

export default connect(mapStateToProps, {
  videoPagePlayStatusUpdate,
  explorePageSetCategoriesData
})(ExplorePage);
