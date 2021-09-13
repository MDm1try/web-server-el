import express from 'express';

import name from './name';
import login from './phone';

const router = express.Router();

router.use('/name', name);
router.use('/phone', login);

export default router;
