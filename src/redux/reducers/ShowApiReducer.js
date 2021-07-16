const initialState = {
    isLoading: true,
    Show: []
  
  };
  export const ShowApiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_API_RESET':
            return{
              isLoading: true,
              Show: []
            }

        case 'SHOW_API_REQUEST':
        return{
          ...state,
          isLoading: true
        }
  
      case 'SHOW_API_SUCCESS':
        if(action.payload == "DisableLoader")
        {
          return{
            ...state,
            isLoading: false
          }
        }
        return {
          ...state,
          Show: [...state.Show, action.payload.data.results],
        };
      case 'SHOW_API_FAILURE':
        return {
          ...state,
          Error: action.payload,
        };
  
      default:
        return state;
    }
  };
  