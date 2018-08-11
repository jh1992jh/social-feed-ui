import { ADD_CURRENT_PROFILE, CLEAR_CURRENT_PROFILE } from './types';

export const addCurrentProfile = currentProfile => dispatch => {
  dispatch({
    type: ADD_CURRENT_PROFILE,
    payload: currentProfile
  });
};

export const clearCurrentProfile = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_PROFILE
  });
};
