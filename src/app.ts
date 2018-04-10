import { scheduleJob } from 'node-schedule';
import { analyze } from './analyzer';
import * as dotenv from 'dotenv';
import { BitstampService } from './bitstamp/bitstamp.service';

dotenv.config();

const bitstamp = new BitstampService();
bitstamp.accountBalance()
  .then(console.log)
  .catch(console.error);

// scheduleJob('0,5,10,15,20,25,30,35,40,45,50,55 * * * *', analyze);
