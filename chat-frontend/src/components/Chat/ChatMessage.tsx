import { IMessage } from '../../types/chat'
import dayjs from 'dayjs'

interface ChatMessageProps extends IMessage {
  isMessageFromMe: boolean;
}

const ChatMessage = ({ _id, content, senderId, createdAt, isMessageFromMe }: ChatMessageProps) => {
  return (
    <div key={_id} className={`p-1 px-2 rounded shadow max-w-fit flex flex-col items-end gap-1 ${isMessageFromMe ? "self-end bg-mixed-300" : "bg-dark-400"}`}>
      <p>{content}</p> <span className="text-[10px] text-gray-200">{dayjs(createdAt).format("HH:mm")}</span>
    </div>
  )
}

export default ChatMessage