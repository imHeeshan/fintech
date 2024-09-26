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


export interface Ticker {
  timestamp: string;
  price: number;
  volume_24h: number;
  market_cap: number;
}

export interface Currency {
  category: string;
  contract_address: any[];
  date_added: string;
  date_launched: string;
  description: string;
  id: number;
  infinite_supply: boolean;
  is_hidden: number;
  logo: string;
  name: string;
  notice: string;
  platform: null;
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  self_reported_tags: null;
  slug: string;
  subreddit: string;
  symbol: string;
  tag_groups: any[];
  tag_names: any[];
  tags: any[];
  twitter_username: string;

}
