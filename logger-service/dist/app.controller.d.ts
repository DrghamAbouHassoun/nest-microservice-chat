import { AppService } from './app.service';
import { IEvent } from './types/event';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    handleLogEvent(event: IEvent): Promise<import("mongoose").Document<unknown, {}, import("./schemas/event.schema").EventLog> & import("./schemas/event.schema").EventLog & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
