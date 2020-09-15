import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  FETCH_USER_FILES_SUCCESS,
  FETCH_USER_FILES_FAILED
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
        returnErrors(err.response.data, err.response.status, 'FETCH_USER_FILES_FAILED')
      );
      dispatch({
        type: FETCH_USER_FILES_FAILED
      });
    });
};
