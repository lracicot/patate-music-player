
export function toggleplay() {
  return {
    type: 'TOGGLEPLAY',
  };
}
export function play() {
  return {
    type: 'PLAY',
  };
}

export function stop() {
  return {
    type: 'STOP',
  };
}

export function playing(audioStatus) {
  return {
    type: 'PLAYING',
    audioStatus,
  };
}

/**
   * Create an action to enqueue a list of tracks
   * @param {List} tracks - List of tracks to enqueue.
   */
export function enqueue(tracks = null) {
  return {
    type: 'ENQUEUE',
    tracks,
  };
}

export function clearQueue() {
  return {
    type: 'CLEAR_QUEUE',
  };
}

export function next() {
  return {
    type: 'NEXT',
  };
}

export function prev() {
  return {
    type: 'PREV',
  };
}
