import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../types/chat";

export interface IncomingUser  {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
}

// export interface IChat {
//   _id: string;
//   name: string;
//   users: IncomingUser[];
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface ChatState {
  currentChatId: string;
  chats: IChat[],
}

const initialState: ChatState = {
  currentChatId: '',
  chats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChatId: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },
    setChats: (state, action: PayloadAction<IChat[]>) => {
      state.chats = action.payload;
    },
    addOneChat: (state, action: PayloadAction<IChat>) => {
      state.chats.push(action.payload);
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats.filter((item) => item._id !== action.payload);
    }
  }
})

export const { setCurrentChatId, setChats, addOneChat, deleteChat } = chatSlice.actions

export default chatSlice.reducer;