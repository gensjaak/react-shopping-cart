export interface ProductType {
  id: number
  name: string
  description: string
  price: number
  tax: number
}

export interface CartProductType {
  productId: number
  qte: number
}

export interface TaxeType {
  name: number
  value: number
}

export interface CurrencyRateType {
  name: string
  symbol: string
  value: number
  showSymbolAtLeft: boolean
}

export interface CurrencyType {
  base: string
  selected: CurrencyRateType
  rates: Array<CurrencyRateType>
}

export interface CartType {
  items: Array<CartProductType>
  taxes: Array<TaxeType>
  totalAmountIncludingTaxes: number
}

export interface StoreState {
  products: Array<ProductType>
  cart: CartType
  currency: CurrencyType | any
}
