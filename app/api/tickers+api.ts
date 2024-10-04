import { tickers } from '@/assets/data/dummyData';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const symbol = url.searchParams.get('symbol')


  const ticker = tickers.find(crypto => crypto.symbol === symbol);
  if (ticker) { 
    return Response.json(ticker.history);
  } else {
    return `No data found for symbol: ${symbol}`;
  }
  // const response = await fetch(
  //   `https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2024-01-01&interval=1d`
  // );

  // const res = await response.json();
  // return ExpoResponse.json(data);
  // return Response.json(data);
}

