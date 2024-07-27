import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: "users" })
export class User {
    // @Prop({ required: true, unique: true, type: Types.ObjectId })
    // _id: Types.ObjectId;

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    phone: string;

    @Prop()
    image?: string;

    @Prop({ default: false })
    isEmailVerified: boolean;

    @Prop({ default: false })
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);