import express from 'express';

import profile from './profile';
import parcel from './parcel';
import posts from './posts';

const router = express.Router();

router.use('/profile', profile);
router.use('/parcel', parcel);
router.use('/posts', posts);

export default router;
