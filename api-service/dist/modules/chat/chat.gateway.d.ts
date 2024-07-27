import { JwtService } from "@nestjs/jwt";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { UserService } from "../users/user.service";
import { ChatService } from "./chat.service";
import { ClientProxy } from "@nestjs/microservices";
interface ExtendedSocket extends Socket {
    user: any;
}
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private jwtService;
    private userService;
    private chateService;
    private rabbitClient;
    private connectedClients;
    constructor(jwtService: JwtService, userService: UserService, chateService: ChatService, rabbitClient: ClientProxy);
    server: Server;
    handleConnection(client: ExtendedSocket): void;
    handleDisconnect(client: ExtendedSocket): void;
    afterInit(server: Server): void;
    handlePrivateMessage(client: Socket, message: {
        to: string;
        content: string;
    }): void;
    handleJoinRoom(client: Socket, { roomName }: {
        roomName: string;
    }): void;
    handleLeaveRoom(client: Socket, { roomName }: {
        roomName: string;
    }): void;
    handleSendMessageToRoom(client: Socket, { roomName, content, to }: {
        roomName: string;
        content: string;
        to: string;
    }): Promise<void>;
    handleGetCurrentRoom(client: Socket): void;
}
export {};
