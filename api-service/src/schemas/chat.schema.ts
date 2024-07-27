import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class ChatUser {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop()
    image?: string;
}

@Schema({ timestamps: true })
export class Chat {
    @Prop({ default: "" })
    name?: string;

    @Prop({ type: [{type: Types.ObjectId, ref: 'User'}],  })
    users: Types.ObjectId[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);