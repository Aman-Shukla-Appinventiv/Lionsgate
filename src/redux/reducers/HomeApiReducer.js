const initialState = {
  isLoading: true,
  Home: []

};
export const HomeApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HOME_API_RESET':
      return{
        isLoading: true,
        Home: []
      }
    case 'HOME_API_REQUEST':
      return{
        ...state,
        isLoading: true
      }

    case 'HOME_API_SUCCESS':
      if(action.payload == "DisableLoader")
      {
        return{
          ...state,
          isLoading: false
        }
      }
      return {
        ...state,
        Home: [...state.Home, action.payload.data.results],
      };
    case 'HOME_API_FAILURE':
      return {
        ...state,
        Error: action.payload,
      };
      
    default:
      return state;
  }
};
