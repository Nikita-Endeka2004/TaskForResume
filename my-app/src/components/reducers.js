import { createStore } from 'redux';

const initialState = {
    error: null,
    isLoaded: false,
    items: [],
    currentPage: 1,
    itemsPerPage: 10,
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_DATA_SUCCESS':
        return {
          ...state,
          isLoaded: true,
          items: action.payload,
        };
      case 'FETCH_DATA_FAILURE':
        return {
          ...state,
          isLoaded: true,
          error: action.payload,
        };
      case 'CHANGE_PAGE':
        return {
          ...state,
          currentPage: action.payload,
        };
      default:
        return state;
    }
  }
  
  const store = createStore(reducer);
  
  export default store;