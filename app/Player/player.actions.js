
/**
 * Creates an action named "TOGGLEPLAY" with
 * the required data to execute the reducer action.
 *
 * @return ActionCreator the action creator
 */
export function toggleplay() {
  return {
    type: 'TOGGLEPLAY',
  };
}

/**
 * Creates an action named "PLAY" with
 * the required data to execute the reducer action.
 *
 * @return ActionCreator the action creator
 */
export function play() {
  return {
    type: 'PLAY',
  };
}

/**
 * Creates an action named "STOP" with
 * the required data to execute the reducer action.
 *
 * @return ActionCreator the action creator
 */
export function stop() {
  return {
    type: 'STOP',
  };
}

/**
 * Creates an action named "PLAYING" with
 * the required data to execute the reducer action.
 *
 * @param audioStatus The currect status (time elapsed, etc.) of the dom player
 * @return ActionCreator the action creator
 */
export function playing(audioStatus) {
  return {
    type: 'PLAYING',
    audioStatus,
  };
}

/**
 * Create an action to enqueue a list of tracks
 * @param {List} tracks - List of tracks to enqueue
 * @return ActionCreator the action creator
 */
export function enqueue(tracks = null) {
  return {
    type: 'ENQUEUE',
    tracks,
  };
}

/**
 * Creates an action named "CLEAR_QUEUE" with
 * the required data to execute the reducer action.
 *
 * @return ActionCreator the action creator
 */
export function clearQueue() {
  return {
    type: 'CLEAR_QUEUE',
  };
}

/**
 * Creates an action named "NEXT" with
 * the required data to execute the reducer action.
 *
 * @return ActionCreator the action creator
 */
export function next() {
  return {
    type: 'NEXT',
  };
}

/**
 * Creates an action named "PREV" with
 * the required data to execute the reducer action.
 *
 * @return ActionCreator the action creator
 */
export function prev() {
  return {
    type: 'PREV',
  };
}
