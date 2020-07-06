import { Linking, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SettingsPageAboutUsURL,
  SettingsPagePrivacyPolicyURL
} from '../URLS';
import {
  ASYNCSTORAGE_USER_TOKEN_NAME,
  ASYNCSTORAGE_USER_USER_NAME
} from '../types';

export const settingsPageRowPressed = ({ key }) => {
  console.log('settingsPageRowPressed', key);
  switch (key) {
    case 'about':
      Linking.openURL(SettingsPageAboutUsURL)
      .catch(err => console.error("settingsPageRowPressed Coudn't Open the About Us Page", err));
      break;

    case 'privacy':
      Linking.openURL(SettingsPagePrivacyPolicyURL)
      .catch(err => console.error("settingsPageRowPressed Coudn't Open the About Us Page", err));
      break;

    case 'profile':
      Actions.editUserProfile();
      break;

    case 'orders':
      Actions.orders();
      break;

    case 'requests':
      Actions.bidRequests();
      break;

    case 'bag':
      Actions.manageCart();
      break;

    case 'wishlist':
      Actions.wishlistPage();
      break;

    case 'personalStore':
      Actions.personalStorePage();
      break;

    case 'rewards':
      Actions.rewardsPage();
      break;

    case 'refer':
      Actions.referAndEarnPage();
      break;

    case 'notify':
      Actions.notificationPage();
      break;

    default:
      break;
  }
  return { type: 'settingsPageRowPressed ' };
};

export const settingsPageLogoutPressed = () => {
  return (dispatch) => {
    AsyncStorage.removeItem(ASYNCSTORAGE_USER_TOKEN_NAME);
    BackHandler.exitApp();
    setUserName('');
    dispatch({ type: 'settingsPageLogoutPressed' });
  };
};

const setUserName = (userName) => {
  AsyncStorage.setItem(ASYNCSTORAGE_USER_USER_NAME, userName);
};
