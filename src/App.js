import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { parse, stringify } from 'flatted';
import { PersistGate } from 'redux-persist/integration/react';

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

// Original Class Component
// class App extends Component {
//     render() {
//       const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
//       return (
//           <Provider store={store}>
//             <Router />
//           </Provider>
//       );
//     }
// }

export const transformCircular = createTransform(
    (inboundState, key) => stringify(inboundState),
    (outboundState, key) => parse(outboundState),
);


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // stateReconciler: autoMergeLevel2,
  whitelist: ['userActionData', 'personalPageState', 'notificationState', 'explorePageState'],
  transforms: [transformCircular]
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
