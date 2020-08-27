import React, { Component } from 'react';
import { Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions, ActionConst } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';


import BackgroundStateHandler from '../homeScreen/BackgroundStateHandler';

import { ASYNCSTORAGE_USER_TOKEN_NAME, ASYNCSTORAGE_USER_USER_NAME } from '../../types';
import {
  signupPageUserTokenUpdate,
  homePageGetInitialFeedData,
  homePageFetchUserColdStartDetails,
  personalPageSetData,
  homePageGetInitialPublicFeedData,
  signupPageSetReferrerData,
  celebrityPageVisitAndSetData,
  customSinglePostViewPageVisitAndSetData
} from '../../actions';
import { FadeInView } from '../basic';

class SplashScreen extends Component {
  componentDidMount() {
    AsyncStorage.getItem(ASYNCSTORAGE_USER_TOKEN_NAME).then(
      (userToken) => {
        if (userToken) {
          // Transfered these methods here from Home Page
          this.props.signupPageUserTokenUpdate(userToken);
          this.props.homePageGetInitialFeedData({ userToken });
          this.props.homePageGetInitialPublicFeedData({ userToken });
          this.props.homePageFetchUserColdStartDetails({ userToken }); // TODO Update this to store info in local storage
          this.props.personalPageSetData({ userToken });
          let params = {};
          let remoteMessage = null;
          // Get Incoming Link
          dynamicLinks()
            .getInitialLink()
            .then(link => {
              // console.log('link', link);
              if (link !== null) {
                params = this.parseUrl({ url: link.url });
              }
              // console.log('params', params);
              if (params.referrerId !== undefined) {
                this.props.signupPageSetReferrerData({ referrerId: params.referrerId });
              }
            });
          // Get Notification
          messaging()
            .getInitialNotification()
            .then(rM => {
              if (rM) {
                remoteMessage = rM;
              }
            });
          setTimeout(() => {
            AsyncStorage.getItem(ASYNCSTORAGE_USER_USER_NAME).then(
              (userName) => {
                  const { referrerId, postId, type } = params;
                  if (userName !== null && userName.length !== 0) {
                      switch (type) {
                        case 'postShare': {
                          console.log('postShare', params);
                          Actions.tabBar({ type: ActionConst.RESET });
                          this.props.customSinglePostViewPageVisitAndSetData({ postId });
                          break;
                        }
                        case 'profileShare': {
                          console.log('profileShare', params);
                          Actions.tabBar({ type: ActionConst.RESET });
                          this.props.celebrityPageVisitAndSetData({ userId: referrerId, userToken });
                          break;
                        }
                        // Not handling 'referAndEarn' here as it gets handled down
                        default: {
                          console.log('default', params);
                          if (remoteMessage !== null) {
                            console.log('Notification caused app to open from quit state:', remoteMessage);
                            Actions.tabBar({ type: ActionConst.RESET });
                            Actions.notificationPage();
                            // TODO Map each case in remoteMessage to specific page
                            // Temperoralily now redirecting to notificationPage
                          } else {
                            // Visit HomePage
                            Actions.tabBar();
                          }
                          break;
                        }
                      }
                  } else {
                      // ReferredId already Set above
                      Actions.enterDetailsPage();
                  }
              }
            );
          }, 2500);
        } else {
          dynamicLinks()
            .getInitialLink()
            .then(link => {
              if (link !== null) {
                const { referrerId } = this.parseUrl({ url: link.url });
                if (referrerId !== undefined) {
                  this.props.signupPageSetReferrerData({ referrerId });
                }
              }
            });
          setTimeout(() => {
            Actions.signupPage();
          }, 3500);
        }
      }
    ).catch((error) => {
        console.log('User Token Fetching Error', error);
    });
  }

  parseUrl({ url }) {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};
    let match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    return params;
  }

  render() {
    // console.log('Splash Screen Started Mishra Changed This FIle');
    return (
      <LinearGradient
        colors={['#D5252D', '#FE19AA']}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ y: 1.0, x: 1.0 }}
      >
        <StatusBar hidden />
        <FadeInView>
          <Image
              source={require('./patang_white.png')}
              style={styles.image}
          />
        </FadeInView>
        <BackgroundStateHandler />
      </LinearGradient>
    );
  }
}


const styles = {
  image: {
        width: 123.3,
        height: 143.7,
  }
};

export default connect(null, {
  signupPageUserTokenUpdate,
  homePageGetInitialFeedData,
  homePageFetchUserColdStartDetails,
  personalPageSetData,
  homePageGetInitialPublicFeedData,
  signupPageSetReferrerData,
  celebrityPageVisitAndSetData,
  customSinglePostViewPageVisitAndSetData
})(SplashScreen);
