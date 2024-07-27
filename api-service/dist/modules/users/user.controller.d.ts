import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<{
        success: boolean;
        messages: string[];
        data: (import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User> & import("../../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        status: number;
    }>;
    createManyUsers(createManyUsersDto: {
        name: string;
        email: string;
        phone: string;
        image: string;
    }[]): Promise<{
        success: boolean;
        messages: string[];
        data: Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../../schemas/user.schema").User> & import("../../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, Omit<{
            name: string;
            email: string;
            password: string;
            phone: string;
            image: string;
        }, "_id">>[]>;
        status: number;
    }>;
}
