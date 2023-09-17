import {
  IS_LOADING_APP,
  SET_ACTIVE_PLAYLIST,
  SET_CURRENT_PLAYLIST,
  SET_CURRENT_SONG,
  SET_IS_PLAYING,
} from '../actions/type/audioplayer'

const initialState = {
  isLoading: false,
  isPlaying: false,
  currentPlaylist: false,
  activePlaylist: {},
  currentSong: {},
}

export default function audioPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING_APP:
      return {
        ...state,
        isLoading: action.payload,
      }

    case SET_CURRENT_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.payload,
      }

    case SET_ACTIVE_PLAYLIST:
      return {
        ...state,
        activePlaylist: action.payload,
      }

    case SET_CURRENT_SONG:
      return {
        ...state,
        isPlaying: !state.isPlaying,
        currentSong: action.payload,
      }

    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
      }

    default:
      return state
  }
}
