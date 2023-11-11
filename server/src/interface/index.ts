declare module 'jsonwebtoken' {
    export interface JwtPayload {
        id: string;
    }
}

interface User {
    id: string;
}

declare namespace Express {
    export interface Request {
        user?: User;
    }
}
