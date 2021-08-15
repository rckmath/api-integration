import Constants from '../../config/constants.js';
import { initInstance } from '../axios-instance.js';

const { baseUrl } = Constants.pipedrive;

export default class Pipedrive {
  static async createDeal(data, apiKey) {
    const instance = initInstance(baseUrl, 'pipedrive');

    const response = await instance.post(`/deals?api_token=${apiKey}`, data);

    return response;
  }

  static async getDeal(id, apiKey) {
    const instance = initInstance(baseUrl, 'pipedrive');

    const response = await instance.get(`/deals/${id}?api_token=${apiKey}`);

    return response;
  }

  static async listDeals(status, apiKey) {
    const instance = initInstance(baseUrl, 'pipedrive');

    const response = await instance.get(`/deals?status=${status}&api_token=${apiKey}`);

    return response;
  }

}
