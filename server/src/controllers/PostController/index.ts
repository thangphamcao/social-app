import { Request, Response } from 'express';
import { handlePost } from '../../models/Post';
import { handleUser } from '../../models/User';

const postController = {
    getAllPost: async (_req: Request, res: Response) => {
        try {
            const listPost = await handlePost.getAllPost();
            if (listPost === null) {
                return res.json({
                    status: 'No Post',
                });
            }

            return res.status(200).json({
                status: 'Success: Get All Posts',
                posts: listPost,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
    getPostByID: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const post = await handlePost.getPostByID(id);
            return res.status(200).json({
                status: 'Success: Get Post By ID',
                post: post,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const id = req.user?.id as string;
            const user = await handleUser.getUserByID(id);
            const data = req.body;
            const postImage = req.files;

            const newPost = {
                author: user,
                title: data.title,
                image: postImage,
                like: [],
                comment: [],
            };

            const post = await handlePost.createPost(newPost);

            return res.status(200).json({
                status: 'Success: Post has been created',
                post: post,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
    updatePost: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userID = req.user?.id as string;
            const updateCondition = {
                _id: id,
                author: userID,
            };

            const postImage = req.files;

            const postUpdate = await handlePost.updatePost(
                updateCondition,
                { title: req.body.title, image: postImage },
                { new: true },
            );

            if (postUpdate) {
                return res.status(200).json({
                    status: 'Test',
                    postUpdate: postUpdate,
                });
            }
            return res.status(401).json({
                status: 'Fail updating',
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
    deletePost: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userID = req.user?.id as string;
            const deleteCondition = {
                _id: id,
                user: userID,
            };

            const postDeleted = await handlePost.deletePost(deleteCondition);

            if (postDeleted) {
                return res.status(200).json({
                    status: 'Success: Post has been deleted',
                    postDeleted: postDeleted,
                });
            }
            return res.status(401).json({
                status: 'Fail',
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },

    likePost: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userID = req.user?.id as string;
            let isLiked = false;
            let indexUpdate = 0;
            const user = await handleUser.getUserByID(userID);

            const post = await handlePost.getPostByID(id);

            if (post !== null) {
                post?.like?.map((data, index) => {
                    if (data.user?.toString() === userID) {
                        isLiked = true;
                        indexUpdate = index;
                    }
                });

                if (isLiked) {
                    post.like?.splice(indexUpdate, 1);
                } else {
                    post?.like?.push({ user: user });
                }
                post?.save();
            }

            return res.status(200).json({
                status: 'success',
                post: post,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
    isLikePost: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userID = req.user?.id;
            console.log(userID);

            let isLike = false;
            const post = await handlePost
                .getPostByID(id)
                .select('like')
                .populate({ path: 'like', populate: { path: 'user' } });

            if (post?.like?.length !== undefined && post?.like?.length < 0) {
                isLike = false;
            } else {
                post?.like?.map((item: any) => {
                    if (userID === item.user._id.toString()) {
                        isLike = true;
                    }
                });
            }
            return res.status(200).json({
                status: 'Success',
                isLike: isLike,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
    getCommentPostByID: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userID = req.user?.id as string;
            const query = req.query['id'];
            let data = {};

            const post = await handlePost.getPostByID(id);
            if (post !== null) {
                post.comment?.map((item) => {
                    if (userID === item.user.toString() && query === item._id?.toString()) {
                        data = {
                            comment: item.comment || null,
                            image: item.image || null,
                            _id: item._id,
                        };
                        console.log({ comment: item.comment, image: item.image, _id: item._id });
                    }
                });
            }
            return res.status(200).json({
                status: 'Success',
                data: data,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
    commentPost: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userID = req.user?.id as string;
            const { comment } = req.body;
            const { file } = req;
            console.log(file);

            const user = await handleUser.getUserByID(userID);
            const post = await handlePost.getPostByID(id);

            console.log(user);

            if (comment || file) {
                post?.comment?.push({
                    user: user,
                    comment: comment,
                    image: file?.filename,
                    path: file?.path,
                });
            }
            post?.save();

            return res.status(200).json({
                status: 'Success',
                data: post?.comment,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },

    updateComment: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userID = req.user?.id as string;
            const query = req.query['id'];
            const contentUpdate = req.body;

            const post = await handlePost.getPostByID(id);
            if (post !== null) {
                post.comment?.map((item) => {
                    if (userID === item.user.toString() && query === item._id?.toString()) {
                        item.comment = contentUpdate.comment;
                        item.image = contentUpdate.image;
                    }
                });
                post.save();
            }
            return res.status(200).json({
                status: 'Success: Comment updated',
                data: post,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },

    deleteComment: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userID = req.user?.id as string;
            const query = req.query['id'];
            console.log({
                id: id,
                query: query,
            });

            let indexCommentToDelete = 0;

            const post = await handlePost.getPostByID(id);

            if (post !== null) {
                post.comment?.map((item, index) => {
                    if (userID === item.user.toString() && query === item._id?.toString()) {
                        indexCommentToDelete = index;
                    }
                });
                post.comment?.splice(indexCommentToDelete, 1);
                post.save();
            }

            return res.status(200).json({
                status: 'Success: Comment deleted',
                data: post,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },

    testCreate: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userID = req.user?.id as string;
            const updateCondition = {
                _id: id,
                author: userID,
            };

            const postImage = req.files;

            const postUpdate = await handlePost.updatePost(
                updateCondition,
                { title: req.body.title, image: postImage },
                { new: true },
            );

            if (postUpdate) {
                return res.status(200).json({
                    status: 'Test',
                    postUpdate: postUpdate,
                });
            }
            return res.status(401).json({
                status: 'Fail updating',
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Fail',
                message: error.message,
            });
        }
    },
};

export default postController;
