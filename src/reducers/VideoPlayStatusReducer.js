import {
  VIDEO_PAGE_PLAY_STATUS_UPDATE
} from '../types';


const INITIAL_STATE = {
  homePageVideoPlay: false,
  celebPageVideoPlay: false,
  previousState: { homePageVideoPlay: false, celebPageVideoPlay: false } // Holds the previous State
  // So, when app comes in foreground from background, the values resetted
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case VIDEO_PAGE_PLAY_STATUS_UPDATE: {
        const { homePageVideoPlay, celebPageVideoPlay } = action.payload;

        const previousState = { homePageVideoPlay: state.homePageVideoPlay, celebPageVideoPlay: state.celebPageVideoPlay };
        return { ...state, homePageVideoPlay, celebPageVideoPlay, previousState };
      }

      default:
          return state;
    }
};
