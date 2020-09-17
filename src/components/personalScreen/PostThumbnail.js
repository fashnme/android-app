import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Icon, Overlay, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import {
  homePageSharePost as _homePageSharePost
} from '../../actions';

const WINDOW_WIDTH = Dimensions.get('window').width;
const ASSPECT_RATIO = 3 / 4;
const THUMBNAIL_WIDTH = WINDOW_WIDTH / 3;

const confirmDeletePressed = ({ onDeletePress }) => {
  Alert.alert(
   'Delete the Post',
   'Are you Sure?', [{
       text: 'No',
       onPress: () => {},
       style: 'cancel'
   }, {
       text: 'Yes',
       onPress: onDeletePress
   }], {
       cancelable: true
   }
);
};

const ShowPostOptions = ({ showOptions, item, personalUserId, onDeletePress, setShowOptions, homePageSharePost }) => {
  return (
    <Overlay
      isVisible={showOptions}
      overlayStyle={{ borderRadius: 15, padding: 0, elevation: 10 }}
      width={'80%'}
      height={'40%'}
      animationType={'slide'}
      windowBackgroundColor={'rgba(255,255,255,0.5)'}
      onBackdropPress={() => setShowOptions(false)}
    >
    <View style={{ justifyContent: 'space-around', flexDirection: 'column', flex: 1 }}>
      <View style={{ width: '50%', alignSelf: 'center' }}>
        <Button
          raised
          iconRight
          containerStyle={{ marginTop: 10 }}
          title={'Share Post'}
          titleStyle={{ margin: 5, fontWeight: 'bold', fontSize: 16 }}
          icon={{ name: 'share', size: 20, color: 'white', type: 'font-awesome' }}
          ViewComponent={LinearGradient}
          buttonStyle={{ borderRadius: 8, margin: 0 }}
          linearGradientProps={{
            colors: ['#00d8c0', '#00c0a8', '#00a890'],
            start: { x: 1.0, y: 0.0 },
            end: { y: 1.0, x: 1.0 },
          }}
          onPress={() => { homePageSharePost({ postData: item, referrerId: personalUserId }); setShowOptions(false); }}
        />
        </View>
        <View style={{ width: '50%', alignSelf: 'center' }}>
          <Button
            containerStyle={{ marginTop: 0, padding: 0 }}
            title={'Delete Post'}
            type={'outline'}
            titleStyle={{ margin: 1, color: 'red' }}
            icon={{ name: 'trash', size: 20, color: 'red', type: 'font-awesome' }}
            iconRight
            buttonStyle={{ borderRadius: 15, borderColor: 'red', paddingHorizontal: 10 }}
            onPress={() => { confirmDeletePressed({ onDeletePress }); setShowOptions(false); }}
          />
        </View>
      </View>
    </Overlay>
  );
};


// confirmDeletePressed({ onDeletePress }) : () => console.log('Cannot press')
const PostThumbnail = ({ imageUri, likes, item, mediaType, onPress, showDeleteIcon, onDeletePress, personalUserId, homePageSharePost }) => {
  const [showOptions, setShowOptions] = useState(false);
  if (mediaType === 'video') {
    return (
      <TouchableOpacity onPress={onPress} onLongPress={showDeleteIcon ? () => setShowOptions(true) : () => {}}>
        <View style={styles.postThumbnail}>
          <Image style={styles.postThumbnailImage} source={{ uri: imageUri }} />
          <View style={styles.postDetails}>
              <Icon
                name="md-play-circle"
                type="ionicon"
                color="white"
                containerStyle={{ opacity: 1, marginTop: 5 }}
                size={24}
                // onPress={() => confirmDeletePressed({ onDeletePress })}
                underlayColor={'white'}
                // raised
              />
          </View>
        </View>
        <ShowPostOptions
          showOptions={showOptions}
          onDeletePress={onDeletePress}
          setShowOptions={setShowOptions}
          homePageSharePost={homePageSharePost}
          item={item}
          personalUserId={personalUserId}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} onLongPress={showDeleteIcon ? () => setShowOptions(true) : () => {}}>
      <View style={styles.postThumbnail}>
        <Image style={styles.postThumbnailImage} source={{ uri: imageUri }} />
        <View style={[styles.postDetailsImage]}>
            <Icon
              name="heart"
              type="font-awesome"
              color="white"
              containerStyle={{ opacity: 0.8, marginTop: 5, elevation: 50 }}
              size={14}
            />
            <Text style={styles.postThumbnailText}> {likes}</Text>
        </View>
      </View>
      <ShowPostOptions
        showOptions={showOptions}
        onDeletePress={onDeletePress}
        setShowOptions={setShowOptions}
        homePageSharePost={homePageSharePost}
        item={item}
        personalUserId={personalUserId}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postThumbnail: {
    height: THUMBNAIL_WIDTH / ASSPECT_RATIO,
    width: THUMBNAIL_WIDTH,
    padding: 3,
  },
  postThumbnailImage: {
    flex: 1,
  },
  postDetails: {
    position: 'absolute',
    top: 3,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postDetailsImage: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postThumbnailText: {
    color: 'white',
    opacity: 0.8,
  },
});

const mapStateToProps = ({ personalPageState }) => {
  // const { userToken } = personalPageState;
  const { personalUserId } = personalPageState;

  return { personalUserId };
};

export default connect(mapStateToProps, {
  homePageSharePost: _homePageSharePost
})(PostThumbnail);
