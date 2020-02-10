import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import { SocialIcon, Icon } from 'react-native-elements';
import Share from 'react-native-share';

const socialOptions = [
    { icon: 'facebook', title: 'Facebook', options: { social: Share.Social.FACEBOOK } },
    { icon: 'instagram', title: 'Instagram', options: { social: Share.Social.INSTAGRAM } },
    { icon: 'instagram', title: 'Insta Story', options: { social: Share.Social.INSTAGRAM_STORIES, method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE } },
    { icon: 'whatsapp', title: 'Whatsapp', options: { social: Share.Social.WHATSAPP } },
    { icon: 'pinterest', title: 'Email', options: { social: Share.Social.PINTEREST } },
    { icon: 'envelope', title: 'Email', options: { social: Share.Social.EMAIL } },
    { icon: 'more', title: 'More', options: {} },

];

const getErrorString = (error, defaultValue) => {
    let e = defaultValue || 'Something went wrong. Please try again';
    if (typeof error === 'string') {
      e = error;
    } else if (error && error.message) {
      e = error.message;
    } else if (error && error.props) {
      e = error.props;
    }
    return e;
  };

const shareTo = async ({ postData, options }) => {
  const message = `Check ${postData.userName}'s Post'`;
  const filePath = '';
  const newOptions = { ...options, message, url: filePath };
  console.log('options', newOptions);
  try {
      const ShareResponse = await Share.shareSingle(newOptions);
      console.log(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', getErrorString(error));
    }
};

const CustomSocialIcon = ({ iconData, postData }) => {
  switch (iconData.icon) {
    case 'whatsapp': {
        return (
            <TouchableNativeFeedback onPress={() => shareTo({ postData, options: iconData.options })}>
                <View style={styles.iconObject}>
                    <Icon reverse name='whatsapp' type='font-awesome' color='#075E54' />
                    <Text style={styles.title}>{iconData.title}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    case 'more': {
        return (
            <TouchableNativeFeedback onPress={() => shareTo({ postData, options: iconData.options })}>
                <View style={styles.iconObject}>
                    <Icon reverse name='more-horizontal' type='feather' />
                    <Text style={styles.title}>{iconData.title}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    default: {
        return (
            <TouchableNativeFeedback onPress={() => shareTo({ postData, options: iconData.options })}>
                <View style={styles.iconObject}>
                    <SocialIcon type={iconData.icon} />
                    <Text style={styles.title}>{iconData.title}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
  }
};

const ShareList = ({ postData }) => {
    return (
        <View style={styles.body}>
            <View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={socialOptions}
                    keyExtractor={({ item }, index) => item + index.toString()}
                    renderItem={({ item }) => <CustomSocialIcon iconData={item} postData={postData} />}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 0.6,
        marginHorizontal: 10,
    },
    iconObject: {
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        opacity: 0.6,
      },
});

export default ShareList;
