import express from 'express';

import accept from './accept';

const router = express.Router();

router.use('/accept', accept);

export default router;
