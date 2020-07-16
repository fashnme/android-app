import {
  VIDEO_PAGE_PLAY_STATUS_UPDATE
} from '../types';

export const videoPagePlayStatusUpdate = ({ homePageVideoPlay, celebPageVideoPlay }) => {
  return { type: VIDEO_PAGE_PLAY_STATUS_UPDATE, payload: { homePageVideoPlay, celebPageVideoPlay } };
};
