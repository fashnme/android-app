import {

} from '../types';

const INITIAL_STATE = {
  userToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiUERvNWdtOEJNZ0tZWjFQNFlobFoiLCJpYXQiOjE1Nzg0ODgzODF9.f_0FHHWMZ1Javvvmtl72yO5m_1pICYjggYZA0-ccFQM',
  personalUserId: 'PDo5gm8BMgKYZ1P4YhlZ'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
          return state;
    }
};
