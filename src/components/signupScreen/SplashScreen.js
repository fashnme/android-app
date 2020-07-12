import React, { Component } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { ASYNCSTORAGE_USER_TOKEN_NAME, ASYNCSTORAGE_USER_USER_NAME } from '../../types';
import {
  signupPageUserTokenUpdate
} from '../../actions';
import { FadeInView } from '../basic';

class SplashScreen extends Component {
  componentDidMount() {
    AsyncStorage.getItem(ASYNCSTORAGE_USER_TOKEN_NAME).then(
      (userToken) => {
        if (userToken) {
          setTimeout(() => {
            AsyncStorage.getItem(ASYNCSTORAGE_USER_USER_NAME).then(
              (userName) => {
                  if (userName !== null && userName.length !== 0) {
                    Actions.tabBar();
                  } else {
                    Actions.enterDetailsPage();
                  }
              }
            );
          }, 2000);
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
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <FadeInView>
          <Image
              source={require('./patang_white.png')}
              style={styles.image}
          />
        </FadeInView>
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
  signupPageUserTokenUpdate
})(SplashScreen);
