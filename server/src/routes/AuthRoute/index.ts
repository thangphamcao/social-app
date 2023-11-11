import { Router } from 'express';
import { authControl } from '../../controllers';
import { verifyToken } from '../../middlewares';

export const router = Router();

router.post('/register', authControl.register);
router.post('/login', authControl.login);
router.get('/token', authControl.refreshToken);
router.post('/logout', verifyToken, authControl.logOut);
