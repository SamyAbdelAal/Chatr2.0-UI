import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannelMessages = channelID => {
  return dispatch => {
    instance
      .get(`channels/${channelID}/`)
      .then(res => res.data)
      .then(channel =>
        dispatch({
          type: actionTypes.FETCH_CHANNEL_MESSAGES,
          payload: channel
        })
      )
      .catch(err => console.error(err));
  };
};
