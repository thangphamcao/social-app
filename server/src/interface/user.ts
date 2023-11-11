import { IImage } from './image';

export interface IUser {
    email: string;
    displayName: string;
    avatar: IImage;
    isAdmin: boolean;
    authentication: IAuthentication;
}

interface IAuthentication {
    password: string;
    salt: string;
    tokenVersion: number;
}
