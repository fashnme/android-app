import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  explorePageGetUserSearchResults as _explorePageGetUserSearchResults,
  celebrityPageVisitAndSetData as _celebrityPageVisitAndSetData
} from '../../actions';

// import {Autocomplete} from 'react-native-dropdown-autocomplete';

const renderItem = ({ item, userToken, celebrityPageVisitAndSetData }) => {
  const { profilePic, userName, fullName, userId } = item;
  if (profilePic === undefined) {
    return (
      <ListItem
        title={'No Results Found!'}
        titleStyle={[styles.title, { alignSelf: 'center' }]}
        containerStyle={[styles.containerStyle, { marginTop: 5, borderRadius: 15 }]}
      />
    );
  }
  return (
    <ListItem
      leftAvatar={{ source: { uri: profilePic }, size: 60 }}
      title={userName}
      titleStyle={styles.title}
      subtitle={fullName}
      containerStyle={styles.containerStyle}
      onPress={() => { celebrityPageVisitAndSetData({ userToken, userId }); }}
    />
  );
};

const filterData = ({ query, data, loading }) => {
  if (query.length === 0) {
    return [];
  }
  const newDat = data.filter((item) => {
    const itemData = item.userName ? item.userName.toUpperCase() : ''.toUpperCase();
    const textData = query.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  if (query.length % 2 !== 0 && newDat.length === 0 && loading === false) {
    return [{ noData: true }];
  }
  return newDat;
};

//   const data = [
//     {
//         "profilePic": "https://image.flaticon.com/icons/png/128/1807/1807934.png",
//         "userName": "nikhillgulati",
//         "fullName": "nikhillgulati",
//         "userId": "k84pe6"
//     }
// ];

const UserSearchBar = ({ userToken, userSearchResults,
  explorePageGetUserSearchResults, celebrityPageVisitAndSetData }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.searchContainerView}>
      <SearchBar
        placeholder="Search"
        platform={'android'}
        searchIcon={{ color: '#DB7093' }}
        onChangeText={(txt) => {
          setQuery(txt);
          if (txt.length % 2 !== 0) {
            setLoading(true);
            explorePageGetUserSearchResults({ query: txt, userToken, setLoading });
          }
        }}
        value={query}
        lightTheme
        round
        showLoading={loading}
        containerStyle={styles.searchContainer}
        loadingProps={{ color: '#DB7093' }}
        inputStyle={{ margin: 0, padding: 0, fontSize: 16 }}
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={filterData({ query, data: userSearchResults, loading })}
        renderItem={({ item }) => renderItem({ item, userToken, celebrityPageVisitAndSetData })}
        style={{ borderRadius: 5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainerView: {
    paddingTop: 0,
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 8,
  },
  title: {
    fontWeight: 'bold',
    opacity: 0.7
  },
  searchContainer: {
    borderRadius: 15, margin: 5, padding: 0, marginHorizontal: 0, marginBottom: 0, elevation: 1
  },
  containerStyle: {
    padding: 5, margin: 0
  }
});

// <Autocomplete
//   data={data}
//   valueExtractor={item => item}
//   style={styles.input}
//   minimumCharactersCount={2}
//   handleSelectItem={(item, id) => console.log('handleSelectItem', item, id)}
//   onDropdownClose={() => console.log('onDropdownClose')}
//   onDropdownShow={() => console.log('onDropdownShow')}
// />

const mapStateToProps = ({ personalPageState, explorePageState }) => {
    const { userSearchResults } = explorePageState;
    const { userToken } = personalPageState;
    return { userToken, userSearchResults };
};
export default connect(mapStateToProps, {
  explorePageGetUserSearchResults: _explorePageGetUserSearchResults,
  celebrityPageVisitAndSetData: _celebrityPageVisitAndSetData
})(UserSearchBar);
