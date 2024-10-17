import { currncyNews, listings } from '@/assets/data/dummyData';
import { ExpoRequest, ExpoResponse } from 'expo-router/server'

const API_KEY = process.env.CRYPTO_NEWS_API_KEY

export async function GET(request: Request) {
  const url = new URL(request.url);
  const coinId = url.searchParams.get('coinId')
console.log(coinId);

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${coinId}&pageSize=10&apiKey=${API_KEY}`,
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

