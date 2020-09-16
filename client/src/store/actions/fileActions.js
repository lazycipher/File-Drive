import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  FETCH_USER_FILES_SUCCESS,
  FETCH_USER_FILES_FAILED,
  DELETE_FILE_FAILED,
  DELETE_FILE_SUCCESS,
  CLEAR_FILES
} from '../types';

import {tokenConfig} from './authActions';

export const getFiles = () => (dispatch, getState) => {

  axios
    .get('/api/file', tokenConfig(getState))
    .then(res =>
        dispatch({
          type: FETCH_USER_FILES_SUCCESS,
          payload: res.data
        })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, FETCH_USER_FILES_FAILED)
      );
      dispatch({
        type: FETCH_USER_FILES_FAILED
      });
    });
};

export const deleteFile = (id) => (dispatch, getState) => {

  axios
    .delete(`/api/file/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_FILE_SUCCESS,
        payload: id
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, DELETE_FILE_FAILED)
      );
      dispatch({
        type: DELETE_FILE_FAILED
      });
    });
};

export const clearFiles = () => {
  return {
    type: CLEAR_FILES
  }
}
