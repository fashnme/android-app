import React from 'react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const BlinkingVideoIcon = () => {
  const zoomOut = {
    0: {
      opacity: 0.8,
    },
    0.3: {
      opacity: 0.6,
    },
    0.5: {
      opacity: 0.4,
    },
    0.7: {
      opacity: 0.6,
    },
    1: {
      opacity: 0.8,
    }
    };
  return (
      <View style={[{ top: 10, left: 10 }]}>
        <Animatable.View animation={zoomOut} easing="ease-in-out" iterationCount="infinite" duration={1500}>
          <Image
            style={[{ width: 24, height: 24 }]}
            source={require('../../resources/icons/video.png')}
          />
        </Animatable.View>
      </View>
  );
};

export default BlinkingVideoIcon;
