import Api from '../services/api';

export const DONATIONS_ASYNC_REQUEST_STARTED = 'DONATIONS_ASYNC_REQUEST_STARTED';
export const GET_DONATIONS_SUCCESS = 'GET_DONATIONS_SUCCESS';
export const GET_DONATIONS_FAILED = 'GET_DONATIONS_FAILED';
export const DELETE_DONATION_SUCCESS = 'DELETE_DONATION_SUCCESS';
export const DELETE_DONATION_FAILED = 'DELETE_DONATION_FAILED';
export const ADD_DONATION_SUCCESS = 'ADD_DONATION_SUCCESS';
export const ADD_DONATION_FAILED = 'ADD_DONATION_FAILED';
export const EDIT_DONATION_SUCCESS = 'EDIT_DONATION_SUCCESS';
export const EDIT_DONATION_FAILED = 'EDIT_DONATION_FAILED';

export const donationsAsyncRequestStarted = () => ({
  type: DONATIONS_ASYNC_REQUEST_STARTED
});

const getDonationsSuccess = (data) => ({
  type: GET_DONATIONS_SUCCESS,
  payload: data
});

const getDonationsFailed = () => ({
  type: GET_DONATIONS_FAILED,
});

export const getDonationsRequest = () => {
  return dispatch => {
    dispatch(donationsAsyncRequestStarted());
    Api.get('donations/')
    .then(response => {
      dispatch(getDonationsSuccess(response.data))
    })
    .catch(error => {
      dispatch(getDonationsFailed());
    })
  };
};

const deleteDonationSuccess = (data) => ({
  type: DELETE_DONATION_SUCCESS,
  payload: data
});

const deleteDonationFailed = () => ({
  type: DELETE_DONATION_FAILED,
});

export const deleteDonationRequest = (id) => {
  return dispatch => {
    dispatch(donationsAsyncRequestStarted());
    Api.delete(`donations/${id}/`)
    .then(response => {
      dispatch(deleteDonationSuccess(id))
    })
    .catch(error => {
      dispatch(deleteDonationFailed());
    })
  };
};

const addDonationSuccess = (data) => ({
  type: ADD_DONATION_SUCCESS,
  payload: data
});

const addDonationFailed = () => ({
  type: ADD_DONATION_FAILED,
});

export const addDonationRequest = (body) => {
  return dispatch => {
    dispatch(donationsAsyncRequestStarted());
    Api.post(`donations/`, body)
    .then(response => {
      dispatch(addDonationSuccess(response.data))
    })
    .catch(error => {
      dispatch(addDonationFailed());
    })
  };
};

const editDonationSuccess = (data) => ({
  type: EDIT_DONATION_SUCCESS,
  payload: data
});

const editDonationFailed = () => ({
  type: EDIT_DONATION_FAILED,
});

export const editDonationRequest = (id, body) => {
  return dispatch => {
    dispatch(donationsAsyncRequestStarted());
    Api.patch(`donations/${id}/`, body)
    .then(response => {
      dispatch(editDonationSuccess(response.data))
    })
    .catch(error => {
      dispatch(editDonationFailed());
    })
  };
};