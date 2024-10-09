export interface ICurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: null | number;
  circulating_supply: number;
  total_supply: number;
  infinite_supply: boolean;
  platform: Platform | null;
  cmc_rank: number;
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  tvl_ratio: null;
  last_updated: string;
  quote: Quote;
}

interface Quote {
  EUR: EUR;
}

interface EUR {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null;
  last_updated: string;
}

interface Platform {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
}



export interface CurrencyInfo {

    id?: number;
    name?: string;
    symbol?: string;
    category?: string;
    description?: string;
    slug?: string;
    logo?: string;
    subreddit?: string;
    notice?: string;
    tag_names?: any[];
    tag_groups?: any[];
    urls?: {},
    platform?: null;
    date_added?: string;
    contract_address?: any[];
    date_launched?: string;
    infinite_supply?: boolean;
    is_hidden?: number;
    self_reported_circulating_supply?: null;
    self_reported_market_cap?: null;
    self_reported_tags?: null;
    tags?: any[];
    twitter_username?: string;

}
export interface ITickerHistory {
  timeOpen: string;
  timeClose: string;
  timeHigh: string;
  timeLow: string;
  name: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  marketCap: number;
  timestamp: string;
}
export interface Ticker {
  history: ITickerHistory[];
  [key: string]: any;
}
export interface INewsArticle {
  id:number,
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage?: string | null;
  publishedAt: string;
  content: string | null;
}
export interface IRootMarket {
  name: string;
  tickers: IMarket[];
}

export interface IMarket {
  base?: string;
  target?: string;
  market?: Market;
  last?: number;
  volume?: number;
  converted_last?: {};
  converted_volume?: {};
  trust_score?: number;
  bid_ask_spread_percentage?: number;
  timestamp?: string;
  last_traded_at?: string;
  last_fetch_at?: string;
  is_anomaly?: boolean;
  is_stale?: boolean;
  trade_url?: null | string;
  token_info_url?: null;
  coin_id?: string;
  target_coin_id?: string;
}


interface Market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}

export interface IExchanges {
  id?: string;
  name?: string;
  year_established?: null | number;
  country?: null | string;
  description?: null | string;
  url?: string;
  image?: string;
  has_trading_incentive?: boolean;
  trust_score?: number;
  trust_score_rank?: number;
  trade_volume_24h_btc?: number;
  trade_volume_24h_btc_normalized?: number;
}