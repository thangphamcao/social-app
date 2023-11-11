// INTERFACE USER
export interface IAUth {
    success: boolean;
    loading: boolean;
    user: IUser | null;
    error: string | null;
}

export interface IUser {
    id: string | null;
    isAdmin: boolean;
    email: string | null;
    avatar: string | null;
    accessToken: string | null;
    displayName: null;
}

export interface IDecoded {
    id: string;
    exp: number;
    iat: number;
}

export interface IInputLogin {
    email: string;
    password: string;
}
