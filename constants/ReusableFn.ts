import { ICurrency } from "@/interface/crypto"

export const currencyFilter = (filterData: ICurrency[], condition: string) => {
  const filter = filterData.filter((currency) => condition === "gainer" ?
    currency.quote.EUR.percent_change_1h > 0 : condition === "loser" ?
      currency.quote.EUR.percent_change_1h < 0 : filterData)
  return filter
}
export const priceformatFn = (num: number) => {
  const billion = 1_000_000_000;
  const million = 1_000_000;
  const trillion = 1_000_000_000_000;
  const quadrillion = 1_000_000_000_000_000;
  const quintillion = 1_000_000_000_000_000_000;

  if (num >= quintillion) {
    return `${(num / quintillion).toFixed(1)} Qi`;
  } else if (num >= quadrillion) {
    return `${(num / quadrillion).toFixed(1)} Q`;
  } else if (num >= trillion) {
    return `${(num / trillion).toFixed(1)} T`;
  } else if (num >= billion) {
    return `${(num / billion).toFixed(1)} B`;
  } else if (num >= million) {
    return `${(num / million).toFixed(1)} M`;
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

