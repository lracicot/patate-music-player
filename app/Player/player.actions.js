
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

export function playing(audio_status) {
  return {
    type: 'PLAYING',
    audio_status
  };
}

export function enqueue(tracks = null) {
  return {
    type: 'ENQUEUE',
    tracks
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
