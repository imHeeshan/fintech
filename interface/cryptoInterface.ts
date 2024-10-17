export interface ICurrency {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: null | number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: Roi | null;
    last_updated: string;
}

interface Roi {
    times: number;
    currency: string;
    percentage: number;
}

export interface IHistoricalTicker {
    prices: [timestamp: number, price: number][];
    market_caps: [timestamp: number, market_cap: number][];
    total_volumes: [timestamp: number, volume: number][];
}

export interface ICurrencyInfo {
    id: string;
    symbol: string;
    name: string;
    web_slug: string;
    asset_platform_id: null;
    platforms: Platforms;
    detail_platforms: Detailplatforms;
    block_time_in_minutes: number;
    hashing_algorithm: string;
    categories: string[];
    preview_listing: boolean;
    public_notice: null;
    additional_notices: any[];
    localization: Localization;
    description: string;
    links: Links;
    image: Image;
    country_origin: string;
    genesis_date: string;
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
    ico_data: Icodata;
    watchlist_portfolio_users: number;
    market_cap_rank: number;
    market_data: Marketdata;
    community_data: Communitydata;
    developer_data: Developerdata;
    status_updates: any[];
    last_updated: string;
    tickers: Ticker[];
}

interface Ticker {
    base: string;
    target: string;
    market: Market;
    last: number;
    volume: number;
    converted_last: Convertedlast;
    converted_volume: Convertedlast;
    trust_score: string;
    bid_ask_spread_percentage: number;
    timestamp: string;
    last_traded_at: string;
    last_fetch_at: string;
    is_anomaly: boolean;
    is_stale: boolean;
    trade_url: null | string;
    token_info_url: null;
    coin_id: string;
    target_coin_id?: string;
}

interface Convertedlast {
    btc: number;
    eth: number;
    usd: number;
    usd_v2?: number;
}

interface Market {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
}

interface Developerdata {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: Codeadditionsdeletions4weeks;
    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: any[];
}

interface Codeadditionsdeletions4weeks {
    additions: number;
    deletions: number;
}

interface Communitydata {
    facebook_likes: null;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count: null;
}

interface Marketdata {
    current_price: Currentprice;
    total_value_locked: null;
    mcap_to_tvl_ratio: null;
    fdv_to_tvl_ratio: null;
    roi: Roi;
    ath: Currentprice;
    ath_change_percentage: Currentprice;
    ath_date: Athdate;
    atl: Currentprice;
    atl_change_percentage: Currentprice;
    atl_date: Athdate;
    market_cap: Currentprice;
    market_cap_rank: number;
    fully_diluted_valuation: Currentprice;
    market_cap_fdv_ratio: number;
    total_volume: Currentprice;
    high_24h: Currentprice;
    low_24h: Currentprice;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: Currentprice;
    price_change_percentage_1h_in_currency: Currentprice;
    price_change_percentage_24h_in_currency: Currentprice;
    price_change_percentage_7d_in_currency: Currentprice;
    price_change_percentage_14d_in_currency: Currentprice;
    price_change_percentage_30d_in_currency: Currentprice;
    price_change_percentage_60d_in_currency: Currentprice;
    price_change_percentage_200d_in_currency: Currentprice;
    price_change_percentage_1y_in_currency: Currentprice;
    market_cap_change_24h_in_currency: Currentprice;
    market_cap_change_percentage_24h_in_currency: Currentprice;
    total_supply: number;
    max_supply: null;
    circulating_supply: number;
    last_updated: string;
}

interface Athdate {
    aed: string;
    ars: string;
    aud: string;
    bch: string;
    bdt: string;
    bhd: string;
    bmd: string;
    bnb: string;
    brl: string;
    btc: string;
    cad: string;
    chf: string;
    clp: string;
    cny: string;
    czk: string;
    dkk: string;
    dot: string;
    eos: string;
    eth: string;
    eur: string;
    gbp: string;
    gel: string;
    hkd: string;
    huf: string;
    idr: string;
    ils: string;
    inr: string;
    jpy: string;
    krw: string;
    kwd: string;
    lkr: string;
    ltc: string;
    mmk: string;
    mxn: string;
    myr: string;
    ngn: string;
    nok: string;
    nzd: string;
    php: string;
    pkr: string;
    pln: string;
    rub: string;
    sar: string;
    sek: string;
    sgd: string;
    thb: string;
    try: string;
    twd: string;
    uah: string;
    usd: string;
    vef: string;
    vnd: string;
    xag: string;
    xau: string;
    xdr: string;
    xlm: string;
    xrp: string;
    yfi: string;
    zar: string;
    bits: string;
    link: string;
    sats: string;
}

