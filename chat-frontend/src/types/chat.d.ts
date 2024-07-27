
export interface IMessage {
  _id: string,
    chatId: string,
    senderId: string,
    content: string,
    createdAt: Date
}

export interface IChat {
  _id: string;
  name: string;
  users: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
  }[];
  leatestMessage: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatWithMessages extends IChat {
  messages: IMessage[];
}