import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { Chat } from "src/schemas/chat.schema";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("/chats")
export class ChatController {
  constructor(private chatService: ChatService) {};

  @Get("/")
  async findAll(): Promise<Chat[]> {
    return this.chatService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post("/")
  async createChat(@Body() data: { userId: string }, @Request() req) {
    const chat = await this.chatService.createChat({ users: [data.userId.toString(), req.user._id.toString()]});
    console.log("Chat: ", chat);
    return {
      success: true,
      messages: ["Chat created successfully"],
      data: chat,
      status: 201,
    }
  }

  @UseGuards(AuthGuard)
  @Get("/my-chats") 
  async getMyChats(@Request() req) {
    const chats = await this.chatService.getChatsByUserId(req.user._id)
    return {
      success: true,
      messages: ["Fetched successfully"],
      data: chats,
      status: 200,
    }
  }

  @UseGuards(AuthGuard)
  @Get("/my-chats/:id/messages")
  async getChatWithMessages(@Param() id: string, @Request() req) {
    const chat = await this.chatService.getChatById(id, req.user._id);
    return {
      success: true,
      messages: ["Fetched successfully"],
      data: chat,
      status: 200,
    }
  }
}