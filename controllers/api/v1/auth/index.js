import express from 'express';

import invite from './invite';
import login from './login';
import register from './register';
import logout from './logout';
import password from './password';

const router = express.Router();

router.use('/invite', invite);
router.use('/login', login);
router.use('/register', register);
router.use('/logout', logout);
router.use('/password', password);

export default router;
