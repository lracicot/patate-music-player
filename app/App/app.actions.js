
/**
 * This function creates an action named "SET_STATE" with
 * the required data to execute the reducer action.
 *
 * @return ActionCreator The action creator
 */
export const SET_STATE = 'SET_STATE';
export function setState(state) {
  return {
    type: SET_STATE,
    state,
  };
}
