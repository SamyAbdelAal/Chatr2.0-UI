import * as actionTypes from "../actions/actionTypes";

const initialState = {
  messages: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNEL_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
