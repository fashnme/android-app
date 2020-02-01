import React from 'react';
import { View, FlatList } from 'react-native';
import UserDetailsComp from './celebScreen/UserDetailsComp';
import UserPostsComp from './celebScreen/UserPostsComp';

const CelebrityPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        listKey={'mainList'}
        ListHeaderComponent={<UserDetailsComp />}
        ListFooterComponent={<UserPostsComp />}
        data={['']}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => {}}
      />
    </View>
  );
};

export default CelebrityPage;
