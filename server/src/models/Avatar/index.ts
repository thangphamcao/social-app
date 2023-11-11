import { IImage } from '../../interface/image';
import mongoose from 'mongoose';

const avatarSchema = new mongoose.Schema<IImage>(
    {
        author: { type: mongoose.Schema.ObjectId, ref: 'users' },
        image: { type: String },
        path: { type: String },
        type: { type: String },
    },
    {
        timestamps: true,
    },
);

export const AvatarModel = mongoose.model<IImage>('avatars', avatarSchema);

export const handleAvatar = {
    getAllImage: () => AvatarModel.find(),
    createImage: (value: Record<string, any>) => AvatarModel.create(value),
    getAvatarByAuthor: (author: any) => AvatarModel.findOne(author),
    updateAvatar: (id: {}, value: Record<string, any>, option: {}) => AvatarModel.findOneAndUpdate(id, value, option),
};
