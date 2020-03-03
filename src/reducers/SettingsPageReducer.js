import {
} from '../types';


const INITIAL_STATE = {
  // Settings Page
  settingsArray: [
    { key: 'accountHeading', type: 'heading', title: 'Account' },
    { key: 'profile', type: 'edit', title: 'Pawan Mishra', subtitle: 'Edit Profile', avatarUrl: 'https://bit.ly/37EGn7n' },
    { key: 'orders', type: 'chevron', title: 'Orders', subtitle: 'Check your Order Details', avatarUrl: 'https://image.flaticon.com/icons/png/128/2580/2580666.png' },
    { key: 'bag', type: 'chevron', title: 'Shopping Bag', subtitle: 'Check your Bag', avatarUrl: 'https://image.flaticon.com/icons/png/128/743/743007.png' },
    { key: 'requests', type: 'badge', title: 'Requests', subtitle: 'People loves your style', avatarUrl: 'https://image.flaticon.com/icons/png/128/1060/1060700.png' },
    { key: 'store', type: 'chevron', title: 'Store & Wishlist', subtitle: 'Your Personal Store', avatarUrl: 'https://image0.flaticon.com/icons/png/128/582/582876.png' },
    { key: 'wishlist', type: 'chevron', title: 'Wishlist', subtitle: 'Your Wishlist Store', avatarUrl: 'https://image0.flaticon.com/icons/png/128/582/582876.png' },
    { key: 'notify', type: 'badge', title: 'Notification', subtitle: 'Alerts', avatarUrl: 'https://image.flaticon.com/icons/png/128/1827/1827370.png' },
    { key: 'rewardsHead', type: 'heading', title: 'Rewards' },
    { key: 'rewards', type: 'chevron', title: 'Rewards', subtitle: "You've Earned", avatarUrl: 'https://image.flaticon.com/icons/png/512/321/321773.png' },
    { key: 'refer', type: 'chevron', title: 'Refer & Earn', subtitle: 'Get Rs. 15 for every Refer', avatarUrl: 'https://image.flaticon.com/icons/png/128/458/458254.png' },
    { key: 'aboutHead', type: 'heading', title: 'Others' },
    { key: 'about', type: 'chevron', title: 'About Us', subtitle: 'Know more About us', avatarUrl: 'https://image.flaticon.com/icons/png/128/2486/2486375.png' },
    { key: 'privacy', type: 'chevron', title: 'Privacy Policy', subtitle: "You're safe with us", avatarUrl: 'https://image.flaticon.com/icons/png/128/2550/2550400.png' },
  ]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
          return state;
    }
};
