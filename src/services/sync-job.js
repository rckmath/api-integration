import schedule from 'node-schedule';

import Constants from '../config/constants.js';
import initializeDatabase from '../config/db.js';
import DealOrderService from './deal-order.js';

initializeDatabase(Constants, true);

let syncDealsJobRunning = false;

/* eslint-disable import/prefer-default-export */
/**
 * Cron job task that runs everyday at 11:59pm, calling the DealOrderService to syncing all pending deals
 *
 * Reference: https://crontab.guru/#59_23_*_*_*
 */
schedule.scheduleJob('59 23 * * *', async () => {
  if (syncDealsJobRunning) { return; }

  try {
    syncDealsJobRunning = true;
    await DealOrderService.syncNow();
  } catch (err) {
    console.error(err);
  } finally {
    syncDealsJobRunning = false;
  }
});
