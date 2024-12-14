import { EventLog } from './schemas/event.schema';
import { Model } from 'mongoose';
import { IEvent } from './types/event';
export declare class AppService {
    private eventLogModel;
    constructor(eventLogModel: Model<EventLog>);
    handleLogEvent(data: IEvent): Promise<import("mongoose").Document<unknown, {}, EventLog> & EventLog & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
