import express from 'express';

import auth from './auth';
import secure from './secure';

import authenticate from '../../../helpers/auth';

const router = express.Router();

router.use('/auth', auth);
router.use('/secure', authenticate, secure);

export default router;
