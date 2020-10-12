import {
  DOWNLOAD_SET_DATA,
  DOWNLOAD_CLEAR_DATA,
  DOWNLOAD_LINK_ADD,
} from '../../actions/types';

import {
  addLinkToDownloads,
  setLinkToDownloads
} from "./download.utils";

const initialState = {
  loading: false,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {

    case DOWNLOAD_SET_DATA:
      return {
        ...state,
        data: setLinkToDownloads(action.payload),
      }

    case DOWNLOAD_LINK_ADD:
      return {
        ...state,
        data: addLinkToDownloads(state.data, action.payload),
        loading: false,
      }

    case DOWNLOAD_CLEAR_DATA:
      return {
        ...state,
        data: [],
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