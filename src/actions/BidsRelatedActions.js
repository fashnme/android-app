import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {
  SETTING_PAGE_SET_RENT_BID_FOR_ME,
  SETTING_PAGE_SET_RENT_BID_BY_ME,
  SETTING_PAGE_GENERAL_LOADING_TOGGLE,
} from '../types';

import {
  SettingsPageRejectBidURL,
  SettingsPageAcceptBidURL,
  SettingsPageCancelBidURL,
  SettingsPageCreateBidURL
} from '../URLS';

// Accept a Bid
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


// Cancel a Bid
export const bidsPageCancelBid = ({ bidId, reason, feedback, userToken }) => {
  // console.log('bidsPageCancelBid', { bidId, reason, feedback, userToken });
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
    axios({
        method: 'post',
        url: SettingsPageCancelBidURL,
        headers,
        data: { bidId, bidderRejectionReason: reason, bidderFeedback: feedback }
        })
        .then((response) => {
            const { bids } = response.data;
            if (typeof bids !== 'undefined') {
              dispatch({ type: SETTING_PAGE_SET_RENT_BID_BY_ME, payload: bids });
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


// Create Bid by Users
export const bidsPageCreateBid = (item) => {
  const { postId, posterId, startDate, endDate, amount, userToken,
    deliveryAddress, refProductId, comment } = item;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: userToken
  };
  return (dispatch) => {
    dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: true });
    axios({
        method: 'post',
        url: SettingsPageCreateBidURL,
        headers,
        data: { postId, posterId, startDate, endDate, amount, deliveryAddress, refProductId, comment }
        })
        .then((response) => {
            const { bids } = response.data;
            if (typeof bids !== 'undefined') {
              dispatch({ type: SETTING_PAGE_SET_RENT_BID_BY_ME, payload: bids });
            }
            Actions.pop();
            console.log('bidsPageCreateBid', response.data);
        })
        .catch((error) => {
            console.log('bidsPageCreateBid Actions Error ', error);
        })
        .finally(() => {
            dispatch({ type: SETTING_PAGE_GENERAL_LOADING_TOGGLE, payload: false });
        });
  };
};
