
export interface IUserCreate {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
}