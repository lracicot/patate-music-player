import { Map } from 'immutable';
import * as AppActions from './App/actions';
import * as PlayerActions from './Player/actions';

export default function (state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return AppActions.SetState.execute(state, action.state);
  case 'ENQUEUE':
    return PlayerActions.Enqueue.execute(state, action.tracks);
  case 'TOGGLEPLAY':
    return PlayerActions.TogglePlay.execute(state);
  case 'STOP':
    return PlayerActions.Stop.execute(state);
  case 'PLAYING':
    return PlayerActions.Playing.execute(state, action.audio_status);
  case 'NEXT':
    return PlayerActions.Next.execute(state);
  case 'PREV':
    return PlayerActions.Prev.execute(state);
  default:
    console.log(action);
  }
  return state;
}
