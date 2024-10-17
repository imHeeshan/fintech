export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  console.log(page,"sd");
  
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}`,
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
