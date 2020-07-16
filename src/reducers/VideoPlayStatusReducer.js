import {
  VIDEO_PAGE_PLAY_STATUS_UPDATE
} from '../types';


const INITIAL_STATE = {
  homePageVideoPlay: false,
  celebPageVideoPlay: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case VIDEO_PAGE_PLAY_STATUS_UPDATE: {
        const { homePageVideoPlay, celebPageVideoPlay } = action.payload;
        return { ...state, homePageVideoPlay, celebPageVideoPlay };
      }

      default:
          return state;
    }
};
