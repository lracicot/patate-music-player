import { Map } from 'immutable';
import * as AppActions from './App/actions';
import * as PlayerActions from './Player/actions';
import * as SourceListActions from './SourceList/actions';

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
    return PlayerActions.Playing.execute(state, action.audioStatus);
  case 'NEXT':
    return PlayerActions.Next.execute(state);
  case 'PREV':
    return PlayerActions.Prev.execute(state);
  case 'CONNECTSOURCE':
    return SourceListActions.ConnectSource.execute(state, action.proxyName);
  default:
    console.log(action);
  }
  return state;
}
