import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {
  SETTING_PAGE_SET_RENT_BID_FOR_ME,
  SETTING_PAGE_GENERAL_LOADING_TOGGLE,
} from '../types';

import {
  SettingsPageRejectBidURL,
  SettingsPageAcceptBidURL
} from '../URLS';

export const bidsPageAcceptBid = ({ bidId, price, size, ownerAddress, securityAmount, ownerMessage, userToken }) => {
  console.log('bidsPageAcceptBid', { bidId, price, size, ownerAddress, securityAmount, ownerMessage });
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
    axios({
        method: 'post',
        url: SettingsPageAcceptBidURL,
        headers,
        data: { bidId, price, size, ownerAddress, securityAmount, ownerMessage }
        })
        .then((response) => {
            const { bids } = response.data;
            if (typeof bids !== 'undefined') {
              dispatch({ type: SETTING_PAGE_SET_RENT_BID_FOR_ME, payload: bids });
            }
            Actions.bidsForMe();
            console.log('bidsPageAcceptBid', response.data);
        })
        .catch((error) => {
            console.log('bidsPageAcceptBid Actions Error ', error);
        })
        .finally(() => {
            dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: false });
        });
  };
};

// Reject the Bid
export const bidsPageRejectBid = ({ bidId, reason, feedback, userToken }) => {
  // console.log('bidsPageRejectBid', { bidId, reason, feedback, userToken });
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
    axios({
        method: 'post',
        url: SettingsPageRejectBidURL,
        headers,
        data: { bidId, ownerRejectionReason: reason, ownerFeedback: feedback }
        })
        .then((response) => {
            const { bids } = response.data;
            if (typeof bids !== 'undefined') {
              dispatch({ type: SETTING_PAGE_SET_RENT_BID_FOR_ME, payload: bids });
            }
            Actions.bidsForMe();
            console.log('bidsPageRejectBid', response.data);
        })
        .catch((error) => {
            console.log('bidsPageRejectBid Actions Error ', error);
        })
        .finally(() => {
            dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: false });
        });
  };
};
