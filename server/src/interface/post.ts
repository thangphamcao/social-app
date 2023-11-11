import mongoose from 'mongoose';

import { IUser } from './user';

export interface IPost {
    author: IUser;
    title: string;
    // image: string;
    image: [];
    video?: string;
    like?: mongoose.Types.DocumentArray<ILike>;
    comment?: mongoose.Types.DocumentArray<IComment>;
}

interface IComment {
    user: IUser;
    comment: string;
    image: string;
}

interface ILike {
    user: IUser;
    isLike: boolean;
}
