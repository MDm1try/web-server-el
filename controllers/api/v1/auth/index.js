import express from 'express';

import login from './login';
import register from './register';
import logout from './logout';

const router = express.Router();

router.use('/login', login);
router.use('/register', register);
router.use('/logout', logout);

export default router;
