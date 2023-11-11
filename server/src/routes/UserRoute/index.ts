import { Router } from 'express';
import { userControl } from '../../controllers';
import { verifyToken } from '../../middlewares';
import { upload } from '../../helper/upload';

export const router = Router();

// Get all user
router.get('/', verifyToken, userControl.getAllUsers);

// Get user by ID
router.get('/:id', verifyToken, userControl.getUserByID);

// Get avatar
router.get('/avatar', verifyToken, userControl.getAvatar);

// Update profile
router.put('/update/profile', verifyToken, userControl.updateProfile);

// Update avatar
router.post('/upload/avatar', [verifyToken, upload.single('avatar')], userControl.uploadAvatar);
