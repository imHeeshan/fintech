import { ICurrency } from "@/interface/cryptoInterface";

export const currencyFilter = (filterData: ICurrency[], condition: string) => {
  const filter = filterData.filter((currency) => condition === "gainer" ?
    currency.price_change_percentage_24h > 0 : condition === "loser" ?
      currency.price_change_percentage_24h < 0 : filterData)
  return filter
}
export const priceformatFn = (num: number, decimal: number=1) => {
  const billion = 1_000_000_000;
  const million = 1_000_000;
  const trillion = 1_000_000_000_000;
  const quadrillion = 1_000_000_000_000_000;
  const quintillion = 1_000_000_000_000_000_000;

  if (num >= quintillion) {
    return `${(num / quintillion).toFixed(decimal)} Qi`;
  } else if (num >= quadrillion) {
    return `${(num / quadrillion).toFixed(decimal)} Q`;
  } else if (num >= trillion) {
    return `${(num / trillion).toFixed(decimal)} T`;
  } else if (num >= billion) {
    return `${(num / billion).toFixed(decimal)} B`;
  } else if (num >= million) {
    return `${(num / million).toFixed(decimal)} M`;
  } else {
    return num.toString();
  }
}

export const priceFormatLocalFn = (price: number | undefined) => {
  return price?.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) || '0.00'
}

