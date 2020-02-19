import React, { Component } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ASYNCSTORAGE_USER_TOKEN_NAME } from '../../types';
// import {
//   loginPageUserTokenUpdate
// } from '../../actions';
import { FadeInView } from '../basic';

class SplashScreen extends Component {
  componentDidMount() {
    AsyncStorage.getItem(ASYNCSTORAGE_USER_TOKEN_NAME).then(
      (userToken) => {
        if (userToken) {
          setTimeout(() => {
            // Actions.tabBar();
          }, 1500);
          this.props.loginPageUserTokenUpdate(userToken);
        } else {
          setTimeout(() => {
            // Actions.loginPage();
          }, 2000);
        }
      }
    ).catch((error) => {
        console.log('User Token Fetching Error', error);
    });
  }

  render() {
    console.log('Splash Screen Started Mishra Changed This FIle');
    return (
      <View style={{ backgroundColor: '#fff', resizeMode: 'cover', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FadeInView>
          <Image
              source={require('./fashn_square.png')}
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

})(SplashScreen);
