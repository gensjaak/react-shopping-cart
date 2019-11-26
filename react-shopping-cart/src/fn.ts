import { CurrencyRateType } from './store/types'

export const priceFromCurrency = (
  price: number,
  currency: CurrencyRateType
): string => {
  let convertedPrice = Number((price * currency.value).toFixed(2))

  if (currency.showSymbolAtLeft) {
    return currency.symbol + convertedPrice.toString()
  }

  return convertedPrice.toString() + currency.symbol
}
