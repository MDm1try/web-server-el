import express from 'express';

import locationAutocomplete from './locationAutocomplete';

const router = express.Router({ mergeParams: true });

router.use('/location-autocomplete', locationAutocomplete);

export default router;
