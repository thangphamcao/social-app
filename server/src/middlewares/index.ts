const jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
    const token = req.header('Authorization') as string;
    console.log(token);

    if (token) {
        const accessToken = token.split(' ')[1];
        try {
            const decode = jwt.verify(accessToken, 'SECRET_TOKEN') as JwtPayload & { id: string };
            req.user = decode;
        } catch (error) {
            console.log(error);
        }
        next();
    } else {
        res.status(401).json("You're not authenticated");
    }
};

export { verifyToken };
