import Constants from '../../config/constants.js';
import { initInstance } from '../axios-instance.js';

export default class Pipedrive {
  static pipedrive = Constants.pipedrive;

  static async createDeal(data) {
    const instance = initInstance(this.pipedrive.baseUrl, 'pipedrive');

    const response = await instance.post(`/deals?api_token=${this.pipedrive.apiKey}`, data);

    return response;
  }

  static async getDeal(id) {
    const instance = initInstance(this.pipedrive.baseUrl, 'pipedrive');

    const response = await instance.get(`/deals/${id}?api_token=${this.pipedrive.apiKey}`);

    return response;
  }

  static async listDeals() {
    const instance = initInstance(this.pipedrive.baseUrl, 'pipedrive');

    const response = await instance.get(`/deals?api_token=${this.pipedrive.apiKey}`);

    return response;
  }

}
