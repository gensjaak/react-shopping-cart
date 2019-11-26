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

type CurrencyDetails = { symbol: string; atLeft: boolean }
export const getCurrencyDetails = (currencyName: string): CurrencyDetails => {
  const symbolMapping = new Map<string, CurrencyDetails>()
  const eur = {
    symbol: '€',
    atLeft: false,
  }

  symbolMapping.set('EUR', eur)
  symbolMapping.set('CAD', {
    symbol: 'CA$',
    atLeft: true,
  })
  symbolMapping.set('HKD', {
    symbol: 'HK$',
    atLeft: true,
  })
  symbolMapping.set('USD', {
    symbol: '$',
    atLeft: true,
  })
  symbolMapping.set('GBP', {
    symbol: '£',
    atLeft: false,
  })

  return symbolMapping.get(currencyName) || (eur as CurrencyDetails)
}
