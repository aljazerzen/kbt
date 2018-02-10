import { scheduleJob } from 'node-schedule';
import { analyze } from './analyzer';

scheduleJob('0,30 * * * *', analyze);
