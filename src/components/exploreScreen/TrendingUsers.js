import React from 'react';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  celebrityPageVisitAndSetData as _celebrityPageVisitAndSetData
} from '../../actions';

const renderItem = ({ item, userToken, celebrityPageVisitAndSetData }) => {
  const { profilePic, userName, userId } = item;
  return (
    <TouchableOpacity onPress={() => { celebrityPageVisitAndSetData({ userToken, userId }); }}>
      <Card containerStyle={{ margin: 3, padding: 3, borderRadius: 5, marginHorizontal: 3 }}>
        <Image
          source={{ uri: profilePic }}
          style={{ height: 200, width: 127, borderRadius: 5 }}
        />
        <View>
          <Text style={{ alignSelf: 'center', color: '#808080', fontWeight: 'bold' }}>@{userName}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
// {
//   "profilePic": "https://p16-va-tiktok.ibyteimg.com/img/musically-maliva-obj/1619182472125446~c5_720x720.jpeg",
//   "userName": "demibagby",
//   "fullName": "demibagby",
//   "userId": "w70aj6"
// }
const TrendingUsers = ({ userToken, trendingUsers,
  celebrityPageVisitAndSetData }) => {
  return (
    <View style={styles.searchContainerView}>
      <Text style={styles.title}> Top Users </Text>
      <FlatList
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={trendingUsers}
        renderItem={({ item }) => renderItem({ item, userToken, celebrityPageVisitAndSetData })}
        style={{ borderRadius: 10, margin: 5 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainerView: {
    paddingTop: 0,
    paddingHorizontal: 8,
    marginTop: 10,
    borderRadius: 10
  },
  title: {
    fontWeight: 'bold',
    color: '#707070',
    marginLeft: 5,
    fontSize: 18,
  },
  searchContainer: {
    borderRadius: 15, margin: 5, padding: 0, marginHorizontal: 0, marginBottom: 0
  },
  containerStyle: {
    padding: 5, margin: 0
  }
});


const mapStateToProps = ({ personalPageState, explorePageState }) => {
    const { trendingUsers } = explorePageState;
    const { userToken } = personalPageState;
    return { userToken, trendingUsers };
};
export default connect(mapStateToProps, {
  celebrityPageVisitAndSetData: _celebrityPageVisitAndSetData
})(TrendingUsers);
