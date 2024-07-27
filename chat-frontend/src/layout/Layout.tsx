import { useDispatch, useSelector } from 'react-redux';
import MainButton from '../components/buttons/MainButton';
import Sidebar from './Sidebar';
import { logout } from '../app/features/auth.slice';
import { RootState } from '../app/store';

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
}

const Layout = ({ children }: LayoutProps) => {
  const chat = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  const currentChat = chat.chats.find(item => item._id === chat.currentChatId);

  const handleLogout = () => {
    dispatch(logout())
    window.location.reload();
  }

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-dark-100 text-white">
      <div className="w-full max-w-[1200px] flex mx-auto h-[80%] shadow rounded-lg overflow-hidden bg-dark-200">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="h-[60px] p-2 flex justify-between bg-mixed-200">
            <div className="flex gap-2 items-center">
              {currentChat && currentChat.users[0].image ? 
              <img src={currentChat.users[0].image} alt={currentChat.users[0].name} className="w-[45px] h-[45px] rounded-full" /> : null}
              {currentChat ? currentChat.users[0].name : null}
            </div>
            <MainButton type="button" onClick={() => handleLogout()}>Logout</MainButton>

          </div>
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout