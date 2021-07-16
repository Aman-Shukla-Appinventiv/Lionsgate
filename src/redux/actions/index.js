import axios from 'axios';
// ===================== AUTH REDUCER ACTIONS ======================
export const signUp = Data => {
  return {
    type: 'SIGNUP',
    payload: {
      id: (new Date().getTime() + Math.random() + Math.random()).toString(),
      data: Data,
    },
  };
};
export const signIn = data => {
  return {
    type: 'SIGNIN',
    payload: data,
  };
};

export const signout = () => {
  return {
    type: 'SIGNOUT',
  };
};
export const subscribe = () => {
  return {
    type: 'SUBSCRIBE',
  };
};
export const unSubscribe = () => {
  return {
    type: 'UNSUBSCRIBE',
  };
};

// ===================== HOME API REDUCER ACTIONS ======================

export const homeAPIReset = () => {
  return {
    type: 'HOME_API_RESET',
  };
};

export const homeAPIRequest = () => {
  return {
    type: 'HOME_API_REQUEST',
  };
};

export const homeAPISuccess = Data => {
  return {
    type: 'HOME_API_SUCCESS',
    payload: Data,
  };
};

export const homeAPIFailure = error => {
  return {
    type: 'HOME_API_FAILURE',
    payload: error,
  };
};

export const homeAPI = data => {
  const requests = data.map(element => axios.get(element));

  return async dispatch => {
    dispatch(homeAPIReset());
    dispatch(homeAPIRequest());
    await axios
      .all(requests)
      .then(
        axios.spread((...response) => {
          response.forEach(element => {
            if (element.status === 200) {
              dispatch(homeAPISuccess(element));
            }
          });
          dispatch(homeAPISuccess('DisableLoader'));
        }),
      )
      .catch(error => {
        const errorMsg = error.message;
        dispatch(homeAPIFailure(errorMsg));
      });
  };
};

// ===================== SHOW API REDUCER ACTIONS ======================

export const showAPIReset = () => {
  return {
    type: 'SHOW_API_RESET',
  };
};

export const showAPIRequest = () => {
  return {
    type: 'SHOW_API_REQUEST',
  };
};

export const showAPISuccess = Data => {
  return {
    type: 'SHOW_API_SUCCESS',
    payload: Data,
  };
};

export const showAPIFailure = error => {
  return {
    type: 'SHOW_API_FAILURE',
    payload: error,
  };
};

export const showAPI = data => {
  const requests = data.map(element => axios.get(element));

  return async dispatch => {
    dispatch(showAPIReset());
    dispatch(showAPIRequest());
    await axios
      .all(requests)
      .then(
        axios.spread((...response) => {
          response.forEach(element => {
            if (element.status === 200) {
              dispatch(showAPISuccess(element));
            }
          });

          dispatch(showAPISuccess('DisableLoader'));
        }),
      )
      .catch(error => {
        const errorMsg = error.message;
        dispatch(showAPIFailure(errorMsg));
      });
  };
};

// ===================== MOVIE_TV REDUCER ACTIONS ======================

export const fetchMovieRequest = () => {
  return {
    type: 'FETCH_MOVIE_REQUEST',
  };
};
export const fetchMovieSuccess = Data => {
  return {
    type: 'FETCH_MOVIE_SUCCESS',
    payload: Data,
  };
};
export const fetchSimilarMovieSuccess = Data => {
  return {
    type: 'FETCH_SIMILAR_MOVIE_SUCCESS',
    payload: Data,
  };
};

export const fetchMoviesFailure = error => {
  return {
    type: 'FETCH_MOVIE_FAILURE',
    payload: error,
  };
};

export const movieDetails = ({api, similar}) => {
  const movie = axios.get(api);
  const similarMovie = axios.get(similar);

  return async dispatch => {
    dispatch(fetchMovieRequest());
    await axios
      .all([movie, similarMovie])
      .then(
        axios.spread((...response) => {
          if (response[0].status == 200) {
            dispatch(fetchMovieSuccess(response[0]));
          }
          if (response[1].status == 200) {
            dispatch(fetchSimilarMovieSuccess(response[1]));
          }
        }),
      )
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchMoviesFailure(errorMsg));
      });
  };
};

// ----------------seasons Data actions----------------

export const seasonAPIRequest = () => {
  return {
    type: 'SEASON_API_REQUEST',
  };
};

export const seasonAPISuccess = Data => {
  return {
    type: 'SEASON_API_SUCCESS',
    payload: Data,
  };
};

export const seasonAPIFailure = error => {
  return {
    type: 'SEASON_API_FAILURE',
    payload: error,
  };
};

export const Seasons = ({id, seasons}) => {
  const requests = [];
  for (var i = 1; i <= seasons; i++) {
    const url =
      'https://api.themoviedb.org/3/tv/' +
      id +
      '/season/' +
      i +
      '?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US';
    const request = axios.get(url);
    requests.push(request);
  }

  return async dispatch => {
    dispatch(seasonAPIRequest());
    await axios
      .all(requests)
      .then(
        axios.spread((...response) => {
          response.forEach(element => {
            if (element.status === 200) {
              dispatch(seasonAPISuccess(element));
            }
          });
          dispatch(seasonAPISuccess("disableLoader"));
        }),
      )
      .catch(error => {
        const errorMsg = error.message;
        dispatch(showAPIFailure(errorMsg));
      });
  };
};

// ===================== SEARCH REDUCER ACTIONS ======================

export const SearchCalling = () => {
  return {
    type: 'SEARCH_CALLING',
  };
};

export const SearchCallSuccess = data => {
  return {
    type: 'SEARCH_CALLING_SUCCESS',
    payload: data,
  };
};

export const SearchCallFailure = error => {
  return {
    type: 'SEARCH_CALLING_FAILURE',
    error: error,
  };
};

export const search = ({keyword}) => {
  return async dispatch => {
    await axios
      .get(
        'https://api.themoviedb.org/3/search/multi?api_key=8a869e5388c886cce43c72cff4147cbc&language=en-US&query=' +
          keyword +
          '&page=1&include_adult=false',
      )
      .then(response => {
        const Data = response.data;
        dispatch(SearchCallSuccess(Data));
      })
      .catch(error => {
        const errorMsg = error.message;
        alert('Slow Internet! try again');
        dispatch(SearchCallFailure(errorMsg));
      });
  };
};
// ===================== DOWNLOAD & WATCHLIST REDUCER ACTIONS ======================

export const addDownload = data => {
  return {
    type: 'ADD_DOWNLOADS',
    payload: data,
  };
};
export const removeDownload = data => {
  return {
    type: 'REMOVE_DOWNLOADS',
    payload: data,
  };
};
export const addWatchlist = data => {
  return {
    type: 'ADD_WATCHLIST',
    payload: data,
  };
};
export const removeWatchlist = data => {
  return {
    type: 'REMOVE_WATCHLIST',
    payload: data,
  };
};
