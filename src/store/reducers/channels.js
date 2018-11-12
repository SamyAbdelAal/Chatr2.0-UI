import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels: [],
  channel: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNELS:
      return {
        ...state,
        channels: action.payload
      };
    case actionTypes.RESET_CHANNELS:
      return {
        ...state,
        channels: []
      };
    case actionTypes.POST_CHANNEL:
      return {
        ...state,
        channels: state.channels.concat(action.payload)
      };
    case actionTypes.FETCH_CHANNEL:
      return {
        ...state,
        channel: state.channels.find(channel => channel.id == action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
