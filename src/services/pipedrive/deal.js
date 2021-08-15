import { DealStatus } from '../../enums/pipedrive/index.js';
import { Errors } from '../../utilities/errors/business.js';
import ExtendableError from '../../utilities/errors/extendable.js';
import PipedriveMechanism from '../../mechanisms/pipedrive/index.js';
import Constants from '../../config/constants.js';

const { apiKey } = Constants.pipedrive;

/**
 * @param {Object} deal Pipedrive deal data
 */
const DealAdapter = (deal) => ({
  pipedriveId: deal.id,
  title: deal.title,
  clientName: deal.person_name,
  value: deal.value,
  status: deal.status,
});

export default class PipedriveDealService {
  /**
   * @returns {Promise<Array<DealAdapter>>} Array of objects containing the basic properties of a deal, according to DealAdapter attributes
   */
  static async getWonDeals() {
    let deals = [];

    const response = await PipedriveMechanism.listDeals(DealStatus.WON, apiKey);

    if (!response || !response.success) {
      throw new ExtendableError('pipedriveError', Errors.PIPEDRIVE_UNKNOWN_ERROR);
    }

    if (response.data && response.data.length) {
      deals = response.data.map((deal) => DealAdapter(deal));
    }

    return deals;
  }

  /**
   *
   * @param {number} id Integer Pipedrive deal ID
   * @returns {Promise<DealAdapter>} Object containing the basic properties of a deal, according to DealAdapter attributes
   */
  static async getDealById(id) {
    const response = await PipedriveMechanism.getDeal(id, apiKey);

    if (!response || !response.success || !response.data) {
      throw new ExtendableError('pipedriveError', Errors.DEAL_NOT_FOUND);
    }

    return DealAdapter(response.data);
  }
}
