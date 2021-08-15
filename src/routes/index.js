import express from 'express';
import dayjs from 'dayjs';

import Constants from '../config/constants.js';
import { router as controllers } from '../controllers/index.js';

const router = express.Router();

const formatUptime = (s) => {
  function pad(val) { return (val < 10 ? '0' : '') + val; }

  const hours = Math.floor(s / (60 * 60));
  const minutes = Math.floor((s % (60 * 60)) / 60);
  const seconds = Math.floor(s % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

router.get('/status',
  async (_req, res) => res.json({
    env: Constants.env,
    serverTime: dayjs().format(),
    uptime: formatUptime(process.uptime()),
  }));

router.use('/', controllers);

export default router;
