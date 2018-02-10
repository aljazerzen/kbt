export enum TransactionType {
  buy = 0,
  sell = 1,
}

export class Transaction {
  date: number;
  tid: number;
  price: number;
  type: TransactionType;
  amount: number;
  diff: number;

  constructor(data: any) {
    this.date = +data.date;
    this.tid = +data.tid;
    this.price = +data.price;
    this.type = +data.type === 0 ? TransactionType.buy : TransactionType.sell;
    this.amount = +data.amount;
  }
}
