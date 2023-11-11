import { IUser } from './user';

export interface IImage {
    author: IUser;
    image?: string;
    path: string;
    type: string;
}
