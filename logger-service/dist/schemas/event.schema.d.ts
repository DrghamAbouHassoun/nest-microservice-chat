import { HydratedDocument } from "mongoose";
export type EventLogDocument = HydratedDocument<EventLog>;
export declare class EventLog {
    type: string;
    title: string;
    description: string;
    creationTime: string;
}
export declare const EventLogSchema: import("mongoose").Schema<EventLog, import("mongoose").Model<EventLog, any, any, any, import("mongoose").Document<unknown, any, EventLog> & EventLog & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventLog, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<EventLog>> & import("mongoose").FlatRecord<EventLog> & {
    _id: import("mongoose").Types.ObjectId;
}>;
