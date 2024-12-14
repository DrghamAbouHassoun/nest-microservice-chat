import { HydratedDocument, Types } from "mongoose";
export type PostDocument = HydratedDocument<PostSchema>;
export declare class PostSchema {
    userId: Types.ObjectId;
    content: string;
}
export declare const Post: import("mongoose").Schema<PostSchema, import("mongoose").Model<PostSchema, any, any, any, import("mongoose").Document<unknown, any, PostSchema> & PostSchema & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PostSchema, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PostSchema>> & import("mongoose").FlatRecord<PostSchema> & {
    _id: Types.ObjectId;
}>;
