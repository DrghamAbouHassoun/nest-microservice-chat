import { AppService } from './app.service';
import { IncomingOrder } from './types/order';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    handlerOrderPlaced(order: IncomingOrder): Promise<SentMessageInfo>;
    handleVerifiedEmail(payload: {
        userName: string;
        userEmail: string;
        token: string;
    }): Promise<SentMessageInfo>;
    handleNewMessage(payload: {
        userName: string;
        userEmail: string;
        message: string;
    }): Promise<SentMessageInfo>;
}
