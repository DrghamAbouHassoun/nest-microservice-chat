"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const verification_email_1 = require("./assets/templates/verification.email");
let AppService = class AppService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async handleSendEmail(order) {
        try {
            const message = {
                to: order.userEmail,
                subject: 'New Order Received',
                text: `Hello ${order.userName},\n\nYou have received a new order for ${order.productName}.\n\nBest regards,\nYour Team`
            };
            const emailSent = await this.mailerService.sendMail(message);
            console.log("Email has sent successfully", order);
            return emailSent;
        }
        catch (error) {
            console.log(error);
            throw new Error("Faild To Send an Email");
        }
    }
    async handleSendVerifiedEmail(payload) {
        try {
            const message = {
                to: payload.userEmail,
                subject: 'Verify Email',
                html: (0, verification_email_1.default)({ token: payload.token }),
            };
            const emailSent = await this.mailerService.sendMail(message);
            console.log("Email has sent successfully", payload);
            return emailSent;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed To Send an Email");
        }
    }
    async handleSendNewMessageEmail(payload) {
        try {
            const message = {
                to: payload.userEmail,
                subject: "New Message Arrived",
                text: `Hello ${payload.userName},\n\nYou have received a new message:\n\n${payload.message}\n\nBest regards,\nYour Team`
            };
            const emailSent = await this.mailerService.sendMail(message);
            return emailSent;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed To Send an Email");
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], AppService);
//# sourceMappingURL=app.service.js.map