import express from 'express';

import get from './get';

const router = express.Router({ mergeParams: true });

router.get('/', get);

export default router;
