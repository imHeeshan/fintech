export async function GET(request: Request) {
  const url = new URL(request.url);
  const coinId = url.searchParams.get('id')  
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}`,
      {
        headers: {},
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const res = await response.json(); // Parse JSON response
    const { id, name, symbol, description,image,market_data } = res;
    return Response.json({ id, name, symbol, description: description.en,image,market_data }); // Return only the relevant fields

  } catch (error) {
    return Response.json({ error: 'Failed to fetch data from CoinGecko' }, { status: 500 });
  }
}
