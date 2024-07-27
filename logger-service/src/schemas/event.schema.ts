import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EventLogDocument = HydratedDocument<EventLog>;

@Schema({ timestamps: true })
export class EventLog {
    @Prop({ required: true, default: "unknown" })
    type: string;

    @Prop({ required: true, default: "Unknown Event" })
    title: string;

    @Prop({})
    description: string;

    @Prop({ required: true, default: new Date() })
    creationTime: string;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);