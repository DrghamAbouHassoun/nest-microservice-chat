import { ChatService } from './chat.service';
import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { WsGuard } from "src/guards/ws.guard";
import { UserModule } from "../users/user.module";
import { ChatController } from "./chat.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from 'src/schemas/chat.schema';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{
      name: "API_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672"],
        queue: "email-queue",
      }
    }]),
    UserModule,
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema }
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, WsGuard],
  exports: [],
})
export class ChatModule { };