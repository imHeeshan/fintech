export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const response = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${query}`,
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
  const limitedExchanges = res.slice(0, 10);

  return new Response(JSON.stringify(res.coins),)
}


