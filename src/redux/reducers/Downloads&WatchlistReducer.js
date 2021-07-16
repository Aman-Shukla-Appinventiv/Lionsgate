const initialState = {
  Downloads: [],
  WatchList: [],
};

export const Downloads_N_WatchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DOWNLOADS':
      return {
       ...state,
       Downloads: [...state.Downloads, action.payload]
      };

    case 'REMOVE_DOWNLOADS':
      const newDownloads = state.Downloads.filter((element) => element.id != action.payload)
      return {
        ...state,
        Downloads: newDownloads
      };

    case 'ADD_WATCHLIST':
      return {
        ...state,
       WatchList: [...state.WatchList, action.payload]
      };

    case 'REMOVE_WATCHLIST':
      const newWatclist = state.WatchList.filter((element) => element.id != action.payload)
      return {
        ...state,
        WatchList: newWatclist
      };

    default:
      return state;
  }
};
