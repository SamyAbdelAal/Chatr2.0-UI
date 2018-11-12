import * as actionTypes from "../actions/actionTypes";

const initialState = {
  messages: [],
  filteredMessages: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNEL_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case actionTypes.POST_MESSSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload)
        // message: {
        //   ...state.message,
        //   message: action.payload
        // }
      };
    case actionTypes.FILTER_MESSAGES:
      return {
        ...state,
        filteredMessages: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
