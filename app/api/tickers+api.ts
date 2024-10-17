export async function GET(request: Request) {
  const url = new URL(request.url);

  const coinId = url.searchParams.get('coinId') || ""
  const currency = url.searchParams.get('currency') || "usd"
  const days = url.searchParams.get('days') || "30"
  const interval = url.searchParams.get('interval') || "daily"
  console.log(currency,
    days,
    interval, coinId,";ated api");

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`,
      {
        headers: {},

      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const res = await response.json(); // Parse JSON response

    return Response.json(res); // Return the fetched data
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data from CoinGecko' }, { status: 500 });
  }
}
