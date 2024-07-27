import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import useFetch from "../hooks/useFetch";
import { globalVariables } from "../config/contants";
import Layout from "../layout/Layout";
import { setChats } from "../app/features/chat.slice";
import { useEffect } from "react";
import { IChat } from "../types/chat";
import Chat from "../components/Chat/Chat";

const HomePage = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const chat = useSelector((state: RootState) => state.chat)

  const { loading, data, error } = useFetch<IChat[]>(`${globalVariables.backendApiUrl}/chats/my-chats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authState.token}`,
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(setChats(data))
    }
  }, [data, dispatch])

  if (loading) {
    return <p className="text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Layout>
      <div className="flex-1 h-full">
        {chat.currentChatId ?
        <Chat /> :
        null
        }
      </div>
    </Layout>
  )
}

export default HomePage