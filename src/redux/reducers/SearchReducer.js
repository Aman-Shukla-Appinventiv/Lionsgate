const initialState = {
    isLoading: false,
    Data: [],
    error: '',
    apiCalled: false
  };
  
  export const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_CALLING': return{
          ...state,
          isLoading: true,
      }
  
      case 'SEARCH_CALLING_SUCCESS':
          return{
              isLoading: false,
              Data: action.payload,
              error: "",
              apiCalled: true
          }
  
      case 'SEARCH_CALLING_FAILURE':
          return{
              isLoading: false,
              Data: [],
              error: action.error,
              apiCalled: true
          }
  
      default:
        return state;
    }
  };