
export function toggleplay() {
  return {
    type: 'TOGGLEPLAY',
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

export function enqueue(tracks = null) {
  return {
    type: 'ENQUEUE',
    tracks,
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
