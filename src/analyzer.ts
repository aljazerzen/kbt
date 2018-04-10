import { linear, polynomial } from 'regression';
import { Transaction } from './transaction';
import { BitstampService } from './bitstamp/bitstamp.service';
import { MailService } from './mail.service';
import { render } from './render';

function sort(transactions: Transaction[], field) {
  transactions.sort((a, b) => (a[field] - b[field]));
}

function toPoints(trans: Transaction[]) {
  return trans.map(t => [t.date, t.price]);
}

function addDifference(trans: Transaction[], predict) {
  for (let t of trans)
    t.diff = t.price - predict(t.date)[1];
}

function firstToReachVolume(trans: Transaction[], volume: number) {
  const r = [];
  for (let i = 0; i < trans.length && volume > 0; i++) {
    r.push(trans[i]);
    volume -= trans[i].amount;
  }
  return r;
}

function sum(trans: Transaction[], field) {
  return trans.reduce((total, t) => total + t[field], 0);
}

function min(trans: Transaction[], field) {
  return trans.reduce((min, t) => min < t[field] ? min : t[field], trans[0][field]);
}

function max(trans: Transaction[], field) {
  return trans.reduce((max, t) => max > t[field] ? max : t[field], trans[0][field]);
}

export async function analyze() {

  // let transactions = await new FileService().loadTransactions();
  let bitstamp = new BitstampService();
  let transactions = await new BitstampService().transactionsDay();

  const regressionPoly = polynomial(toPoints(transactions), { precision: 50, order: 5 });

  addDifference(transactions, regressionPoly.predict);
  sort(transactions, 'diff');

  let totalVol = sum(transactions, 'amount');

  let minimums = firstToReachVolume(transactions, totalVol * 0.25);
  transactions.reverse();
  let maximums = firstToReachVolume(transactions, totalVol * 0.25);

  sort(minimums, 'date');
  sort(maximums, 'date');
  let regMin = polynomial(toPoints(minimums), { precision: 50, order: 5 });
  let regMax = polynomial(toPoints(maximums), { precision: 50, order: 5 });

  let ticker = await bitstamp.ticker();

  console.log('Ask: ', ticker.ask, ' Predicted min: ', regMin.predict(+ticker.timestamp)[1]);
  if (+ticker.ask < regMin.predict(+ticker.timestamp)[1]) {
    console.log(`Buy at ${ticker.ask} BTC/ETH`);
    await MailService.send(`Buy at ${ticker.ask} BTC/ETH`);
  }

  console.log('Bid: ', ticker.bid, ' Predicted max: ', regMax.predict(+ticker.timestamp)[1]);
  if (regMax.predict(+ticker.timestamp)[1] < +ticker.bid) {
    console.log(`Sell at ${ticker.bid} BTC/ETH`);
    await MailService.send(`Sell at ${ticker.bid} BTC/ETH`);
  }

  let firstDate = min(transactions, 'date');
  let nowDate = Math.floor(Date.now() / 1000);
  await render(
    toPoints(transactions),
    [[+ticker.timestamp, +ticker.ask], [+ticker.timestamp, +ticker.bid]],
    [regressionPoly.predict(firstDate), regressionPoly.predict(nowDate)],
    [regMin.predict(firstDate), regMin.predict(nowDate)],
    [regMax.predict(firstDate), regMax.predict(nowDate)],
  );

}
