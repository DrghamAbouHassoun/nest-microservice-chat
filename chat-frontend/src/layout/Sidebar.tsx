import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import MainButton from '../components/buttons/MainButton';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import UsersModal from '../components/modals/UsersModal';
import dayjs from 'dayjs';
import { setCurrentChatId } from '../app/features/chat.slice';
import UserAvatar from '../components/UserAvatar';

const Sidebar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [toggleUsersModal, setToggleUsersModal] = useState<boolean>(false);

  const chats = useSelector((state: RootState) => state.chat.chats)
  const currentChat = useSelector((state: RootState) => state.chat.currentChatId)

  const handleCloseUsersModal = () => {
    setToggleUsersModal(false);
  }

  return (
    <>
    <UsersModal onClose={handleCloseUsersModal} isShow={toggleUsersModal} onUserSelect={() => {}} />
    <div className='min-w-[300px] h-full bg-mixed-200 flex flex-col'>
      <div className="flex flex-col justify-center items-center p-4 gap-2">
        <UserAvatar image={auth.user?.image} userName={auth.user?.name || ""} size='lg' />
        <h3 className="text-lg font-bold">{auth.user?.name}</h3>
      </div>
      <div className="overflow-y-scroll flex-1 custom-scrollbar">
        {chats.map(item => (
          <div key={item._id} onClick={() => dispatch(setCurrentChatId(item._id))} className={`flex p-3 gap-3 items-start hover:bg-mixed-300 cursor-pointer ${item._id === currentChat ? "bg-mixed-300": ""}`}> 
            {/* <div className="rounded-full overflow-hidden w-[50px] h-[50px] flex justify-center items-center bg-mixed-400">
              {item.users[0].image ? 
              <img className="object-cover w-full h-full" src={item.users[0].image} alt={item.name} /> :
              <b className="text-2xl">{item.users[0].name[0]}</b>}
            </div> */}
            <UserAvatar image={item.users[0].image} userName={item.users[0].name} />
            <div className="flex-1 py-2">
              <h4 className="text-sm font-bold">{item.users[0].name}</h4>
              <p className='w-full truncate'>{item.leatestMessage && item.leatestMessage.length > 0 ? item.leatestMessage[0].content : ""}</p>
              {/* <p className="text-sm text-gray-500">{item.lastMessage}</p> */}
            </div>
            <div className="h-full py-2"><p className="text-sm">{dayjs(item.createdAt).format("MMMM DD")}</p></div>
          </div>
        ))}
      </div>
      <div className="p-2 py-4">
        <MainButton 
          type="button" 
          className='w-full flex justify-center items-center gap-1 rounded-full'
          onClick={() => setToggleUsersModal(true)}
        >
          <IoChatbubbleEllipsesSharp /><span>Create Chat</span>
        </MainButton>
      </div>
    </div>
    </>
  )
}

export default Sidebar