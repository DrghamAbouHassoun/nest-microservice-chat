import { ChatService } from "./chat.service";
import { Chat } from "src/schemas/chat.schema";
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    findAll(): Promise<Chat[]>;
    createChat(data: {
        userId: string;
    }, req: any): Promise<{
        success: boolean;
        messages: string[];
        data: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            users: (import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User> & import("../../schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            leatestMessage: any[];
        };
        status: number;
    }>;
    getMyChats(req: any): Promise<{
        success: boolean;
        messages: string[];
        data: Chat[];
        status: number;
    }>;
    getChatWithMessages(id: string, req: any): Promise<{
        success: boolean;
        messages: string[];
        data: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            users: (import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User> & import("../../schemas/user.schema").User & {
                _id: import("mongoose").Types.ObjectId;
            })[];
            messages: (import("mongoose").Document<unknown, {}, import("../../schemas/message.schema").Message> & import("../../schemas/message.schema").Message & {
                _id: import("mongoose").Types.ObjectId;
            })[];
        };
        status: number;
    }>;
}
