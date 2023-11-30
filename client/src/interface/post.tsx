export interface IPost {
    post: IDetailPost[] | null;
    error: string | null;
    loading: boolean;
    success: boolean;
}
export interface IDetailPost {
    _id: string | null;
    title: string | null;
    author: {
        _id: string | null;
        displayName: string | null;
        avatar: {
            image: string;
        };
    };
    image: {
        filename: string;
    }[];
    like: ILike[];
    comment: IComment[];
    createdAt: string | null;
}

export interface ILike {
    user: string;
    isLike: boolean;
}

export interface IComment {
    user: {
        _id: string | null;
        displayName: string | null;
        avatar: {
            image: string;
        };
    };
    comment: string | null;
    image: string | null;
    _id: string;
}
