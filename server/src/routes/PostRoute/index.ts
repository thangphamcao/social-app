import { Router } from 'express';
import { postController } from '../../controllers';
import { verifyToken } from '../../middlewares';
import { upload } from '..//../helper/upload';
// import { upload } from '../../helper/upload';

export const router = Router();

// get all post
router.get('/', verifyToken, postController.getAllPost);

// get post by id
router.get('/:id', verifyToken, postController.getPostByID);

// create post
router.post('/create', [verifyToken, upload.array('postImg', 3)], postController.create);

// update post
router.put('/update/:id', [verifyToken, upload.array('postImg', 3)], postController.updatePost);

// delete post
router.delete('/delete/:id', verifyToken, postController.deletePost);

// like post
router.put('/like/:id', verifyToken, postController.likePost);

// isLike post
router.get('/islike/:id', verifyToken, postController.isLikePost);

// comment post
router.post('/comment/:id', verifyToken, postController.commentPost);

// update comment
router.put('/comment/update/:id', verifyToken, postController.updateComment);

// delete comment
router.delete('/comment/delete/:id', verifyToken, postController.deleteComment);
