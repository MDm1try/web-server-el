import express from 'express';

import forgot from './forgot';
import reset from './reset';

const router = express.Router();

router.use('/forgot', forgot);
router.use('/reset', reset);

export default router;
