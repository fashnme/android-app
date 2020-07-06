import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
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
import BidCancelPage from './components/SettingScreen/BidCancelPage';
import BidCreatePage from './components/SettingScreen/BidCreatePage';
import BidEditPage from './components/SettingScreen/BidEditPage';
import ManageCartPage from './components/SettingScreen/ManageCartPage';
import WishlistPage from './components/SettingScreen/WishlistPage';
import PersonalStorePage from './components/SettingScreen/PersonalStorePage';
import RewardsPage from './components/SettingScreen/RewardsPage';
import ReferAndEarnPage from './components/SettingScreen/ReferAndEarnPage';
import NotificationPage from './components/SettingScreen/NotificationPage';

// Using ICONS
// class TabIcon extends Component {
//   constructor(props) {
//     super(props);
//     this.iconsMap = {
//       home: { type: 'font-awesome', name: 'home', displayName: 'Home' },
//       search: { type: 'font-awesome', name: 'search', displayName: 'Search' },
//       upload: { type: 'font-awesome', name: 'plus-circle', displayName: 'Upload' },
//       user: { type: 'entypo', name: 'user', displayName: 'Me' },
//       celeb: { type: 'foundation', name: 'graph-bar', displayName: 'Celebs' }
//     };
//   }
// render() {
//     const color = this.props.focused ? '#FF91AF' : '#c6c9cf';
//     // const backgroundColor = this.props.selected ? '#ff0000' : '#fff';
//     const iconName = this.props.iconName;
//     return (
//       <View style={{ boderRadius: 5, backgroundColor: 'transparent' }}>
//         <Icon color={color} name={this.iconsMap[iconName].name} type={this.iconsMap[iconName].type} size={24} />
//         <Text style={{ color, fontWeight: 'bold', fontSize: 12 }}> {this.iconsMap[iconName].displayName} </Text>
//       </View>
//     );
//   }
// }
class TabIcon extends Component {
  constructor(props) {
    super(props);
    this.iconsMap = {
      home: { disabled_icon: require('./resources/icons/home_disabled.png'), enabled_icon: require('./resources/icons/home_enabled.png'), displayName: 'Home' },
      upload: { disabled_icon: require('./resources/icons/plus_disabled.png'), enabled_icon: require('./resources/icons/plus_enabled.png'), displayName: 'Upload' },
      user: { disabled_icon: require('./resources/icons/user_disabled.png'), enabled_icon: require('./resources/icons/user_enabled.png'), displayName: 'Me' },
    };
  }

render() {
    const iconName = this.props.iconName;
    if (this.props.focused) {
      return (
        <View style={{ boderRadius: 5, backgroundColor: 'transparent' }}>
          <Image
            style={{ width: 40, height: 40 }}
            source={this.iconsMap[iconName].enabled_icon}
          />
        </View>
      );
    }
    return (
      <View style={{ boderRadius: 5, backgroundColor: 'transparent' }}>
        <Image
          style={{ width: 28, height: 28 }}
          source={this.iconsMap[iconName].disabled_icon}
        />
      </View>
    );
  }
}

// <Scene icon={TabIcon} iconName={'home'} key='splashScreen' component={SplashScreen} />
const RouterComponent = () => {
    return (
      <Router navigationBarStyle={{ backgroundColor: 'transparent' }}>
        <Scene key='root' hideNavBar>
            <Scene initial hideNavBar title='SignUp'>
                <Scene initial key='splashScreen' component={SplashScreen} />
                <Scene key='signupPage' title='SignUp' component={SignupPage} />
                <Scene key='enterDetailsPage' title='Enter Details' component={EnterDetailsPage} />
            </Scene>

            <Scene key='tabBar' tabs tabBarPosition="bottom" showLabel={false} tabBarStyle={styles.tabBarStyle} activeBackgroundColor={'transparent'} indicatorStyle={styles.indicatorStyle}>
                <Scene hideNavBar icon={TabIcon} iconName={'home'} tabStyle={styles.tabStyle}>
                    <Scene initial key='home' title='Home' component={HomePage} />
                    <Scene hideTabBar key='celebrityPage' title='Celebrity' component={CelebrityPage} />
                </Scene>

                <Scene hideNavBar icon={TabIcon} iconName={'upload'} key='uploadPage' title='Upload' component={UploadPage} tabStyle={styles.tabStyle} />

                <Scene hideNavBar icon={TabIcon} iconName={'user'} tabStyle={styles.tabStyle}>
                  <Scene initial key='personalPage' title='Personal' component={PersonalPage} />
                  <Scene hideTabBar key='settings' title='Settings' component={SettingsPage} />
                  <Scene hideTabBar key='editUserProfile' component={EditUserProfile} />
                  <Scene hideTabBar key='orders' title='Orders' component={Orders} />
                  <Scene hideTabBar key='wishlistPage' title='Wishlist' component={WishlistPage} />
                  <Scene hideTabBar key='personalStorePage' title='Personal Store' component={PersonalStorePage} />
                  <Scene hideTabBar key='manageCart' title='Cart' component={ManageCartPage} />
                  <Scene hideTabBar key='rewardsPage' title='Rewards' component={RewardsPage} />
                  <Scene hideTabBar key='referAndEarnPage' title='Refer And Earn' component={ReferAndEarnPage} />
                  <Scene hideTabBar key='bidRequests' title='Bids & Requests' component={BidRequests} />
                  <Scene hideTabBar key='bidDenyPage' component={BidDenyPage} />
                  <Scene hideTabBar key='bidAcceptPage' component={BidAcceptPage} />
                  <Scene hideTabBar key='bidCancelPage' component={BidCancelPage} />
                  <Scene hideTabBar key='bidCreatePage' component={BidCreatePage} />
                  <Scene hideTabBar key='bidEditPage' component={BidEditPage} />
                  <Scene hideTabBar key='addUserAddress' component={AddUserAddress} />
                  <Scene hideTabBar key='notificationPage' component={NotificationPage} />
                </Scene>
            </Scene>
        </Scene>
      </Router>
    );
};

const windowWidth = Dimensions.get('window').width;
const tabWidth = windowWidth / 3;

const styles = {
  tabBarStyle: {
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
  },
  tabStyle: {
    width: tabWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  navigationBarStyle: {
    width: '100%',
    height: 30,
  },
  smallNavigationBar: {
    width: '100%',
    height: 20,
  },
  indicatorStyle: {
    activeBackgroundColor: 'transparent',
    backgroundColor: 'transparent'
  }

};

// const searchEnter = () => {
//   console.log('Router Search Entry');
// };

export default RouterComponent;
