import { tickers } from '@/assets/data/dummyData';
export async function GET(request: Request) {
  const url = new URL(request.url);
  const coinId = url.searchParams.get("coinId");

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/tickers`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data from CoinGecko' }),
      { status: response.status }
    );
  }

  const res = await response.json();
  const limitedMarkets = res.tickers.slice(0, 10);

  return new Response(JSON.stringify(limitedMarkets),)
}


