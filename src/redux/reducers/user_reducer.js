import { SET_USER } from './../actions/types';

const initialUserState = {
  currentUser: null,
};

export default function (state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
