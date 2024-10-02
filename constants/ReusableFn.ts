import { ICurrency } from "@/interface/crypto"

export const currencyFilter = (filterData: ICurrency[], condition: string) => {
    const filter = filterData.filter((currency) => condition === "gainer" ?
        currency.quote.EUR.percent_change_1h > 0 : condition === "loser" ?
            currency.quote.EUR.percent_change_1h < 0 : filterData)
    return filter
}