import * as requestPromise from 'request-promise';
import * as crypto from 'crypto';
import { Transaction } from '../transaction';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export class BitstampService {

  baseUrl = 'https://www.bitstamp.net/api/';

  private async request(uri, params: any = {}) {
    return requestPromise({
      uri: this.baseUrl + uri,
      qs: params,
      json: true
    });
  }

  private async authRequest(uri, params = {}, type: any) {
    const nonce = Math.floor(Date.now() / 1000);
    const key = process.env.BITSTAMP_API_KEY;

    const hmac = crypto.createHmac('sha256', process.env.BITSTAMP_SECRET);

    hmac.update('' + nonce + process.env.BITSTAMP_CUSTOMER_ID + key);
    const signature = hmac.digest().toString('hex').toUpperCase();

    const resPlain =  requestPromise.post({
      uri,
      baseUrl: this.baseUrl,
      form: Object.assign(params, { key, nonce, signature }),
      json: true,
    });
    return type ? plainToClass(type, resPlain) : ;
  }

  async accountBalance() {
    return this.authRequest('v2/balance/');
  }

  async ticker() {
    return this.request('v2/ticker_hour/ethbtc/');
  }

  async transactionsDay() {
    let data = await this.request('v2/transactions/ethbtc/', { time: 'day' }) as any[];
    return data.map(t => new Transaction(t));
  }

}