interface Roi {
    times: number;
    currency: string;
    percentage: number;
}

interface Currentprice {
    aed: number;
    ars: number;
    aud: number;
    bch: number;
    bdt: number;
    bhd: number;
    bmd: number;
    bnb: number;
    brl: number;
    btc: number;
    cad: number;
    chf: number;
    clp: number;
    cny: number;
    czk: number;
    dkk: number;
    dot: number;
    eos: number;
    eth: number;
    eur: number;
    gbp: number;
    gel: number;
    hkd: number;
    huf: number;
    idr: number;
    ils: number;
    inr: number;
    jpy: number;
    krw: number;
    kwd: number;
    lkr: number;
    ltc: number;
    mmk: number;
    mxn: number;
    myr: number;
    ngn: number;
    nok: number;
    nzd: number;
    php: number;
    pkr: number;
    pln: number;
    rub: number;
    sar: number;
    sek: number;
    sgd: number;
    thb: number;
    try: number;
    twd: number;
    uah: number;
    usd: number;
    vef: number;
    vnd: number;
    xag: number;
    xau: number;
    xdr: number;
    xlm: number;
    xrp: number;
    yfi: number;
    zar: number;
    bits: number;
    link: number;
    sats: number;
}

interface Icodata {
    ico_start_date: string;
    ico_end_date: string;
    short_desc: string;
    description: null;
    links: Links2;
    softcap_currency: string;
    hardcap_currency: string;
    total_raised_currency: string;
    softcap_amount: null;
    hardcap_amount: null;
    total_raised: null;
    quote_pre_sale_currency: string;
    base_pre_sale_amount: null;
    quote_pre_sale_amount: null;
    quote_public_sale_currency: string;
    base_public_sale_amount: number;
    quote_public_sale_amount: number;
    accepting_currencies: string;
    country_origin: string;
    pre_sale_start_date: null;
    pre_sale_end_date: null;
    whitelist_url: string;
    whitelist_start_date: null;
    whitelist_end_date: null;
    bounty_detail_url: string;
    amount_for_sale: null;
    kyc_required: boolean;
    whitelist_available: null;
    pre_sale_available: null;
    pre_sale_ended: boolean;
}

interface Links2 {
}

interface Image {
    thumb: string;
    small: string;
    large: string;
}

interface Links {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: Reposurl;
}

interface Reposurl {
    github: string[];
    bitbucket: any[];
}

interface Localization {
    en: string;
    de: string;
    es: string;
    fr: string;
    it: string;
    pl: string;
    ro: string;
    hu: string;
    nl: string;
    pt: string;
    sv: string;
    vi: string;
    tr: string;
    ru: string;
    ja: string;
    zh: string;
    'zh-tw': string;
    ko: string;
    ar: string;
    th: string;
    id: string;
    cs: string;
    da: string;
    el: string;
    hi: string;
    no: string;
    sk: string;
    uk: string;
    he: string;
    fi: string;
    bg: string;
    hr: string;
    lt: string;
    sl: string;
}

interface Detailplatforms {
    '': _;
}

interface _ {
    decimal_place: null;
    contract_address: string;
}

interface Platforms {
    '': string;
}

export interface IDataPoint extends Record<string, unknown> {
    timestamp: number; 
    volume: number;     
}

export interface ITickerHistory {
    prices: IDataPoint[];       
    market_caps: IDataPoint[]; 
    total_volumes: number[][];  // total_volumes should be defined as an array of arrays
}



//news article 

export interface IRootArticle {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface IArticle {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface Source {
  id: null | string;
  name: string;
}