import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Chat } from "src/schemas/chat.schema";
import { Message } from "src/schemas/message.schema";
import { v4 as uuidv4 } from 'uuid'
import { UserService } from "../users/user.service";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private userService: UserService
  ) { };

  async findAll(): Promise<Chat[]> {
    return await this.chatModel.find().exec();
  }

  async createChat(data: { users: string[] }) {
    const users = await this.userService.findManyUsersByIds({ ids: data.users.map(item => new Types.ObjectId(item)) })
    if (!users && users.length < 1) {
      throw new HttpException({
        success: false,
        status: 404,
        messages: ['User not found'],
        data: [],
      }, 200)
    }
    const chat = await this.chatModel.create({
      name: uuidv4(),
      users: users.map(item => item._id),
    })
    console.log("Cahts : ", chat)
    return { 
      _id: chat._id, 
      name: chat.name, 
      createdAt: new Date(), 
      updatedAt: new Date(),
      users: [users[1]], 
      leatestMessage: []
    };
  }

  async checkAndCreateChat(data: { users: string[] }) {
    const existingChat = await this.chatModel.findOne({ users: { $all: data.users } });
    if (existingChat) {
      return existingChat;
    } else {
      return await this.createChat(data);
    }
  }

  async getChatById(id: string, userId: string) {
    // const objectUserId = userId;
    const objectChatId = new Types.ObjectId(id);
    const [chat, messages] = await Promise.all([
      await this.chatModel.findById(objectChatId).populate({
        path: "users",
        match: { _id: { $ne: userId } },
        select: {
          _id: true,
          name: true,
          image: true,
          email: true,
          phone: true,
        }
      }),
      await this.messageModel.find({ chatId: objectChatId }),
    ])
    const users = await this.userService.findManyUsersByIds({ ids: chat.users.map(item => new Types.ObjectId(item)) })
    return {
      _id: chat._id, 
      name: chat.name, 
      users: users, 
      messages 
    };
  }

  async addMessage(data: { chatId: string, from: string, content: string }) {
    const message = await this.messageModel.create({
      senderId: new Types.ObjectId(data.from),
      chatId: new Types.ObjectId(data.chatId),
      content: data.content
    })
    return message;
  }

  async getChatsByUserId(userId: string): Promise<Chat[]> {
    const objectUserId = new Types.ObjectId(userId);
    try {
      console.log("UserID: ", objectUserId)
      const aggregatedChats = await this.chatModel.aggregate([
        { $match: { users: objectUserId } },
        { $sort: { updatedAt: -1 } },
        {
          $lookup: {
            from: "messages",
            localField: "_id",
            foreignField: "chatId",
            as: "leatestMessage",
            pipeline: [
              { $sort: { createdAt: -1 } },
              { $limit: 1 }
            ]
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "users",
            foreignField: "_id",
            as: "users",
            pipeline: [
              { $match: { _id: { $ne: objectUserId }}}
            ],
          },
        },
      ])
      return aggregatedChats.sort((a, b) => a.leatestMessage.createdAt - b.leatestMessage.createdAt);
    } catch (error) {
      console.log(error);
      throw new HttpException({ error }, 200)
    }
  }
}

// const chats = await this.chatModel.find({
//   users: objectUserId,
// }).populate({
//   path: "users",
//   match: { _id: { $ne: objectUserId } },
//   select: {
//     _id: true,
//     name: true,
//     image: true,
//     email: true,
//     phone: true,
//   }
// });