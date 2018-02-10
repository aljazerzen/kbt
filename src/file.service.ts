import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { Transaction } from './transaction';

export class FileService {

  static file = './data/transactions.json';

  async loadTransactions(limit: number = null): Promise<Transaction[]> {

    const readFile = util.promisify(fs.readFile);
    const data = await readFile(path.resolve(FileService.file));
    const array = JSON.parse(data.toString()) as any[];

    if (limit) {
      array.splice(0, array.length - limit);
    }

    return array.map(t => new Transaction(t));
  }

}
