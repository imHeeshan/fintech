import { currencyInfo } from '@/assets/data/dummyData';
import { CurrencyInfo } from '@/interface/crypto';
import { ExpoRequest, ExpoResponse } from 'expo-router/server'

const API_KEY = process.env.CRYPTO_API_KEY

type tCurrency = {
  [key: string]: CurrencyInfo; 
};
export async function GET(request: Request) {
  const url = new URL(request.url);
  const ids = url.searchParams.get("ids");

  if (ids) {
    const idArray = ids.split(',');
    const currencyData = idArray.reduce((acc: tCurrency, id: string) => {
      if (currencyInfo[id]) {
        acc[id] = currencyInfo[id];
      }
      return acc;
    }, {});

    return Response.json(currencyData);
  }

  return Response.json({});
  // const simplifiedData = Object.values(data).map(({ id, name, symbol, logo, description }) => ({
  //   id,
  //   name,
  //   symbol,
  //   logo,
  //   description,
  // }));

  // return Response.json(simplifiedData);

  // const response = await fetch(
  //   `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`,
  //   {
  //     headers: {
  //       "X-CMC_PRO_API_KEY": API_KEY!,
  //     },
  //   },
  // )
  // const res = await response.json();
  // console.log("jjjjjjjjaaaaaaaaaa api", res.data);

  // return Response.json(res.data)
  // return Response.json(paginatedData)
}


