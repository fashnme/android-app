import { Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  SettingsPageAboutUsURL,
  SettingsPagePrivacyPolicyURL
} from '../URLS';

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

    default:
      break;
  }
  return { type: 'settingsPageRowPressed ' };
};
