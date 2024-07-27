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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("../../schemas/chat.schema");
const message_schema_1 = require("../../schemas/message.schema");
const uuid_1 = require("uuid");
const user_service_1 = require("../users/user.service");
let ChatService = class ChatService {
    constructor(chatModel, messageModel, userService) {
        this.chatModel = chatModel;
        this.messageModel = messageModel;
        this.userService = userService;
    }
    ;
    async findAll() {
        return await this.chatModel.find().exec();
    }
    async createChat(data) {
        const users = await this.userService.findManyUsersByIds({ ids: data.users.map(item => new mongoose_2.Types.ObjectId(item)) });
        if (!users && users.length < 1) {
            throw new common_1.HttpException({
                success: false,
                status: 404,
                messages: ['User not found'],
                data: [],
            }, 200);
        }
        const chat = await this.chatModel.create({
            name: (0, uuid_1.v4)(),
            users: users.map(item => item._id),
        });
        console.log("Cahts : ", chat);
        return {
            _id: chat._id,
            name: chat.name,
            createdAt: new Date(),
            updatedAt: new Date(),
            users: [users[1]],
            leatestMessage: []
        };
    }
    async checkAndCreateChat(data) {
        const existingChat = await this.chatModel.findOne({ users: { $all: data.users } });
        if (existingChat) {
            return existingChat;
        }
        else {
            return await this.createChat(data);
        }
    }
    async getChatById(id, userId) {
        const objectChatId = new mongoose_2.Types.ObjectId(id);
        const [chat, messages] = await Promise.all([
            await this.chatModel.findById(objectChatId).populate({
                path: "users",
                match: { _id: { $ne: userId } },
                select: {
                    _id: true,
                    name: true,
                    image: true,
                    email: true,
                    phone: true,
                }
            }),
            await this.messageModel.find({ chatId: objectChatId }),
        ]);
        const users = await this.userService.findManyUsersByIds({ ids: chat.users.map(item => new mongoose_2.Types.ObjectId(item)) });
        return {
            _id: chat._id,
            name: chat.name,
            users: users,
            messages
        };
    }
    async addMessage(data) {
        const message = await this.messageModel.create({
            senderId: new mongoose_2.Types.ObjectId(data.from),
            chatId: new mongoose_2.Types.ObjectId(data.chatId),
            content: data.content
        });
        return message;
    }
    async getChatsByUserId(userId) {
        const objectUserId = new mongoose_2.Types.ObjectId(userId);
        try {
            console.log("UserID: ", objectUserId);
            const aggregatedChats = await this.chatModel.aggregate([
                { $match: { users: objectUserId } },
                { $sort: { updatedAt: -1 } },
                {
                    $lookup: {
                        from: "messages",
                        localField: "_id",
                        foreignField: "chatId",
                        as: "leatestMessage",
                        pipeline: [
                            { $sort: { createdAt: -1 } },
                            { $limit: 1 }
                        ]
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "users",
                        foreignField: "_id",
                        as: "users",
                        pipeline: [
                            { $match: { _id: { $ne: objectUserId } } }
                        ],
                    },
                },
            ]);
            return aggregatedChats.sort((a, b) => a.leatestMessage.createdAt - b.leatestMessage.createdAt);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({ error }, 200);
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __param(1, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        user_service_1.UserService])
], ChatService);
//# sourceMappingURL=chat.service.js.map