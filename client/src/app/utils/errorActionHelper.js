// import _ from 'lodash';
import { GET_ERRORS } from '../actions/types';

export const resolveError = ({errorObject, errorException}) => {

  // console.log({
  //   errorObject,
  //   errorException,
  //   boolErrorObject: Boolean(errorObject),
  //   boolErrorException: Boolean(errorException)
  // })

  if (errorException && errorException.response && errorException.response.status) {
    const { response: { status, data } } = errorException;

    if (status && status >= 400 && status < 500) {
      return {
        type: GET_ERRORS,
        payload: data
      };
    }
  }

  if (errorObject) {
    return {
      type: GET_ERRORS,
      payload: {
        errors: errorObject
      }
    };
  }

  return {
    type: GET_ERRORS,
    payload: {
      message: "Internal Server Error."
    }
  };
}


export const responseDispatchError = (e) => {
  if (e.response === undefined || e.response.data.errors === undefined) {
    if (e.response && e.response.status !== undefined) {
      if (e.response.status >= 500) {
        return internalServerError();
      }
      // if(e.response && e.response.status && e.response.status === 404)
      // {
      //   emptyError();
      // }
    }
    return connectionLostError();
  }

  const errors = e.response.data.errors;

  // console.log(errors);

  // let actionLogout = false;
  // actionLogout = errors.some((item) => {
  //   if (["INVALID_TOKEN", "MISSING_TOKEN"].indexOf(item.type) !== -1) return true;
  //   return false;
  // });

  // if (actionLogout)
  //   return {
  //     type: SET_CURRENT_USER,
  //     payload: {}
  //   };

  return {
    type: GET_ERRORS,
    payload: errors
  };
}

export const redirectCheck = (e) => {
  let redirect = false;
  if (e.response && e.response.status && e.response.status === 404) {
    redirect = true;
  }
  return redirect;
}

export const emptyError = () => ({
  type: GET_ERRORS,
  payload: []
});

export const connectionLostError = () => ({
  type: GET_ERRORS,
  // time: Date.now(),
  payload: [{ type: "CONNECTION_LOST", message: "Connection lost. Please try again." }]
});

export const internalServerError = () => ({
  type: GET_ERRORS,
  // time: Date.now(),
  payload: [{ type: "INTERNAL_SERVER_ERROR", message: "Internal Server Error." }]
});

export const requestNotComplete = () => ({
  type: GET_ERRORS,
  // time: Date.now(),
  payload: [{ type: "REQUEST_ERROR", message: "Request not complete" }]
});