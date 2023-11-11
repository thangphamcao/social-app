import mongoose from 'mongoose';
import { IUser } from 'src/interface/user';

const UserSchema = new mongoose.Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        displayName: { type: String },
        avatar: { type: mongoose.Schema.ObjectId, ref: 'avatars' },
        isAdmin: { type: Boolean },
        authentication: {
            password: { type: String, required: true, minlength: 6, select: false },
            salt: { type: String, select: false },
            tokenVersion: { type: Number, select: true },
        },
    },
    {
        timestamps: true,
    },
);

export const UserModel = mongoose.model<IUser>('users', UserSchema);

export const handleUser = {
    getAllUsers: () => UserModel.find(),
    getUserByID: (id: string) => UserModel.findById(id).populate('avatar').exec(),
    getUserByEmail: (email: string) => UserModel.findOne({ email }),
    createUser: (value: Record<string, any>) => UserModel.create(value),
    updateUser: (id: string, value: Record<string, any>, option: {}) => UserModel.findByIdAndUpdate(id, value, option),
};
