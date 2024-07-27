import useFetch from "../../hooks/useFetch"
import { globalVariables } from "../../config/contants"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { IChatWithMessages } from "../../types/chat"
import ChatBody from "./ChatBody"
import { LuLoader2 } from "react-icons/lu"

const Chat = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const currentChat = useSelector((state: RootState) => state.chat.currentChatId)


  const { data, error, loading } = useFetch<IChatWithMessages>(`${globalVariables.backendApiUrl}/chats/my-chats/${currentChat}/messages`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })

  return (
    <>
    {loading ? <div className="w-full h-full flex justify-center items-center">
      <LuLoader2 className="animate-spin" />
    </div> : 
    error ? <p className="text-danger">{error}</p> :
    <ChatBody messages={data?.messages || []} otherUserId={data?.users.find(item => item._id !== currentChat)?._id || ""} />
    }
    </>
  )
}

export default Chat