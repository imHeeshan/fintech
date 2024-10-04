import { currncyNews, listings } from '@/assets/data/dummyData';
import { ExpoRequest, ExpoResponse } from 'expo-router/server'

const API_KEY = process.env.CRYPTO_NEWS_API_KEY

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug')
console.log(slug,"aaaaaaaaaaaaaaa sluf");

  // const initialLimit = 30;
  // const subsequentLimit = 10;


  // const response = await fetch(
  //     `https://newsapi.org/v2/everything?q=${slug}&pageSize=10&apiKey=${API_KEY}`,

  // );

  // const res = await response.json();
  // console.log();

  return Response.json(currncyNews.articles);

}

