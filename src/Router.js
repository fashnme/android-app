import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import SplashScreen from './components/signupScreen/SplashScreen';
import HomePage from './components/HomePage';
import CelebrityPage from './components/CelebrityPage';
import UploadPage from './components/UploadPage';
import PersonalPage from './components/PersonalPage';
import SignupPage from './components/SignupPage';
import EnterDetailsPage from './components/signupScreen/EnterDetailsPage';
import SettingsPage from './components/SettingsPage';
import EditUserProfile from './components/SettingScreen/EditUserProfile';
import Orders from './components/SettingScreen/Orders';
import BidRequests from './components/SettingScreen/BidRequests';
import BidDenyPage from './components/SettingScreen/BidDenyPage';
import BidAcceptPage from './components/SettingScreen/BidAcceptPage';
import AddUserAddress from './components/SettingScreen/AddUserAddress';

class TabIcon extends Component {
  constructor(props) {
    super(props);
    this.iconsMap = {
      home: { type: 'font-awesome', name: 'home', displayName: 'Home' },
      search: { type: 'font-awesome', name: 'search', displayName: 'Search' },
      upload: { type: 'font-awesome', name: 'plus-circle', displayName: 'Upload' },
      user: { type: 'entypo', name: 'user', displayName: 'Me' },
      celeb: { type: 'foundation', name: 'graph-bar', displayName: 'Celebs' }
    };
  }
render() {
    const color = this.props.focused ? '#FF91AF' : '#c6c9cf';
    // const backgroundColor = this.props.selected ? '#ff0000' : '#fff';
    const iconName = this.props.iconName;
    return (
      <View style={{ boderRadius: 5 }}>
        <Icon color={color} name={this.iconsMap[iconName].name} type={this.iconsMap[iconName].type} size={24} />
        <Text style={{ color, fontWeight: 'bold', fontSize: 12 }}> {this.iconsMap[iconName].displayName} </Text>
      </View>
    );
  }
}
// <Scene icon={TabIcon} iconName={'home'} key='splashScreen' component={SplashScreen} />
const RouterComponent = () => {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#fff' }}>
        <Scene key='root' hideNavBar>
            <Scene hideNavBar title='SignUp'>
                <Scene key='splashScreen' component={SplashScreen} />
                <Scene initial key='signupPage' title='SignUp' component={SignupPage} />
                <Scene key='enterDetailsPage' title='Enter Details' component={EnterDetailsPage} />
            </Scene>

            <Scene initial key='tabBar' tabs tabBarPosition="bottom" showLabel={false} tabBarStyle={styles.tabBarStyle} indicatorStyle={styles.indicatorStyle}>
                <Scene hideNavBar icon={TabIcon} iconName={'home'} tabStyle={styles.tabStyle}>
                    <Scene key='home' title='Home' component={HomePage} />
                    <Scene hideTabBar key='celebrityPage' title='Celebrity' component={CelebrityPage} />
                </Scene>

                <Scene hideNavBar icon={TabIcon} iconName={'upload'} key='uploadPage' title='Upload' component={UploadPage} tabStyle={styles.tabStyle} />

                <Scene initial hideNavBar icon={TabIcon} iconName={'user'} tabStyle={styles.tabStyle}>
                  <Scene key='personalPage' title='Personal' component={PersonalPage} />
                  <Scene hideTabBar key='settings' title='Settings' component={SettingsPage} />
                  <Scene initial hideTabBar key='editUserProfile' component={EditUserProfile} />
                  <Scene hideTabBar key='orders' title='Orders' component={Orders} />
                  <Scene hideTabBar key='bidRequests' title='Bids & Requests' component={BidRequests} />
                  <Scene hideTabBar key='bidDenyPage' component={BidDenyPage} />
                  <Scene hideTabBar key='bidAcceptPage' component={BidAcceptPage} />
                  <Scene hideTabBar key='addUserAddress' component={AddUserAddress} />
                </Scene>
            </Scene>
        </Scene>
      </Router>
    );
};

const windowWidth = Dimensions.get('window').width;
const tabWidth = windowWidth / 4;

const styles = {
  tabBarStyle: {
    flexDirection: 'row',
    height: 52,
    elevation: 2,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  tabStyle: {
    width: tabWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#45484f',
    position: 'absolute',
    width: '100%',
    left: 0
  },
  navigationBarStyle: {
    width: '100%',
    height: 30,
  },
  smallNavigationBar: {
    width: '100%',
    height: 20,
  }

};

// const searchEnter = () => {
//   console.log('Router Search Entry');
// };

export default RouterComponent;
