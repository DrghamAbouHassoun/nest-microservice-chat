import { Model, Types } from "mongoose";
import { Chat } from "src/schemas/chat.schema";
import { Message } from "src/schemas/message.schema";
import { UserService } from "../users/user.service";
export declare class ChatService {
    private chatModel;
    private messageModel;
    private userService;
    constructor(chatModel: Model<Chat>, messageModel: Model<Message>, userService: UserService);
    findAll(): Promise<Chat[]>;
    createChat(data: {
        users: string[];
    }): Promise<{
        _id: Types.ObjectId;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        users: (import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User> & import("../../schemas/user.schema").User & {
            _id: Types.ObjectId;
        })[];
        leatestMessage: any[];
    }>;
    checkAndCreateChat(data: {
        users: string[];
    }): Promise<(import("mongoose").Document<unknown, {}, Chat> & Chat & {
        _id: Types.ObjectId;
    }) | {
        _id: Types.ObjectId;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        users: (import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User> & import("../../schemas/user.schema").User & {
            _id: Types.ObjectId;
        })[];
        leatestMessage: any[];
    }>;
    getChatById(id: string, userId: string): Promise<{
        _id: Types.ObjectId;
        name: string;
        users: (import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User> & import("../../schemas/user.schema").User & {
            _id: Types.ObjectId;
        })[];
        messages: (import("mongoose").Document<unknown, {}, Message> & Message & {
            _id: Types.ObjectId;
        })[];
    }>;
    addMessage(data: {
        chatId: string;
        from: string;
        content: string;
    }): Promise<import("mongoose").Document<unknown, {}, Message> & Message & {
        _id: Types.ObjectId;
    }>;
    getChatsByUserId(userId: string): Promise<Chat[]>;
}
