import express from 'express';

import auth from './auth';
import secure from './secure';

const router = express.Router();

router.use('/auth', auth);
router.use('/secure', secure);

export default router;
