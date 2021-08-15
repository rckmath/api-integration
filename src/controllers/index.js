import express from 'express';

import Deal from './deal.js';

const router = express.Router();

router.use('/deal', Deal);

// eslint-disable-next-line import/prefer-default-export
export { router };
