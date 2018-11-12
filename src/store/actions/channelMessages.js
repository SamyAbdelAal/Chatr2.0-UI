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
      .then(message =>
        dispatch({
          type: actionTypes.FETCH_CHANNEL_MESSAGES,
          payload: message
        })
      )
      .catch(err => console.error(err));
  };
};

export const postMessage = (message, channelID) => {
  return dispatch => {
    instance
      .post(`/channels/${channelID}/send/`, message)
      .then(res => res.data)
      .then(createdMessage =>
        dispatch({
          type: actionTypes.POST_MESSSAGE,
          payload: createdMessage
        })
      );
    // .catch(error => console.error(error.response.data));
  };
};

export const filterMessages = (channelID, timeStamp) => {
  return dispatch => {
    instance
      .get(`channels/${channelID}/?latest=${timeStamp}`)
      .then(res => res.data)
      .then(channelMessages =>
        dispatch({
          type: actionTypes.FILTER_MESSAGES,
          payload: channelMessages
        })
      );
    // .catch(err => console.error(err));
  };
};
