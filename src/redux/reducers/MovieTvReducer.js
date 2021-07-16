const initialState = {
  seasonsIsLoading: true,
  isLoading: true,
  Seasons: [],
};
export const MovieTvReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIE_REQUEST':
      return {
        ...state,
        isLoading: true,
        seasonsIsLoading: true,
      };
    case 'FETCH_MOVIE_SUCCESS':
      return {
        ...state,
        Data: action.payload.data,
      };
    case 'FETCH_SIMILAR_MOVIE_SUCCESS':
      return {
        ...state,
        Similar: action.payload.data.results,
        isLoading: false,
        seasonsIsLoading: true,
      };
    case 'FETCH_MOVIE_FAILURE':
      return {
        ...state,
        Error: action.payload,
      };

    case 'SEASON_API_REQUEST':
      return {
        ...state,
        seasonsIsLoading: true,
        Seasons: [],
      };
    case 'SEASON_API_SUCCESS':
      if (action.payload == 'disableLoader') {
        return {
          ...state,
          seasonsIsLoading: false,
        };
      }
      else{
        return {
          ...state,
          Seasons: [...state.Seasons, action.payload.data],
        };
      }
      
    case 'SEASON_API_FAILURE':
      return {
        ...state,
        Error: action.payload,
      };

    default:
      return state;
  }
};
