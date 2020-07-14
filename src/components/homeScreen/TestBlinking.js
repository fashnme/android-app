// import React, { Component } from 'react';
// import { View, Image, LayoutAnimation } from 'react-native';
// import { FadeInView } from '../basic';
//
// class TestBlinking extends Component {
//   constructor() {
//     super();
//     this.state = {
//       visible: true
//     };
//   }
//   componentDidMount() {
//     LayoutAnimation.spring();
//     this.interval = setInterval(() => {
//       this.setState({ visible: !this.state.visible });
//     }, 2000);
//   }
//
//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }
//
//   renderVideoIcon() {
//     return (
//         <View style={[{ top: 10, left: 10 }]}>
//         <FadeInView>
//           <Image
//             style={[{ width: 20, height: 20 }]}
//             source={require('../../resources/icons/video.png')}
//           />
//         </FadeInView>
//         </View>
//     );
//   }
//
//   render() {
//     if (this.state.visible) {
//       return this.renderVideoIcon();
//     }
//     return <View />;
//   }
// }
//
// export default TestBlinking;
