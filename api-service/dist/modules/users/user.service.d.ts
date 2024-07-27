import { Model, Types } from "mongoose";
import { User } from "src/schemas/user.schema";
import { IUserCreate } from "src/types/user";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    })[]>;
    findUserById(id: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }>;
    findManyUsersByIds({ ids }: {
        ids: Types.ObjectId[];
    }): Promise<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    })[]>;
    createUserAccount(data: IUserCreate): Promise<{
        _id: Types.ObjectId;
        name: string;
        email: string;
        phone: string;
        image: string;
    }>;
    findUserByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }>;
    changeUserStatus({ userId, status }: {
        userId: string;
        status: boolean;
    }): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }>;
    createManyUsers(users: {
        name: string;
        email: string;
        phone: string;
        image: string;
    }[]): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }, Omit<{
        name: string;
        email: string;
        password: string;
        phone: string;
        image: string;
    }, "_id">>[]>;
}
