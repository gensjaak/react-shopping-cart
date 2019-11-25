import { Dispatch } from 'react'
import { IFetchProductsAction } from './actions'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  tax: number
}

export interface CartProduct {
  productId: number
  qte: number
}

export interface Taxe {
  name: number
  value: number
}

export interface Cart {
  items: Array<CartProduct>
  taxes: Array<Taxe>
  totalAmountIncludingTaxes: number
}

export interface StoreState {
  products: Array<Product>
  cart: Cart
}
