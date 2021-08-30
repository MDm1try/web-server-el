import express from 'express';

import update from './update';

const router = express.Router();

router.put('/', update);

export default router;
