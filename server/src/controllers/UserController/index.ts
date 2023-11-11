import { Request, Response } from 'express';
import { handleUser } from '../../models/User';
import { handleAvatar } from '../../models/Avatar';
import mongoose from 'mongoose';
const userController = {
    getAllUsers: async (_req: Request, res: Response) => {
        try {
            const list = await handleUser.getAllUsers();
            return res.status(200).json({
                status: 'Success',
                data: list,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    getUserByID: async (req: Request, res: Response) => {
        try {
            const id = req.user?.id as string;
            const user = await handleUser.getUserByID(id);

            return res.status(200).json({
                status: 'Success',
                data: user,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    getAvatar: async (req: Request, res: Response) => {
        try {
            const userID = req.user?.id as string;
            const authorID = new mongoose.Types.ObjectId(userID);

            const avatar = await handleAvatar.getAvatarByAuthor({ author: authorID });

            return res.status(200).json({
                status: 'Success',
                avatar: avatar,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    updateProfile: async (req: Request, res: Response) => {
        try {
            const userID = req.user?.id as string;

            const update = req.body;

            const updateProfile = await handleUser.updateUser(userID, update, { new: true });

            return res.status(200).json({
                status: 'Success',
                data: updateProfile,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    uploadAvatar: async (req: Request, res: Response) => {
        try {
            const { file } = req;
            if (file === undefined) {
                return res.status(400).json({
                    status: 'This is not image file!',
                });
            }
            const id = req.user?.id as string;

            const user = await handleUser.getUserByID(id);

            const listImage = await handleAvatar.getAllImage();

            let hasAvatar = false;

            listImage.map((item) => {
                if (item.author.toString() === id) {
                    hasAvatar = true;
                }
            });

            if (hasAvatar) {
                const updateAvatar = await handleAvatar.updateAvatar(
                    { author: user },
                    { image: file.filename, path: file.path },
                    { new: true },
                );
                const updateProfile = await handleUser.updateUser(id, { avatar: updateAvatar?._id }, { new: true });
                return res.status(200).json({
                    status: 'Success: Avatar updated',
                    image: updateAvatar,
                    user: updateProfile,
                });
            } else {
                const newImage = await handleAvatar.createImage({
                    author: user,
                    image: file.filename,
                    path: file.path,
                    type: 'avatar',
                });
                return res.status(200).json({
                    status: 'Success: Avatar created',
                    image: listImage,
                    newImage: newImage,
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
};

export default userController;
