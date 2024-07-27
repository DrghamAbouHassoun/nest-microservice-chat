import { FormEvent, useState } from "react";
import { IMessage } from "../../types/chat"
import useSocket from "../../hooks/useSocket";
import ChatMessage from "./ChatMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ChatTextInput from "../inputs/ChatTextInput";
import MainButton from "../buttons/MainButton";
import { IoSend } from "react-icons/io5";

interface ChatBodyProps {
  messages: IMessage[]
  otherUserId?: string;
}

const ChatBody = ({ messages, otherUserId }: ChatBodyProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const currentChat = useSelector((state: RootState) => state.chat.currentChatId)

  const { handleSendMessage, socket } = useSocket();

  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<IMessage[]>(messages);

  const handleSubmitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message) {
      // socket.emit("sendMessageToRoom", { roomName: currentChat, content: message})
      handleSendMessage(message, otherUserId || "");
      setMessage("");
    }
  }

  socket.on("messageToRoom", (data: { newMessage: {_id: string; content: string; createAt: Date; senderId: string }; sender: string }) => {
    console.log("Message arrived: ", data)
    setChatMessages((prevState) => (
      [...prevState, { 
        _id: data.newMessage._id,
        content: data.newMessage.content, 
        chatId: currentChat, 
        senderId: data.newMessage.senderId, 
        createdAt: data.newMessage.createAt,
      }]
    ))
  })

  return (
    <div className="flex-1 relative h-full">
      <div className="overflow-y-auto flex-1 h-[550px] flex w-full top-0  custom-scrollbar">
        {chatMessages && chatMessages.length > 0 ?
          <div className="flex flex-col w-full overflow-y-scroll pb-[10%] gap-2 p-2 flex-1">
            {chatMessages.map(item => (
              <ChatMessage
                {...item}
                isMessageFromMe={item.senderId === auth.user?._id}
              />
            ))}
          </div> :
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-center">There are no message from this chat!!</p>
          </div>}
      </div>
      <form onSubmit={handleSubmitMessage} className="w-full flex gap-2 p-2 bg-mixed-200">
        <ChatTextInput
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <MainButton className="text-x px-4 w-[50px] flex justify-center items-center text-black">
          <IoSend />
        </MainButton>
      </form>
    </div>
  )
}

export default ChatBody