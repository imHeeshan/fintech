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



export interface Currency {
  [key: number]: {
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
  symbol: string;
  history: ITickerHistory[];
}

export interface INewsArticle {
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
