import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

import SplashScreen from './components/loginScreen/SplashScreen';
import HomePage from './components/HomePage';

// class TabIcon extends Component {
//   constructor(props) {
//     super(props);
//     this.iconsMap = {
//       home: { type: 'font-awesome', name: 'home', displayName: 'Home' },
//       search: { type: 'font-awesome', name: 'search', displayName: 'Search' },
//       reward: { type: 'font-awesome', name: 'rupee', displayName: 'Rewards' },
//       user: { type: 'entypo', name: 'user', displayName: 'Me' },
//       celeb: { type: 'foundation', name: 'graph-bar', displayName: 'Celebs' }
//     };
//   }
// render() {
//     const color = this.props.focused ? '#FF91AF' : '#c6c9cf';
//     // const backgroundColor = this.props.selected ? '#ff0000' : '#fff';
//     const iconName = this.props.iconName;
//     return (
//       <View style={{ boderRadius: 5 }}>
//         <Icon color={color} name={this.iconsMap[iconName].name} type={this.iconsMap[iconName].type} size={24} />
//         <Text style={{ color, fontWeight: 'bold', fontSize: 12 }}> {this.iconsMap[iconName].displayName} </Text>
//       </View>
//     );
//   }
// }

const RouterComponent = () => {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#fff' }}>
        <Scene key='root' hideNavBar>
            <Scene key='tabBar' tabs tabBarPosition="bottom" showLabel={false} tabBarStyle={styles.tabBarStyle} indicatorStyle={styles.indicatorStyle}>
                  <Scene hideNavBar key='home' title='Home' component={HomePage} tabStyle={styles.tabStyle} />
                  <Scene key='splashScreen' component={SplashScreen} />
            </Scene>
        </Scene>
      </Router>

    );
};

const windowWidth = Dimensions.get('window').width;
const tabWidth = windowWidth / 4;

const styles = {
  tabBarStyle: {
    flexDirection: 'row',
    height: 52,
    elevation: 2,
    alignItems: 'center'
  },
  tabStyle: {
    width: tabWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#45484f',
    position: 'absolute',
    width: '100%',
    left: 0
  },
  navigationBarStyle: {
    width: '100%',
    height: 30,
  },
  smallNavigationBar: {
    width: '100%',
    height: 20,
  }

};

// const searchEnter = () => {
//   console.log('Router Search Entry');
// };

export default RouterComponent;
