import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PostDocument = HydratedDocument<PostSchema>;

@Schema({ timestamps: true })
export class PostSchema {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  content: string;

}

export const Post = SchemaFactory.createForClass(PostSchema)