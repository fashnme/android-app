import React, { Component } from 'react';
import { StyleSheet, View, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;

class PostScreen extends Component {
    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="dark-content" />
                    <Header
                    backgroundColor="white"
                    leftComponent={{ icon: 'arrow-left', type: 'font-awesome', color: 'black', onPress: () => this.props.onBackPress() }}
                    centerComponent={{ text: 'Post', style: { color: 'black', fontSize: 20 } }}
                    rightComponent={{ icon: 'delete', color: 'black', onPress: () => this.props.onBackPress() }}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, }}>
                        <Image style={{ height: 400, width: screenWidth - 20, borderRadius: 5, }} resizeMode="contain" source={{ uri: this.props.dataUri }} />
                    </View>
                    <View style={{ margin: 10 }}>
                    <Input
                        placeholder="Add a caption"
                        multiline
                        value={this.props.caption}
                        onChangeText={(text) => this.props.updateCaption(text)}
                        numberOfLines={4}
                        inputStyle={{ height: 100 }}
                        maxLength={280}
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                    />
                    <View style={{ margin: 20, alignItems: 'center' }}>
                        <View style={{ width: 200 }}>
                            <Button title="Post" onPress={() => console.log('Post button pressed')} raised />
                        </View>
                    </View>
                </View>
                </View>
            </ScrollView>
          );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5
      },
      inputContainerStyle: {
        backgroundColor: '#fff',
        height: 100,
        borderRadius: 10,
        borderColor: 'rgba(0,0,0,0.5)', // Color of border
        elevation: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
      }    
});

export default PostScreen;
