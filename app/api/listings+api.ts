import { listings } from '@/assets/data/dummyData';
import { ExpoRequest, ExpoResponse } from 'expo-router/server'

const API_KEY = process.env.CRYPTO_API_KEY

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page'))
  const limit = Number(url.searchParams.get('limit')) | 10
  const initialLimit = 30;
  const subsequentLimit = 10;

  const startIndex = page === 1 ? 0 : initialLimit + (page - 2) * subsequentLimit;
  
  const paginatedData = listings.slice(startIndex, startIndex + limit);

  // const limit = url.searchParams.get('limit') || '5';

  // const response = await fetch(
  //     `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=EUR`,
  //     {
  //         headers: {
  //             "X-CMC_PRO_API_KEY": API_KEY!,
  //         },
  //     }
  // );

  // const res = await response.json();
  // return Response.json(res.data);

  return Response.json(paginatedData);
}

