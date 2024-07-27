import { Injectable } from '@nestjs/common';
import { IncomingOrder } from './types/order';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import verificationEmailGenerator from './assets/templates/verification.email';

@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}

  async handleSendEmail(order: IncomingOrder) {
    try {
      const message: ISendMailOptions = {
        to: order.userEmail,
        subject: 'New Order Received',
        text: `Hello ${order.userName},\n\nYou have received a new order for ${order.productName}.\n\nBest regards,\nYour Team`
      }
      const emailSent = await this.mailerService.sendMail(message);
      console.log("Email has sent successfully", order);
      return emailSent;
    } catch (error) {
      console.log(error);
      throw new Error("Faild To Send an Email")
    }
  }

  async handleSendVerifiedEmail(payload: { userEmail: string; userName: string, token: string }) {
    try {
      const message: ISendMailOptions = {
        to: payload.userEmail,
        subject: 'Verify Email',
        html: verificationEmailGenerator({ token: payload.token }),
      }
      const emailSent = await this.mailerService.sendMail(message);
      console.log("Email has sent successfully", payload);
      return emailSent;
    } catch (error) {
      console.log(error);
      throw new Error("Failed To Send an Email")
    }
  }

  async handleSendNewMessageEmail(payload: { userName: string, userEmail: string, message: string }) {
    try {
      const message: ISendMailOptions = {
        to: payload.userEmail,
        subject: "New Message Arrived",
        text: `Hello ${payload.userName},\n\nYou have received a new message:\n\n${payload.message}\n\nBest regards,\nYour Team`
      }
      const emailSent = await this.mailerService.sendMail(message);
      return emailSent
    } catch (error) {
      console.log(error);
      throw new Error("Failed To Send an Email")
    }
  }
}
