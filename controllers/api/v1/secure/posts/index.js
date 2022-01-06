import express from 'express';

import create from './create';
import get from './get';
import byId from './byId';

const router = express.Router({ mergeParams: true });

router.post('/', create);
router.use('/:postId', byId);
router.get('/', get);

export default router;
