
import Router from 'next/router';

import * as TYPES from './types';
import tmdbAPI from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';

const getPerson = id => async dispatch => {
  try {
    dispatch({type: TYPES.SET_PERSON_LOADING});
    const response = await tmdbAPI.get(`/3/person/${id}`);
    await dispatch({
      type: TYPES.FETCH_PERSON,
      payload: response.data
    });
    dispatch({type: TYPES.UNSET_PERSON_LOADING});
  } catch (error) {
    console.log('[getPerson] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response});
    Router.push(LINKS.ERROR.HREF);
  }
};

export default getPerson;
