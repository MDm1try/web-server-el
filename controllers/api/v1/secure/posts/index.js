import express from 'express';

import create from './create';
import get from './get';

const router = express.Router();

router.post('/', create);
router.get('/:postId', get);

export default router;
