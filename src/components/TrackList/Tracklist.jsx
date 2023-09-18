import { styled } from 'styled-components'
import { Track, TrackLoading } from './Track.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {
  audioPlayerChangedFilteredPlaylist,
  audioPlayerCurrentPlaylist,
  audioPlayerSetIsFilter,
} from '../../store/selectors/audioplayer.js'
import {
  useGetAllTrackQuery,
  useGetFavoriteTrackQuery,
} from '../../services/audioplayer.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  changeFilteredPlaylist,
  setFilterPlaylist,
} from '../../store/actions/creators/audioplayer.js'

const StyledContentPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

export function TrackList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentPlaylist = useSelector(audioPlayerCurrentPlaylist)
  const stateFilters = useSelector(audioPlayerSetIsFilter)
  const filteredPlaylist = useSelector(audioPlayerChangedFilteredPlaylist)

  const { data: trackList, error: trackListError } = currentPlaylist
    ? useGetFavoriteTrackQuery()
    : useGetAllTrackQuery()

  useEffect(() => {
    if (trackListError?.status === 401) {
      window.localStorage.removeItem('user')
      navigate('/login')
    }
  }, [trackListError])

  useEffect(() => {
    if (trackList) {
      let newFilteredPlaylist = [...trackList]
      if (stateFilters.searchNameTrack.length) {
        newFilteredPlaylist = [
          ...trackList.filter((track) =>
            track.name
              .toLowerCase()
              .includes(stateFilters.searchNameTrack.toLowerCase()),
          ),
        ]
      }
      dispatch(changeFilteredPlaylist(newFilteredPlaylist))
    }
  }, [stateFilters, trackList])

  return (
    <StyledContentPlaylist>
      {stateFilters.status
        ? filteredPlaylist?.map((track) => {
            return (
              <Track
                track={track}
                key={track.id}
                title={track.name}
                titleSpan=""
                link={track.track_file}
                author={track.author}
                album={track.album}
                time={
                  Math.floor(track.duration_in_seconds / 60) +
                  ':' +
                  (track.duration_in_seconds % 60)
                }
              />
            )
          })
        : trackList?.map((track) => {
            return (
              <Track
                track={track}
                key={track.id}
                title={track.name}
                titleSpan=""
                link={track.track_file}
                author={track.author}
                album={track.album}
                time={
                  Math.floor(track.duration_in_seconds / 60) +
                  ':' +
                  (track.duration_in_seconds % 60)
                }
              />
            )
          })}
      {}
    </StyledContentPlaylist>
  )
}

export function TrackListLoading(props) {
  return (
    <StyledContentPlaylist>
      <TrackLoading />
      <TrackLoading />
      <TrackLoading />
      <TrackLoading />
      <TrackLoading />
      <TrackLoading />
      <TrackLoading />
      <TrackLoading />
      <TrackLoading />
      <TrackLoading />
    </StyledContentPlaylist>
  )
}
