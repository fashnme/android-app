import React, { Component } from 'react';
import { Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import BackgroundStateHandler from '../homeScreen/BackgroundStateHandler';

import { ASYNCSTORAGE_USER_TOKEN_NAME, ASYNCSTORAGE_USER_USER_NAME } from '../../types';
import {
  signupPageUserTokenUpdate,
  homePageGetInitialFeedData,
  homePageFetchUserColdStartDetails,
  personalPageSetData,
  homePageGetInitialPublicFeedData,
} from '../../actions';
import { FadeInView } from '../basic';

class SplashScreen extends Component {
  componentDidMount() {
    AsyncStorage.getItem(ASYNCSTORAGE_USER_TOKEN_NAME).then(
      (userToken) => {
        if (userToken) {
          setTimeout(() => {
            // Transfered these methods here from Home Page
            this.props.homePageGetInitialFeedData({ userToken });
            this.props.homePageGetInitialPublicFeedData({ userToken });
            this.props.homePageFetchUserColdStartDetails({ userToken }); // TODO Update this to store info in local storage
            this.props.personalPageSetData({ userToken });
            AsyncStorage.getItem(ASYNCSTORAGE_USER_USER_NAME).then(
              (userName) => {
                  if (userName !== null && userName.length !== 0) {
                    Actions.tabBar();
                  } else {
                    Actions.enterDetailsPage();
                  }
              }
            );
          }, 3000);
          this.props.signupPageUserTokenUpdate(userToken);
        } else {
          setTimeout(() => {
            Actions.signupPage();
          }, 2000);
        }
      }
    ).catch((error) => {
        console.log('User Token Fetching Error', error);
    });
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
})(SplashScreen);
