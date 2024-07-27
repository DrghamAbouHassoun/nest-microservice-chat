import { Modal } from 'flowbite-react'
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { globalVariables } from '../../config/contants'
import { IUser } from '../../app/features/auth.slice'
import { LuLoader2 } from 'react-icons/lu'
import MainButton from '../buttons/MainButton'
import { useFormik } from 'formik'
import { createChate } from '../../api/chat.requests'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { addOneChat } from '../../app/features/chat.slice'

interface UsersModalProps {
  onClose: () => void;
  onUserSelect: (user: IUser) => void;
  isShow: boolean;
}

const UsersModal = ({ onClose, onUserSelect, isShow }: UsersModalProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const { data, error, loading } = useFetch<IUser[]>(`${globalVariables.backendApiUrl}/users`, { method: "GET" });

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: { selectedUser: "" },
    onSubmit: async (values) => {
      console.log(values);
      setSubmitLoading(true);
      if (!values.selectedUser) {
        toast.error(`User should be selected`);
        setSubmitLoading(false);
        return;
      }
      const { data, error } = await createChate({ userId: values.selectedUser }, auth.token);
      if (error || !data) {
        toast.error(`Failed to create chat: ${error}`);
        setSubmitLoading(false);
        return;
      }
      console.log("Data; ", data)
      dispatch(addOneChat(data))
      setSubmitLoading(false);
      onClose();
      return;
    },
  });

  return (
    <Modal size={"sm"} show={isShow} onClose={onClose} className='bg-dark-100 text-white'>
      <form onSubmit={handleSubmit}>
        <Modal.Header className='bg-dark-200 text-white'>
          <h3 className='text-white font-bold'>Select User</h3>
        </Modal.Header>
        <Modal.Body className='bg-dark-100 text-white custom-scrollbar'>
          <div className="max-h-[300px]">
            {loading ?
              <div className="w-full h-full flex justify-center items-center">
                <LuLoader2 className='animate-spin' size={32} />
              </div> :
              error ?
                <p className="text-red-400 border border-red-400">{error}</p> :
                data && data.length > 0 ?
                  data.map((user) => (
                    <div
                      key={user._id}
                      className={`flex p-3 gap-3 items-center hover:bg-mixed-300 cursor-pointer ${user._id === values.selectedUser ? "bg-mixed-300" : ""}`}
                      onClick={() => setFieldValue("selectedUser", user._id)}
                    >
                      <div className="rounded-full overflow-hidden w-[50px] h-[50px]">
                        {user.image ?
                          <img className="object-cover w-full h-full" src={user.image} alt={user.name} /> :
                          <div className="w-full h-full flex justify-center items-center bg-gray-800">
                            <b className="text-2xl">{user.name[0]}</b>
                          </div>
                        }
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{user.name}</h4>
                      </div>
                    </div>
                  )) : <p>There are no users</p>}
          </div>
        </Modal.Body>
        <Modal.Footer className='bg-dark-200 text-white'>
          <div className="flex gap-1 justify-between items-center p-2 w-full">
            <div></div>
            <div className="flex justify-center items-center gap-2">
              <MainButton type="button" onClick={onClose}>Cancel</MainButton>
              <MainButton type="submit" loading={submitLoading}>
                Select
              </MainButton>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default UsersModal