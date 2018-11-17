import * as actionTypes from "../actions/actionTypes";

const initialState = {
  messages: [],
  filteredMessages: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNEL_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false
      };
    case actionTypes.POST_MESSSAGE:
      return {
        ...state
        //  messages: state.messages.concat(action.payload)
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
    case actionTypes.SET_MESSAGES_LOADING:
      console.log(true);
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
