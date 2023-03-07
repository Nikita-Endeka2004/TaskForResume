const initialState = {
    error: null,
    isLoaded: false,
    items: [],
    currentPage: 1,
    itemsPerPage: 10,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_SUCCESS':
        return {
          ...state,
          isLoaded: true,
          items: action.payload.data,
        };
      case 'FETCH_DATA_FAILURE':
        return {
          ...state,
          isLoaded: true,
          error: action.payload.error,
        };
      case 'CHANGE_PAGE':
        return {
          ...state,
          currentPage: action.payload.pageNumber,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;