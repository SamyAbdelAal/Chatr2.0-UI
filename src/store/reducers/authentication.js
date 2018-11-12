import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null
};

const reducer = (state = initialState, action) => {
  const links = [
    "https://i.imgur.com/wDVsrWn.png",
    "https://i.imgur.com/xRlqHvl.png",
    "https://i.imgur.com/624x0Qs.png",
    "https://i.imgur.com/m3GdkRH.png",
    "https://i.imgur.com/SbpUQYM.png",
    "https://i.imgur.com/9V1TH2U.png",
    "https://i.imgur.com/N36oxEB.png",
    "https://i.imgur.com/Mwj8Dj1.png",
    "https://i.imgur.com/bOae9oj.png",
    "https://i.imgur.com/EDjffPt.png"
  ];
  let rand = Math.floor(Math.random() * 10);
  if (state.user) state.user.image = links[rand];
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
