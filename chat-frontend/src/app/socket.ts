import io from 'socket.io-client';
import { globalVariables } from '../config/contants';

const socket = io(`${globalVariables.socketBackendUrl}`, {
  extraHeaders: {
    // authorization: `Bearer ${auth.token}`
  }
});

export default socket;