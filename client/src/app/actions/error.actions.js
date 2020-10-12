import {
  RESET_ERRORS, 
  RESET_ERROR_MESSAGE
} from '../actions/types';

export const resetErrors = () => async (dispatch, getState) => {
  return dispatch({
    type: RESET_ERRORS,
    payload: {}
  })
}

export const resetErrorMessage = () => async (dispatch, getState) => {
  return dispatch({
    type: RESET_ERROR_MESSAGE,
  })
}