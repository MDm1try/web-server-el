import express from 'express';

import update from './update';
import get from './get';

const router = express.Router();

router.put('/', update);
router.get('/:token', get);

export default router;
