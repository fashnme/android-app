import React from 'react';
import { View, Text, ScrollView, Dimensions, Image, Share } from 'react-native';
import { connect } from 'react-redux';
import { Header, Card, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { ANDROID_APP_SHARING_URL } from '../../types';

const screenWidth = Dimensions.get('window').width;
const rowWidth = screenWidth - 10;
const aspectRatio = 248 / 400; // Image's Height / Width

const shareApp = ({ userId }) => {
  const message = `Fashn.me\u000AUse my referal code & get Rs. 15 \u000A \u000A Dowload the App NOW \u000AAndroid:${ANDROID_APP_SHARING_URL} \u000A \u000A Referal Code: "${userId}"`;
  Share.share({
      message,
      title: 'Fashn.me: A Fashion Search & Recommendation Engine',
    }, {
      dialogTitle: 'Share With'
    })
    .then(result => {
      console.log('App Shared', result);
    })
    .catch(err => {
      console.log('App Sharing Error', err);
    });
};

const ReferAndEarnPage = ({ userId }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        backgroundColor={'white'}
        placement={'left'}
        leftComponent={{ icon: 'arrow-back', color: 'grey', onPress: () => Actions.pop() }}
        centerComponent={{ text: 'Refer And Earn', style: { color: 'grey', fontWeight: 'bold', fontSize: 17 } }}
        containerStyle={{ paddingTop: 0, height: 50 }}
      />
      <LinearGradient colors={['#FF4B2B', '#FF416C']} style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              title='MY EARNINGS'
              type="outline"
              onPress={() => Actions.rewardsPage()}
              titleStyle={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}
              buttonStyle={{ margin: 10, marginBottom: 0, borderColor: 'white', borderWidth: 1.5, padding: 4 }}
            />
          </View>
          <Card containerStyle={styles.cardContainer}>
            <Image
              style={styles.imageStyle}
              source={require('../../resources/background/refer-and-earn-screen.png')}
            />
          </Card>
          <Card containerStyle={styles.cardContainer}>
              <Text style={{ fontSize: 16, color: '#878b94', fontWeight: 'bold' }}> YOUR REFERRAL CODE </Text>
              <View style={styles.codeView}>
                <Text style={styles.codeText}>{` ${userId} `}</Text>
              </View>
              <Button
                raised
                onPress={() => shareApp({ userId })}
                ViewComponent={LinearGradient}
                title='REFER NOW'
                buttonStyle={{ borderRadius: 15, alignItems: 'center' }}
                icon={{ name: 'share-alt', type: 'font-awesome', size: 18, color: 'white' }}
                linearGradientProps={{
                  colors: ['#98DE5B', '#08E1AE'],
                  start: { x: 0.0, y: 0.5 },
                  end: { x: 1.0, y: 0.5 },
                }}
              />
          </Card>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = {
  imageStyle: { height: rowWidth * aspectRatio, width: rowWidth, borderRadius: 10 },
  codeText: { fontWeight: 'bold', fontSize: 18 },
  codeView: {
    borderWidth: 1,
    margin: 15,
    marginBottom: 30,
    borderStyle: 'dashed',
    alignItems: 'center',
    borderRadius: 1,
    borderColor: 'grey',
    backgroundColor: 'rgba(255, 65, 108,0.1)',
    padding: 10
  },
  cardContainer: {
    borderRadius: 10,
    justifyContent: 'space-around',
    margin: 4,
    borderWidth: 0,
    marginTop: 15,
    alignItems: 'center',
    padding: 0,
    height: rowWidth * aspectRatio,
    width: rowWidth,
  }
};
const mapStateToProps = ({ personalPageState }) => {
  const { personalUserDetails } = personalPageState;
  const { userId } = personalUserDetails;
  return { userId };
};
export default connect(mapStateToProps)(ReferAndEarnPage);