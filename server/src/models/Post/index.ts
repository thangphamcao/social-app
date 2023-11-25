import mongoose from 'mongoose';
import { IPost } from 'src/interface/post';

const postSchema = new mongoose.Schema<IPost>(
    {
        author: { type: mongoose.Schema.ObjectId, ref: 'users' },
        title: { type: String },
        image: [],
        like: [
            {
                user: { type: mongoose.Types.ObjectId, ref: 'users' },
                isLike: { type: Boolean, default: true },
            },
        ],
        comment: [
            {
                user: { type: mongoose.Types.ObjectId, ref: 'users' },
                comment: { type: String, required: false },
                image: { type: String, required: false },
            },
        ],
    },
    {
        timestamps: true,
    },
);

export const PostModel = mongoose.model<IPost>('posts', postSchema);

export const handlePost = {
    getAllPost: () =>
        PostModel.find()
            .populate('author')
            .populate({ path: 'author', populate: { path: 'avatar', select: 'image path' } })
            .populate({
                path: 'comment',
                populate: { path: 'user', populate: { path: 'avatar', select: 'image path' } },
            })
            .exec(),
    getPostByID: (id: string) => PostModel.findById(id),
    createPost: (value: Record<string, any>) => PostModel.create(value),
    updatePost: (id: {}, value: Record<string, any>, option: {}) => PostModel.findOneAndUpdate(id, value, option),
    deletePost: (id: {}) => PostModel.findOneAndDelete(id),
};
