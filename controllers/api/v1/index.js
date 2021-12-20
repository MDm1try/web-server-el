import express from 'express';

import auth from './auth';
import secure from './secure';
import shared from './shared';

import authenticate from '../../../helpers/auth';

const router = express.Router();

router.use('/auth', auth);
router.use('/secure', authenticate, secure);
router.use('/shared', authenticate, shared);

export default router;
