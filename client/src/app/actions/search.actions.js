import Validator from 'validator';

import CONFIG_APP from '../config/app';
import apiRequest from '../api/apiRequest';
import { resolveError } from '../utils/errorActionHelper';
// import SearchValidate from './search.validator';
import {
  DOWNLOAD_SET_DATA,
  DOWNLOAD_CLEAR_DATA,
  DOWNLOAD_LINK_ADD,
  GET_ERRORS,
} from '../actions/types';

// export const fetchDataValidator = (data, history) => async (dispatch, getState) => {
//   const errors = SearchValidate(data);
//   dispatch(resolveError({ errorObject: errors }));
// }

export const fetchData = (data, history) => async (dispatch, getState) => {
  try {
    // const errors = fetchDataValidator(data);
    // if (Object.keys(errors).length !== 0) {
    //   return dispatch(resolveError({ errorObject: errors }));
    // }

    const dataArray = data.searchTerm.split("\n").map((value, index) => value).filter((value) => Validator.isURL(value));

    dispatch({
      type: GET_ERRORS,
      payload: {}
    });

    dispatch({
      type: DOWNLOAD_SET_DATA,
      payload: dataArray
    });


    // const testData = await fetchUrlData(`http://localhost:2000/${`https://www.google.com/`}`);

    // console.log(testData);

    const parallelRequests = 5;
    for (let index = 0; index < dataArray.length; index = index + parallelRequests) {
      // const currentRequest = dataArray.slice(index, parallelRequests);

      let promiseRequests = [];
      for (let indexRequest = index; indexRequest < index + parallelRequests; indexRequest++) {
        if (typeof (dataArray[indexRequest]) !== "undefined")
          promiseRequests.push(fetchUrlData(dataArray[indexRequest])
            .then(response => dispatch({
              type: DOWNLOAD_LINK_ADD,
              payload: response
            }))
            .catch(error => dispatch({
              type: DOWNLOAD_LINK_ADD,
              payload: {
                value: dataArray[indexRequest],
                downloadLink: null
              }
            })));
      }

      await Promise.all(promiseRequests);
    }
  }
  catch (e) {
    dispatch({
      type: DOWNLOAD_SET_DATA,
      payload: []
    });

    return dispatch(
      resolveError({ errorException: e })
    );
  }
  finally {
    // dispatch({
    //   type: PAGE_LOADING,
    //   payload: false
    // });
  }
}

const fetchUrlData = async (url) => {
  const response = await apiRequest.get(CONFIG_APP.PROXY_URL + url);

  try {
    const sharedData = JSON.parse(/<script [^>]+>[\s]?window\._sharedData[\s]?=[\s]?(.*?)[;]?<\/script>/g.exec(response.data)[1]);

    const downloadLinks = sharedData.entry_data.PostPage[0].graphql.shortcode_media.edge_sidecar_to_children.edges.map((value, index) => {
      return { name: value.node.id, value: value.node.display_url + `&dl=1` };
    })

    return {
      value: url,
      downloadLink: downloadLinks
    };

  } catch (error) {

  }

  try {
    const responseDocument = await new DOMParser().parseFromString(response.data, "text/html");
    const video = responseDocument.querySelector('meta[property="og:video"]');
    const image = responseDocument.querySelector('meta[property="og:image"]');

    return {
      value: url,
      downloadLink: video ? video.content + `&dl=1` : image.content + `&dl=1`
    };
  } catch (error) {

  }

  return {
    value: url,
    downloadLink: null
  }

}

export const clearData = () => async (dispatch, getState) => {
  dispatch({
    type: DOWNLOAD_CLEAR_DATA
  });
}