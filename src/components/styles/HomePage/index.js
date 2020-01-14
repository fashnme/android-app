import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        flex: 1,
        paddingTop: 20,
    },
    postActionsOptions: {
    },
    followTabs: { 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    userDetails: { 
        flexDirection: 'column',
        marginBottom: 60,
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 4,
    },
    userName: {
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 4,
        fontWeight: 'bold',
        fontSize: 16
    },
    postCaption: {
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 4,
        fontSize: 16,
        width: '65%'
    },
    followTabsItem: {
        color: 'white',
        fontSize: 24,
        padding: 10,
        textShadowColor: 'black',
        textShadowRadius: 4,
        opacity: 0.8
    },
    selectedTab: {
        opacity: 1,
        fontWeight: 'bold',
    }
});
