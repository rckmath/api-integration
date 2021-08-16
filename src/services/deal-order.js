import dayjs from 'dayjs';

import DealOrderModel from '../models/deal-order.js';

import BlingOrderService from './bling/order.js';
import PipedriveDealService from './pipedrive/deal.js';

export default class DealService {

  /**
   *
   * @returns {Promise<DealOrderModel>} Promise of a deal order object
   */
  static async syncNow() {
    let response = [];

    const toSyncDeals = await this.getToSyncDeals();

    const ordersPromises = toSyncDeals.map(async (deal) => {
      const order = await BlingOrderService.createOrder(deal);

      return { ...order, ...deal };
    });

    const createdOrders = await Promise.allSettled(ordersPromises);

    const orders = createdOrders.map((co) => {
      if (co.status === 'fulfilled') {
        return co?.value;
      }

      return console.error(JSON.stringify(co.reason?.message));
    }).filter((o) => o);

    if (orders && orders.length) {
      const dealOrder = {
        _id: dayjs().format('YYYY-MM-DD'),
        totalSales: 0.0,
        blingOrdersNumbers: [],
        pipedriveDealsIds: [],
      };

      orders.forEach((o) => {
        dealOrder.pipedriveDealsIds.push(o.pipedriveId);
        dealOrder.blingOrdersNumbers.push(o.blingNum);
        dealOrder.totalSales += Number(o.totalValue);
      });

      const existentDealOrder = await DealOrderModel.findOne({ _id: dealOrder._id });

      if (existentDealOrder) {
        dealOrder.blingOrdersNumbers.push(...existentDealOrder.blingOrdersNumbers);
        dealOrder.pipedriveDealsIds.push(...existentDealOrder.pipedriveDealsIds);
        dealOrder.totalSales += existentDealOrder.totalSales;

        await new Promise((resolve, reject) => {
          DealOrderModel.updateOne(
            { _id: dealOrder._id }, dealOrder, (err, doc) => {
              if (err) {
                console.error(JSON.stringify(err));

                return reject(err);
              }

              return resolve(doc);
            },
          );
        });

        response = await DealOrderModel.findOne({ _id: dealOrder._id });
      } else {
        response = await DealOrderModel.create(dealOrder);
      }
    }

    return response;
  }

  static async getToSyncDeals() {
    const wonDeals = await PipedriveDealService.getWonDeals();

    const dealOrder = await DealOrderModel.findOne({ _id: dayjs().format('YYYY-MM-DD') });

    const dealOrdersPipedriveIds = dealOrder?.pipedriveDealsIds || [];

    const toSyncDeals = wonDeals.filter(({ pipedriveId }) => dealOrdersPipedriveIds.indexOf(pipedriveId) < 0);

    return toSyncDeals;
  }

  /**
   *
   * @returns {Promise<Array<DealOrderModel>>} Promise array of deal order objects
   */
  static async getDealOrders() {
    return DealOrderModel.find({});
  }
}
