import express from 'express';

import DealOrder from './deal-order.js';

const router = express.Router();

router.use('/deal-order', DealOrder);

// eslint-disable-next-line import/prefer-default-export
export { router };
