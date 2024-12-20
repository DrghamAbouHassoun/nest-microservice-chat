import { HydratedDocument, Types } from "mongoose";
export type MessageDocument = HydratedDocument<Message>;
export declare class Message {
    senderId: Types.ObjectId;
    chatId: Types.ObjectId;
    content: string;
}
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, import("mongoose").Document<unknown, any, Message> & Message & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Message>> & import("mongoose").FlatRecord<Message> & {
    _id: Types.ObjectId;
}>;
