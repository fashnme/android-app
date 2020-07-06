import React, { Component } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
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
          }, 1000);
          this.props.signupPageUserTokenUpdate(userToken);
        } else {
          setTimeout(() => {
            Actions.signupPage();
          }, 1000);
        }
      }
    ).catch((error) => {
        console.log('User Token Fetching Error', error);
    });
  }

  render() {
    // console.log('Splash Screen Started Mishra Changed This FIle');
    return (
      <View style={{ backgroundColor: '#fff', resizeMode: 'cover', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FadeInView>
          <Image
              source={require('./patang_square.png')}
              style={styles.image}
          />
        </FadeInView>
      </View>
    );
  }
}


const styles = {
  image: {
        width: 192,
        height: 192,
        backgroundColor: '#fff'
  }
};

export default connect(null, {
  signupPageUserTokenUpdate
})(SplashScreen);
