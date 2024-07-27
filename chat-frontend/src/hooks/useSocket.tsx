import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { globalVariables } from '../config/contants';
import { io } from 'socket.io-client';

const useSocket = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const currentChat = useSelector((state: RootState) => state.chat.currentChatId);

  const socket = io(`${globalVariables.socketBackendUrl}`, {
    extraHeaders: {
      authorization: `Bearer ${auth.token}`
    }
  });

  const handleJoinRoom = () => {
    socket.emit("joinRoom", { roomName: currentChat })
  }

  const handleSendMessage = (content: string, to: string) => {
    socket.emit("sendMessageToRoom", { roomName: currentChat, content: content, to })
  }

  useEffect(() => {
    if (currentChat) {
      socket.emit("joinRoom", { roomName: currentChat })
    }

    // return () => {
    //   socket.emit("leaveRoom", { roomName: currentChat })
    // }
  }, [currentChat])

  return { socket, handleSendMessage, handleJoinRoom };
}

export default useSocket