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

export interface CartType {
  items: Array<CartProductType>
  taxes: Array<TaxeType>
  totalAmountIncludingTaxes: number
}

export interface StoreState {
  products: Array<ProductType>
  cart: CartType
}
