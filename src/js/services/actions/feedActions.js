import { START_FEED_CONNECTION, CLOSE_FEED_CONNECTION } from "./actionTypes";

export const startFeedConnection = (messages) => {
  return {
    type: START_FEED_CONNECTION,
    payload: { messages },
  };
};

export const closeFeedConnection = () => {
  return {
    type: CLOSE_FEED_CONNECTION,
  };
};
