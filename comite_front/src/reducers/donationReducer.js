import {
  DONATIONS_ASYNC_REQUEST_STARTED,
  GET_DONATIONS_SUCCESS,
  GET_DONATIONS_FAILED,
  DELETE_DONATION_SUCCESS,
  DELETE_DONATION_FAILED,
  ADD_DONATION_SUCCESS,
  ADD_DONATION_FAILED,
  EDIT_DONATION_SUCCESS,
  EDIT_DONATION_FAILED
} from '../actions/donationActions';

const initialState = {
  loading: false,
  donations: [],
  donation: {}
};

const donationReducer = (state = initialState, action) => {
  switch (action.type) {
    case DONATIONS_ASYNC_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
      }
    case GET_DONATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        donations: action.payload
      }
    }

    case DELETE_DONATION_SUCCESS:
      return {
        ...state,
        loading: false,
        donations: state.donations.filter(donation => donation.id !== action.payload)
      }

    case ADD_DONATION_SUCCESS:
      const add = state.donations
      add.push(action.payload)
      return {
        ...state,
        loading: false,
        donations: add
      }

    case EDIT_DONATION_SUCCESS:
      const temp = state.donations.filter(donation => donation.id !== action.payload.id)
      temp.push(action.payload)
      return {
        ...state,
        loading: false,
        donations: temp
      }

    case EDIT_DONATION_FAILED:
    case ADD_DONATION_FAILED:
    case DELETE_DONATION_FAILED:
    case GET_DONATIONS_FAILED:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default donationReducer;
