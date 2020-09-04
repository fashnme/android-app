import {
} from '../types';


const INITIAL_STATE = {
  // Settings Page
  settingsArray: [
    { key: 'accountHeading', type: 'heading', title: 'Account' },
    { key: 'profile', type: 'edit', title: 'Hello User', subtitle: 'Edit Profile', avatarSource: 'https://image.flaticon.com/icons/png/128/660/660610.png' },
    // { key: 'orders', type: 'chevron', title: 'Orders', subtitle: 'Check your Order Details', avatarSource: 'https://image.flaticon.com/icons/png/128/2580/2580666.png' },
    { key: 'orders', type: 'chevron', title: 'Orders', subtitle: 'Check your Order Details', avatarSource: require('../resources/settingsIcon/orders.png') },
    { key: 'bag', type: 'chevron', title: 'Shopping Bag', subtitle: 'Check your Bag', avatarSource: require('../resources/settingsIcon/shopping_bag.png') },
    { key: 'requests', type: 'badge', title: 'Requests', subtitle: 'Users loved your style', avatarSource: require('../resources/settingsIcon/requests.png') },
    { key: 'personalStore', type: 'chevron', title: 'Store', subtitle: 'Your Personal Store', avatarSource: require('../resources/settingsIcon/personal_store.png') },
    { key: 'wishlist', type: 'chevron', title: 'Wishlist', subtitle: 'Your Wishlist Store', avatarSource: require('../resources/settingsIcon/wishlist.png') },
    { key: 'notify', type: 'badge', title: 'Notification', subtitle: 'Alerts', avatarSource: require('../resources/settingsIcon/notify.png') },
    { key: 'rewardsHead', type: 'heading', title: 'Rewards' },
    { key: 'rewards', type: 'chevron', title: 'Rewards', subtitle: "You've Earned", avatarSource: require('../resources/settingsIcon/reward.png') },
    { key: 'refer', type: 'chevron', title: 'Refer & Earn', subtitle: 'Get 50 Coins for every Refer', avatarSource: require('../resources/settingsIcon/cash.png') },
    { key: 'aboutHead', type: 'heading', title: 'Others' },
    { key: 'about', type: 'chevron', title: 'About Us', subtitle: 'Know more About us', avatarSource: require('../resources/settingsIcon/info.png') },
    { key: 'privacy', type: 'chevron', title: 'Privacy Policy', subtitle: "You're safe with us", avatarSource: require('../resources/settingsIcon/secure.png') },
  ]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
          return state;
    }
};

// settingsArray: [
//   { key: 'accountHeading', type: 'heading', title: 'Account' },
//   { key: 'profile', type: 'edit', title: 'Hello User', subtitle: 'Edit Profile', avatarSource: 'https://image.flaticon.com/icons/png/128/660/660610.png' },
//   // { key: 'orders', type: 'chevron', title: 'Orders', subtitle: 'Check your Order Details', avatarSource: 'https://image.flaticon.com/icons/png/128/2580/2580666.png' },
//   { key: 'orders', type: 'chevron', title: 'Orders', subtitle: 'Check your Order Details', avatarSource: 'https://image0.flaticon.com/icons/png/128/214/214305.png' },
//   { key: 'bag', type: 'chevron', title: 'Shopping Bag', subtitle: 'Check your Bag', avatarSource: 'https://image.flaticon.com/icons/png/128/825/825561.png' },
//   { key: 'requests', type: 'badge', title: 'Requests', subtitle: 'Users loved your style', avatarSource: 'https://image.flaticon.com/icons/png/128/1060/1060700.png' },
//   { key: 'personalStore', type: 'chevron', title: 'Store', subtitle: 'Your Personal Store', avatarSource: 'https://image.flaticon.com/icons/png/128/1804/1804467.png' },
//   { key: 'wishlist', type: 'chevron', title: 'Wishlist', subtitle: 'Your Wishlist Store', avatarSource: 'https://image.flaticon.com/icons/png/128/1300/1300478.png' },
//   { key: 'notify', type: 'badge', title: 'Notification', subtitle: 'Alerts', avatarSource: 'https://image.flaticon.com/icons/png/128/682/682032.png' },
//   { key: 'rewardsHead', type: 'heading', title: 'Rewards' },
//   { key: 'rewards', type: 'chevron', title: 'Rewards', subtitle: "You've Earned", avatarSource: 'https://image.flaticon.com/icons/png/512/321/321773.png' },
//   { key: 'refer', type: 'chevron', title: 'Refer & Earn', subtitle: 'Get 50 Coins for every Refer', avatarSource: 'https://image.flaticon.com/icons/png/128/845/845823.png' },
//   { key: 'aboutHead', type: 'heading', title: 'Others' },
//   { key: 'about', type: 'chevron', title: 'About Us', subtitle: 'Know more About us', avatarSource: 'https://image.flaticon.com/icons/png/128/2486/2486375.png' },
//   { key: 'privacy', type: 'chevron', title: 'Privacy Policy', subtitle: "You're safe with us", avatarSource: 'https://image.flaticon.com/icons/png/128/2550/2550400.png' },
// ]
