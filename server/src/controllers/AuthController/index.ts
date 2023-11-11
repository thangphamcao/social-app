import { Request, Response } from 'express';
import { UserModel, handleUser } from '../../models/User';
import { random, authentication, createToken } from '../../helper/index';

const jwt = require('jsonwebtoken');

let refreshTokens: any[] = [];

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Missing email or password',
                });
            }
            console.log(name);

            const existingUser = await UserModel.findOne({ email: req.body.email });

            if (existingUser) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Email has already been used',
                });
            }

            // hash password
            const salt = random;
            const newUser = await handleUser.createUser({
                email: email,
                displayName: name,
                isAdmin: false,
                authentication: {
                    salt,
                    password: authentication(salt, password),
                },
                avatar: null,
            });

            return res.status(200).json({
                status: 'success',
                user: newUser,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Missing email or password',
                });
            }

            // get user by email from UserModel with authentication [salt, password]}
            const user = await handleUser.getUserByEmail(email).select('+authentication.salt +authentication.password');

            if (!user) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Wrong email or password',
                });
            }

            const expectedHash = authentication(user!.authentication.salt, password);

            if (user!.authentication.password !== expectedHash) {
                return res.status(404).json({
                    status: 'Fail',
                    message: 'Wrong email or password',
                });
            }

            const userDetail = await handleUser.getUserByID(user._id.toString());

            const accessToken = createToken(user!._id, 'SECRET_TOKEN');

            const refreshToken = createToken(user!._id, 'SECRET_REFRESHTOKEN', 'refreshToken');
            refreshTokens.push(refreshToken);

            const response = {
                status: 'Log in',
                user: {
                    id: userDetail!._id,
                    displayName: userDetail!.displayName,
                    email: userDetail!.email,
                    isAdmin: userDetail!.isAdmin,
                    avatar: userDetail!.avatar ? userDetail?.avatar.image : null,
                },
                accessToken: accessToken,
            };

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
                path: '/',
            });

            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },

    refreshToken: async (req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies['refreshToken'];
            console.log(refreshToken);

            if (!refreshToken) {
                return res.status(401);
            } else {
                const decoded = jwt.verify(refreshToken, 'SECRET_REFRESHTOKEN');
                // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
                const newAccessToken = createToken(decoded.id, 'SECRET_TOKEN');
                // const newRefreshToken = createToken(decoded.id, 'SECRET_REFRESHTOKEN', 'refreshToken');
                // refreshTokens.push(newRefreshToken);
                // res.cookie('refreshToken', newRefreshToken, {
                //     httpOnly: true,
                //     secure: true,
                //     path: '/',
                //     sameSite: 'strict',
                // });
                return res.status(200).json({
                    success: true,
                    accessToken: newAccessToken,
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
    logOut: async (req: Request, res: Response) => {
        try {
            refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
            res.clearCookie('refreshToken');
            return res.status(200).json('Logged out successfully!');
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
};

export default authController;
