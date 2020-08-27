import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    addToCartButton: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    addToCartButtonText: {
        color: 'black',
    },
    buyNowButton: {
        padding: 10,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 2
    },
    buyNowButtonText: {
        color: 'white',
    },
    bidForRentButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'orange',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    bidForRentButtonTitle: {
        color: 'white'
    }
});
