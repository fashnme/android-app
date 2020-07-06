import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';

// import messaging, { firebase } from '@react-native-firebase/messaging';
  // Get FCM TOKEN
  // const getFcmToken = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //
  //   if (enabled) {
  //     const fcmToken = await messaging().getToken();
  //       if (fcmToken) {
  //         console.log(fcmToken);
  //         console.log("Your Firebase Token is:", fcmToken);
  //       } else {
  //         console.log("Failed", "No token received");
  //       }
  //     }
  //   };

  // Notification IN FOREGROUND
  // firebase.messaging().onMessage((message) => {
  //   // put your logic to process message
  //   console.log('hey this message is logged when  app is in foreground', message);
  // });
  //

// Notification IN QUIT STATE
//   messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//           if (remoteMessage) {
//             console.log(
//               'Notification caused app to open from quit state:',
//               remoteMessage,
//             );
//           }
// });

// Notification IN BACKGROUND STATE
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//           console.log('Message handled in the background!', remoteMessage);
// });

class App extends Component {
    render() {
      const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
      return (
          <Provider store={store}>
            <Router />
          </Provider>
      );
    }
}

export default App;
