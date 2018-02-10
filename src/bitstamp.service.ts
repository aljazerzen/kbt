import * as requestPromise from 'request-promise';
import { Transaction } from './transaction';

export class BitstampService {

  baseUrl = 'https://www.bitstamp.net/api/';

  async request(uri, params = {}) {

    return requestPromise({
      uri: this.baseUrl + uri,
      qs: params,
      json: true
    });
  }

  async ticker() {
    return this.request('v2/ticker_hour/ethbtc/');
  }

  async transactionsDay() {
    let data = await this.request('v2/transactions/ethbtc/', { time: 'day' }) as any[];
    return data.map(t => new Transaction(t));
  }

}
