import {
  PEOPLE_ASYNC_REQUEST_STARTED,
  GET_PEOPLE_SUCCESS,
  GET_PEOPLE_FAILED,
  DELETE_PERSON_SUCCESS,
  DELETE_PERSON_FAILED,
  ADD_PERSON_SUCCESS,
  ADD_PERSON_FAILED,
  EDIT_PERSON_SUCCESS,
  EDIT_PERSON_FAILED
} from '../actions/peopleActions';

const initialState = {
  loading: false,
  people: [],
  person: {}
};

const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case PEOPLE_ASYNC_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
      }
    case GET_PEOPLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        people: action.payload
      }
    }

    case DELETE_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        people: state.people.filter(person => person.id !== action.payload)
      }

    case ADD_PERSON_SUCCESS:
      const add = state.people
      add.push(action.payload)
      return {
        ...state,
        loading: false,
        people: add
      }

    case EDIT_PERSON_SUCCESS:
      const temp = state.people.filter(person => person.id !== action.payload.id)
      temp.push(action.payload)
      return {
        ...state,
        loading: false,
        people: temp
      }

    case EDIT_PERSON_FAILED:
    case ADD_PERSON_FAILED:
    case DELETE_PERSON_FAILED:
    case GET_PEOPLE_FAILED:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default peopleReducer;
