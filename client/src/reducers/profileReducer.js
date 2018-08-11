import { ADD_CURRENT_PROFILE, CLEAR_CURRENT_PROFILE } from '../actions/types';
import { userItems } from '../userItems/userItems';

const initialState = {
  currentProfile: {},
  profiles: userItems
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: {}
      };

    default:
      return state;
  }
}
