import React from 'react';
import { View, Text, Image, Linking, BackHandler } from 'react-native';
import { Button, Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

const CamNotAuthView = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(255,255,255, 0.5)' }}>
    <Card containerStyle={{ elevation: 50, borderRadius: 10 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={{ uri: 'https://image.flaticon.com/icons/png/512/2448/2448871.png' }}
            style={{ height: 150, width: 150 }}
          />
        </View>
        <View>
          <Text style={styles.title}> Unable to Access Camera </Text>
          <Text style={styles.subtitle}> To capture photos and videos, allow us access to your camera </Text>
        </View>
        <View style={{}}>
          <Button
            title={'Not Now'}
            type={'outline'}
            titleStyle={{ margin: 1, color: 'red' }}
            buttonStyle={{ borderRadius: 15, margin: 0, borderColor: 'red', marginTop: 15, marginBottom: 15 }}
            onPress={() => { Actions.home(); }}
          />
          <Button
            raised
            title={'Allow Camera'}
            titleStyle={{ margin: 3, fontWeight: 'bold' }}
            ViewComponent={LinearGradient}
            buttonStyle={{ borderRadius: 15, margin: 0 }}
            linearGradientProps={{
              colors: ['#98DE5B', '#08E1AE'],
              start: { x: 0.0, y: 0.5 },
              end: { x: 1.0, y: 0.5 },
            }}
            onPress={() => { BackHandler.exitApp(); Linking.openSettings(); }}
          />
        </View>
    </Card>
    </View>
  );
};

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a4747',
    marginTop: 10,
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center',
    color: '#4a4747',
    marginTop: 10
  }
};

export { CamNotAuthView };
