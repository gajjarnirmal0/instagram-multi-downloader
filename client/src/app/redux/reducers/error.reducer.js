import { GET_ERRORS, RESET_ERRORS, RESET_ERROR_MESSAGE } from '../../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    case RESET_ERRORS:
      return {};

    case RESET_ERROR_MESSAGE:
      return {
        ...state,
        message: null
      }

    default:
      return state; // nothing is changed, and state is not updated
  }
}

// export default (state, action)
// initial state must always be defined

/**
 * filter, map, spread operator [...value], _.omit(state, 'age')
 */