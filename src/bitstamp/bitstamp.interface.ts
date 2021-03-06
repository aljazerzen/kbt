import { Type } from 'class-transformer';

export class BitstampAccountBalance {
  @Type(() => Number) bch_available: number;
  @Type(() => Number) bch_balance: number;
  @Type(() => Number) bch_reserved: number;
  @Type(() => Number) bchbtc_fee: number;
  @Type(() => Number) bcheur_fee: number;
  @Type(() => Number) bchusd_fee: number;
  @Type(() => Number) btc_available: number;
  @Type(() => Number) btc_balance: number;
  @Type(() => Number) btc_reserved: number;
  @Type(() => Number) btceur_fee: number;
  @Type(() => Number) btcusd_fee: number;
  @Type(() => Number) eth_available: number;
  @Type(() => Number) eth_balance: number;
  @Type(() => Number) eth_reserved: number;
  @Type(() => Number) ethbtc_fee: number;
  @Type(() => Number) etheur_fee: number;
  @Type(() => Number) ethusd_fee: number;
  @Type(() => Number) eur_available: number;
  @Type(() => Number) eur_balance: number;
  @Type(() => Number) eur_reserved: number;
  @Type(() => Number) eurusd_fee: number;
  @Type(() => Number) ltc_available: number;
  @Type(() => Number) ltc_balance: number;
  @Type(() => Number) ltc_reserved: number;
  @Type(() => Number) ltcbtc_fee: number;
  @Type(() => Number) ltceur_fee: number;
  @Type(() => Number) ltcusd_fee: number;
  @Type(() => Number) usd_available: number;
  @Type(() => Number) usd_balance: number;
  @Type(() => Number) usd_reserved: number;
  @Type(() => Number) xrp_available: number;
  @Type(() => Number) xrp_balance: number;
  @Type(() => Number) xrp_reserved: number;
  @Type(() => Number) xrpbtc_fee: number;
  @Type(() => Number) xrpeur_fee: number;
  @Type(() => Number) xrpusd_fee: number;
}
