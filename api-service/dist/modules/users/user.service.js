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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../schemas/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    ;
    async findAll() {
        const users = await this.userModel.find().select("name email mobile");
        return users;
    }
    async findUserById(id) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new common_1.HttpException({
                    success: false,
                    messages: ["User not found"],
                    data: [],
                    status: 404,
                }, 200);
            }
            return user;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                success: false,
                messages: ["Something went wrong"],
                data: [],
                status: 500,
            }, 200);
        }
    }
    async findManyUsersByIds({ ids }) {
        const users = await this.userModel.find({ _id: { $in: ids } });
        return users;
    }
    async createUserAccount(data) {
        const user = await this.userModel.findOne({ $or: [{ email: data.email, name: data.name }] });
        if (user) {
            throw new common_1.HttpException({
                success: false,
                messages: ["User email or name is already taken"],
                data: [],
                status: 400,
            }, 200);
        }
        const newUser = await this.userModel.create({
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
        });
        return {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            image: newUser.image,
        };
    }
    async findUserByEmail(email) {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new common_1.HttpException({
                success: false,
                messages: ["User not found"],
                data: [],
                status: 404,
            }, 200);
        }
        return user;
    }
    async changeUserStatus({ userId, status }) {
        const user = await this.userModel.findByIdAndUpdate(userId, { isActive: status }, { new: true });
        if (!user) {
            throw new common_1.HttpException({
                success: false,
                messages: ["User not found"],
                data: [],
                status: 404,
            }, 200);
        }
        return user;
    }
    async createManyUsers(users) {
        try {
            const newUsers = await this.userModel.insertMany(users.map(user => ({
                name: user.name,
                email: user.email,
                password: "password1234",
                phone: user.phone,
                image: user.image
            })));
            return newUsers;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                success: false,
                messages: ["Failed to create users"],
                data: [],
                status: 500,
                error
            }, 200);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
;
//# sourceMappingURL=user.service.js.map