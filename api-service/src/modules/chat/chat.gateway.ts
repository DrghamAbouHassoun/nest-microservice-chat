import { Inject, Logger, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { WsGuard } from "src/guards/ws.guard";
import { UserService } from "../users/user.service";
import { ChatService } from "./chat.service";
import { IUser } from "src/types/user";
import { ClientProxy } from "@nestjs/microservices";

interface ExtendedSocket extends Socket {
  user: any;
}

@WebSocketGateway(5001, { cors: ["*"] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private connectedClients: IUser[] = [];

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private chateService: ChatService,
    @Inject("API_SERVICE") private rabbitClient: ClientProxy,
  ) { }

  @WebSocketServer() server: Server;


  @UseGuards(WsGuard)
  handleConnection(client: ExtendedSocket) {
    const user = client["user"];
    if (user._id) {
      this.userService.changeUserStatus({ userId: user._id, status: true });
      this.connectedClients.push(user);
      console.log("User status updated: ", user._id);
    }
    console.log("Client connected", client.id);
    this.server.emit("clientConnected", user);
  }

  handleDisconnect(client: ExtendedSocket) {
    const user = client["user"];
    if (user._id) {
      this.userService.changeUserStatus({ userId: user._id, status: false });
      this.connectedClients.filter(client => client._id !== user._id);
      console.log("User status updated: ", user._id);
    }
    console.log("Client has disconnected", user._id);
    this.server.emit("clientDisconnected", user);
  }

  afterInit(server: Server) {
    server.use((client, next) => {
      try {
        const [type, token] = client.handshake.headers.authorization?.split(" ");
        if (!token || !type) {
          next(new Error("Invalid token"))
        }
        const result = this.jwtService.verify(token, { secret: process.env.JWT_AUTH_TOKEN });
        if (!result) {
          throw new Error("Invalid authentication token");
        }
        client["user"] = result
        next();
      } catch (error) {
        next(error);
      }

    })
    Logger.log("Websocket initialized")
  }


  @UseGuards(WsGuard)
  @SubscribeMessage("newPrivateMessage")
  handlePrivateMessage(client: Socket, message: { to: string; content: string }) {
    console.log("New Private Message: ", message);
    console.log("User: ", client["user"])

    client.emit("replyToPrivateMessage", message);
  }


  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, { roomName }: { roomName: string }) {
    client.join(roomName);
    console.log(`${client["user"].name} has joined ${roomName}`)
    client.to(roomName).emit("userJoinedToRoom", `${client.id} has joined ${roomName}`)
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, { roomName }: { roomName: string }) {
    console.log(`${client["user"].name} has left ${roomName}`);
    client.leave(roomName)
  }

  @SubscribeMessage("sendMessageToRoom")
  async handleSendMessageToRoom(client: Socket, { roomName, content, to }: { roomName: string; content: string, to: string }) {
    const newMessage = await this.chateService.addMessage({ 
      chatId: roomName, 
      content: content, 
      from: client["user"]._id
    })
    if (!this.connectedClients.find(client => client._id === to)) {
      const otherUser = await this.userService.findUserById(to);
      this.rabbitClient.emit("new-message", { userName: otherUser.name, userEmail: otherUser.email, message: newMessage.content });
    }
    console.log("New Messages: ", newMessage);
    this.server.to(roomName).emit("messageToRoom", { newMessage, senderId: client["user"]._id });
  }

  @SubscribeMessage("currentRoom")
  handleGetCurrentRoom(client: Socket) {
    console.log("Current Room: ", " client: ", client.rooms);
  }
};