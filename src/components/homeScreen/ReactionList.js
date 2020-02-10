import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

const CustomSocialIcon = ({ iconData, action }) => {
    return (
        <TouchableNativeFeedback onPress={action}>
            <View style={styles.iconObject}>
                <View style={styles.iconStyle}>
                    <Icon size={30} name={iconData.icon} type={iconData.iconType} />
                </View>
                <Text style={styles.title}>{iconData.title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const ReactionList = ({ reactionOptions }) => {
    return (
        <View style={styles.body}>
            <View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={({ item }, index) => item + index.toString()}
                    data={reactionOptions}
                    renderItem={({ item }) => <CustomSocialIcon title={item} iconData={item} action={() => console.log(item, 'is pressed')} />}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    iconStyle: {
        backgroundColor: '#EAF0F1',
        borderRadius: 40,
        padding: 10,
    }
});

export default ReactionList;
