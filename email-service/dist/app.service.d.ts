import { IncomingOrder } from './types/order';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AppService {
    private mailerService;
    constructor(mailerService: MailerService);
    handleSendEmail(order: IncomingOrder): Promise<SentMessageInfo>;
    handleSendVerifiedEmail(payload: {
        userEmail: string;
        userName: string;
        token: string;
    }): Promise<SentMessageInfo>;
    handleSendNewMessageEmail(payload: {
        userName: string;
        userEmail: string;
        message: string;
    }): Promise<SentMessageInfo>;
}
