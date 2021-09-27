import Api from '../services/api';

export const PEOPLE_ASYNC_REQUEST_STARTED = 'PEOPLE_ASYNC_REQUEST_STARTED';
export const GET_PEOPLE_SUCCESS = 'GET_PEOPLE_SUCCESS';
export const GET_PEOPLE_FAILED = 'GET_PEOPLE_FAILED';
export const DELETE_PERSON_SUCCESS = 'DELETE_PERSON_SUCCESS';
export const DELETE_PERSON_FAILED = 'DELETE_PERSON_FAILED';
export const ADD_PERSON_SUCCESS = 'ADD_PERSON_SUCCESS';
export const ADD_PERSON_FAILED = 'ADD_PERSON_FAILED';
export const EDIT_PERSON_SUCCESS = 'EDIT_PERSON_SUCCESS';
export const EDIT_PERSON_FAILED = 'EDIT_PERSON_FAILED';

export const peopleAsyncRequestStarted = () => ({
  type: PEOPLE_ASYNC_REQUEST_STARTED
});

const getPeopleSuccess = (data) => ({
  type: GET_PEOPLE_SUCCESS,
  payload: data
});

const getPeopleFailed = () => ({
  type: GET_PEOPLE_FAILED,
});

export const getPeopleRequest = () => {
  return dispatch => {
    dispatch(peopleAsyncRequestStarted());
    Api.get('people/')
    .then(response => {
      dispatch(getPeopleSuccess(response.data))
    })
    .catch(error => {
      dispatch(getPeopleFailed());
    })
  };
};

const deletePersonSuccess = (data) => ({
  type: DELETE_PERSON_SUCCESS,
  payload: data
});

const deletePersonFailed = () => ({
  type: DELETE_PERSON_FAILED,
});

export const deletePersonRequest = (id) => {
  return dispatch => {
    dispatch(peopleAsyncRequestStarted());
    Api.delete(`people/${id}/`)
    .then(response => {
      dispatch(deletePersonSuccess(id))
    })
    .catch(error => {
      dispatch(deletePersonFailed());
    })
  };
};

const addPersonSuccess = (data) => ({
  type: ADD_PERSON_SUCCESS,
  payload: data
});

const addPersonFailed = () => ({
  type: ADD_PERSON_FAILED,
});

export const addPersonRequest = (body) => {
  return dispatch => {
    dispatch(peopleAsyncRequestStarted());
    Api.post(`people/`, body)
    .then(response => {
      dispatch(addPersonSuccess(response.data))
    })
    .catch(error => {
      dispatch(addPersonFailed());
    })
  };
};

const editPersonSuccess = (data) => ({
  type: EDIT_PERSON_SUCCESS,
  payload: data
});

const editPersonFailed = () => ({
  type: EDIT_PERSON_FAILED,
});

export const editPersonRequest = (id, body) => {
  return dispatch => {
    dispatch(peopleAsyncRequestStarted());
    Api.patch(`people/${id}/`, body)
    .then(response => {
      dispatch(editPersonSuccess(response.data))
    })
    .catch(error => {
      dispatch(editPersonFailed());
    })
  };
};