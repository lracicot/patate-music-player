import { Map, List } from 'immutable';
import Sound from 'react-sound';

function setState(state, newState) {
  return state.merge(newState);
}

function enqueue(state, tracks) {
  if (tracks) {
    if (!List.isList(tracks)) {
      tracks = List.of(tracks);
    }
    return state.set('queue',
      state.get('queue').concat(tracks)
    );
  } else if (state.get('tracks').size > 0) {
    return state.set('queue',
      state.get('queue').push(state.getIn(['tracks', 0]))
    );
  }
}

function next(state) {
  const currentTrack = state.get('queue').get(0);

  if (state.get('queue').size == 1) {
    return state.setIn(['playback', 'playStatus'], Sound.status.STOPPED);
  }

  return state.set('queue',
    state.get('queue').shift()
  ).set('history',
    state.get('history').push(currentTrack)
  );
}

function prev(state) {
  const prevTrack = state.get('history').peek();

  if (state.get('history').size > 0) {
    return state.set('history',
      state.get('history').shift()
    ).set('queue',
      state.get('queue').insert(0, prevTrack)
    );
  }

  return state;
}

function toggleplay(state) {
  if (state.get('queue').size > 0) {
    if (state.getIn(['playback', 'playStatus']) == Sound.status.PLAYING) {
      return state.setIn(['playback', 'playStatus'], Sound.status.PAUSED);
    }
    return state.setIn(['playback', 'playStatus'], Sound.status.PLAYING);
  }

  return state;
}

function stop(state) {
  return state.setIn(['playback', 'playStatus'], Sound.status.STOPPED);
}

function playing(state, audio_status) {
  return state.setIn(['playback', 'elapsed'], audio_status.elapsed)
    .setIn(['playback', 'total'], audio_status.total)
    .setIn(['playback', 'position'], audio_status.position);
}


export default function(state = Map(), action) {

  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'ENQUEUE':
    return enqueue(state, action.tracks);
  case 'TOGGLEPLAY':
    return toggleplay(state);
  case 'STOP':
    return stop(state);
  case 'PLAYING':
    return playing(state, action.audio_status);
  case 'NEXT':
    return next(state);
  case 'PREV':
    return prev(state);
  }
  return state;
}
