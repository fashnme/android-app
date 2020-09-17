import axios from 'axios';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  SETTING_PAGE_GENERAL_LOADING_TOGGLE
} from '../types';

import {
  OrdersPageCancelReturnOrderURL
} from '../URLS';

// Cancel or Return a ORDER
export const ordersPageCancelReturnOrder = ({ orderId, productId, reason, feedback, userToken }) => {
  const headers = { 'Content-Type': 'application/json', Authorization: userToken };
  const cancellationMessage = `${reason}, ${feedback}`;
  console.log('ordersPageCancelReturnOrder', { orderId, productId, cancellationMessage, feedback });
  return (dispatch) => {
    dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
    axios({
        method: 'post',
        url: OrdersPageCancelReturnOrderURL,
        headers,
        data: { orderId, productId, cancellationMessage, feedback }
        })
        .then((response) => {
            console.log('ordersPageCancelReturnOrder resp', response.data);
            Alert.alert('Order Cancelled', 'Your order is cancelled', [{ style: 'cancel' }, { text: 'Ok' }], { cancelable: true });
        })
        .catch((error) => {
            console.log('ordersPageCancelReturnOrder Actions Error ', error);
            Alert.alert('Error', 'Unable cancel the Order, Please try after some time', [{ style: 'cancel' }, { text: 'Ok' }], { cancelable: true });
      }).finally(() => {
        Actions.pop();
        dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: false });
      });
  };
};
