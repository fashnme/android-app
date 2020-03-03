import React from 'react';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

const AvatarComp = ({ userId, userPic, onFollowPress, onProfileClick, followingDataMap }) => {
  // console.log('followingDataMap', followingDataMap);
  if (userId in followingDataMap) {
    return (
      <Avatar
        rounded
        source={{ uri: userPic }}
        size="medium"
        onPress={onProfileClick}
      />
    );
  }

  return (
    <Avatar
        rounded
        source={{ uri: userPic }}
        size="medium"
        showEditButton
        editButton={{
            name: 'add',
            color: 'white',
            size: 20,
            containerStyle: styles.editButtonContainer,
            onPress: onFollowPress
        }}
        onPress={onProfileClick}
    />
  );
};


const styles = {
  editButtonContainer: {
    backgroundColor: 'red',
    height: 25,
    width: 25,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: 'white',
  },
};

const mapStateToProps = ({ userActionData }) => {
    const { followingDataMap } = userActionData;
    return { followingDataMap };
};
export default connect(mapStateToProps)(AvatarComp);
