import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  UPLOAD_SUCCESS,
  UPLOAD_FAILED
} from '../types';

export const uploadFile = ({ file }) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  const body = JSON.stringify({ name, email, username, password });

  axios
    .post('/api/auth/register', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.auth_user
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};
