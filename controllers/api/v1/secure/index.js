import express from 'express';

import profile from './profile';
import parcel from './parcel';
import posts from './posts';
import geoEncoder from './geoEncoder';

const router = express.Router();

router.use('/profile', profile);
router.use('/parcel', parcel);
router.use('/posts', posts);
router.use('/geo-encoder', geoEncoder);

export default router;
