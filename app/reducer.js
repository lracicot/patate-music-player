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
  case 'CONNECTINGSOURCE':
    return SourceListActions.ConnectingSource.execute(state, action.proxy);
  case 'CONNECTEDSOURCE':
    return SourceListActions.ConnectedSource.execute(state, action.proxy, action.accessToken);
  case 'CONNEXIONFAILEDSOURCE':
    return SourceListActions.ConnexionFailedSource.execute(state, action.proxy, action.error);
  case 'TEST':
    return (dispatch) => {
      dispatch({ type: 'STOP' });
    };
  default:
    console.log(action);
  }
  return state;
}
